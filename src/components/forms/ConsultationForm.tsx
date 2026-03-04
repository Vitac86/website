'use client';

import { useState } from 'react';

import { ConsentCheckbox } from '@/components/forms/ConsentCheckbox';
import { PhoneInput } from '@/components/forms/PhoneInput';

export function ConsultationForm(): JSX.Element {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus('Отправка...');

    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, consent, company })
    });

    const data = (await response.json()) as { ok: boolean; error?: string };
    if (!data.ok) {
      setStatus(data.error ?? 'Ошибка отправки');
      return;
    }

    setStatus('Спасибо! Мы свяжемся с вами.');
    setName('');
    setPhone('');
    setConsent(false);
    setCompany('');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Получить консультацию</h3>
      <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ваше имя" className="w-full rounded-md border px-3 py-2" required name="name" />
      <PhoneInput value={phone} onChange={setPhone} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Компания</label>
        <input id="company" name="company" value={company} onChange={(event) => setCompany(event.target.value)} autoComplete="off" tabIndex={-1} />
      </div>
      <ConsentCheckbox checked={consent} onChange={setConsent} />
      <button type="submit" className="rounded-md bg-brand px-4 py-2 text-white">Отправить</button>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
