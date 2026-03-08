import type { LeadPayload } from '@/types/lead';

export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    return `+${cleaned.slice(1).replace(/\+/g, '')}`;
  }
  return cleaned;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateLead(payload: LeadPayload): { valid: boolean; error?: string; normalized?: LeadPayload } {
  if (!payload.name || payload.name.trim().length < 2) {
    return { valid: false, error: 'Введите имя' };
  }

  const normalizedPhone = normalizePhone(payload.phone || '');
  if (normalizedPhone.replace(/\D/g, '').length < 10) {
    return { valid: false, error: 'Введите корректный телефон' };
  }

  const normalizedEmail = payload.email?.trim();
  if (normalizedEmail && !isValidEmail(normalizedEmail)) {
    return { valid: false, error: 'Введите корректный email' };
  }

  const normalizedTask = payload.task?.trim();
  if (normalizedTask && normalizedTask.length < 5) {
    return { valid: false, error: 'Опишите задачу чуть подробнее' };
  }


  if (!payload.consent) {
    return { valid: false, error: 'Нужно согласие на обработку данных' };
  }

  return {
    valid: true,
    normalized: {
      ...payload,
      name: payload.name.trim(),
      phone: normalizedPhone,
      email: normalizedEmail || undefined,
      industry: payload.industry?.trim() || undefined,
      task: normalizedTask || undefined,
      source: payload.source?.trim() || undefined
    }
  };
}
