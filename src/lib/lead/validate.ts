import type { LeadPayload } from '@/types/lead';

export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    return `+${cleaned.slice(1).replace(/\+/g, '')}`;
  }
  return cleaned;
}

export function validateLead(payload: LeadPayload): { valid: boolean; error?: string; normalized?: LeadPayload } {
  if (!payload.name || payload.name.trim().length < 2) {
    return { valid: false, error: 'Введите имя' };
  }

  const normalizedPhone = normalizePhone(payload.phone || '');
  if (normalizedPhone.replace(/\D/g, '').length < 10) {
    return { valid: false, error: 'Введите корректный телефон' };
  }

  if (!payload.consent) {
    return { valid: false, error: 'Нужно согласие на обработку данных' };
  }

  return {
    valid: true,
    normalized: {
      ...payload,
      name: payload.name.trim(),
      phone: normalizedPhone
    }
  };
}
