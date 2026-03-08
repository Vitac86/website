import net from 'node:net';
import tls from 'node:tls';

import type { LeadPayload } from '@/types/lead';

type SocketLike = net.Socket | tls.TLSSocket;

function getRequiredEnv(name: 'SMTP_HOST' | 'SMTP_PORT' | 'SMTP_USER' | 'SMTP_PASS' | 'SMTP_TO'): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Не задана переменная окружения ${name}`);
  }
  return value;
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]/g, '').trim();
}

function formatLeadBody(payload: LeadPayload): string {
  const rows: Array<[string, string]> = [
    ['Имя', payload.name || '—'],
    ['Email', payload.email || '—'],
    ['Телефон', payload.phone || '—'],
    ['Отрасль', payload.industry || '—'],
    ['Задача', payload.task || '—'],
    ['Источник', payload.source || payload.page || '—'],
    ['Страница', payload.page || '—'],
    ['UTM', payload.utm ? JSON.stringify(payload.utm, null, 2) : '—']
  ];

  return rows.map(([label, value]) => `${label}: ${value}`).join('\n');
}

async function readSmtpResponse(socket: SocketLike): Promise<{ code: number; text: string }> {
  return new Promise((resolve, reject) => {
    let buffer = '';

    const onData = (chunk: Buffer | string): void => {
      buffer += chunk.toString();
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines[lines.length - 1];
      if (lastLine && /^\d{3} /.test(lastLine)) {
        cleanup();
        resolve({ code: Number.parseInt(lastLine.slice(0, 3), 10), text: buffer.trim() });
      }
    };

    const onError = (error: Error): void => {
      cleanup();
      reject(error);
    };

    const onEnd = (): void => {
      cleanup();
      reject(new Error('SMTP соединение было закрыто'));
    };

    const cleanup = (): void => {
      socket.off('data', onData);
      socket.off('error', onError);
      socket.off('end', onEnd);
    };

    socket.on('data', onData);
    socket.on('error', onError);
    socket.on('end', onEnd);
  });
}

async function sendCommand(socket: SocketLike, command: string, expectedCodes: number[]): Promise<void> {
  socket.write(`${command}\r\n`);
  const response = await readSmtpResponse(socket);
  if (!expectedCodes.includes(response.code)) {
    throw new Error(`SMTP ошибка на команде "${command}": ${response.text}`);
  }
}

function createSocket(host: string, port: number): Promise<SocketLike> {
  const secure = port === 465;

  return new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host, port, servername: host })
      : net.createConnection({ host, port });

    const onError = (error: Error): void => {
      cleanup();
      reject(error);
    };

    const onConnect = (): void => {
      cleanup();
      resolve(socket);
    };

    const cleanup = (): void => {
      socket.off('error', onError);
      socket.off('connect', onConnect);
    };

    socket.on('error', onError);
    socket.on('connect', onConnect);
  });
}

export async function sendLeadEmail(payload: LeadPayload): Promise<void> {
  const host = getRequiredEnv('SMTP_HOST');
  const port = Number.parseInt(getRequiredEnv('SMTP_PORT'), 10);
  const user = sanitizeHeaderValue(getRequiredEnv('SMTP_USER'));
  const pass = getRequiredEnv('SMTP_PASS');
  const to = sanitizeHeaderValue(getRequiredEnv('SMTP_TO'));

  if (Number.isNaN(port) || port <= 0) {
    throw new Error('SMTP_PORT должен быть корректным числом');
  }

  const from = user;
  const replyTo = payload.email ? sanitizeHeaderValue(payload.email) : undefined;

  const subject = 'Новая заявка с сайта';
  const date = new Date().toUTCString();
  const body = formatLeadBody(payload);

  const messageLines = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    `Date: ${date}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    '',
    body
  ];

  const socket = await createSocket(host, port);

  try {
    const greeting = await readSmtpResponse(socket);
    if (greeting.code !== 220) {
      throw new Error(`SMTP приветствие не получено: ${greeting.text}`);
    }

    await sendCommand(socket, 'EHLO website.local', [250]);
    await sendCommand(socket, 'AUTH LOGIN', [334]);
    await sendCommand(socket, Buffer.from(user).toString('base64'), [334]);
    await sendCommand(socket, Buffer.from(pass).toString('base64'), [235]);
    await sendCommand(socket, `MAIL FROM:<${from}>`, [250]);
    await sendCommand(socket, `RCPT TO:<${to}>`, [250, 251]);
    await sendCommand(socket, 'DATA', [354]);

    const dataBody = `${messageLines.join('\r\n')}\r\n.\r\n`;
    socket.write(dataBody);

    const dataResponse = await readSmtpResponse(socket);
    if (dataResponse.code !== 250) {
      throw new Error(`SMTP ошибка отправки письма: ${dataResponse.text}`);
    }

    await sendCommand(socket, 'QUIT', [221]);
  } finally {
    socket.end();
  }
}
