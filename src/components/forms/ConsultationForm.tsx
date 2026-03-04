'use client';

import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { ConsentCheckbox } from '@/components/forms/ConsentCheckbox';
import { PhoneInput } from '@/components/forms/PhoneInput';
import { normalizePhone } from '@/lib/lead/validate';

type FormErrors = {
  name?: string;
  phone?: string;
  consent?: string;
  submit?: string;
};

export function ConsultationForm(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function validateForm(): FormErrors {
    const nextErrors: FormErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Имя должно быть не короче 2 символов';
    }

    const normalizedPhone = normalizePhone(phone);
    if (normalizedPhone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Введите минимум 10 цифр телефона';
    }

    if (!consent) {
      nextErrors.consent = 'Подтвердите согласие на обработку данных';
    }

    return nextErrors;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSuccess(false);

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const utm = Object.fromEntries(
      Array.from(searchParams.entries()).filter(([key, value]) => key.startsWith('utm_') && value.trim().length > 0)
    );

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizePhone(phone),
          consent,
          company,
          page: pathname,
          utm: Object.keys(utm).length > 0 ? utm : undefined
        })
      });

      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setErrors({ submit: data.error ?? 'Ошибка отправки' });
        return;
      }

      setName('');
      setPhone('');
      setConsent(false);
      setCompany('');
      setErrors({});
      setIsSuccess(true);
    } catch {
      setErrors({ submit: 'Не удалось отправить форму. Попробуйте ещё раз.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Получить консультацию</h3>

      <div>
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="Ваше имя"
          className="w-full rounded-md border px-3 py-2"
          required
          name="name"
        />
        {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
      </div>

      <div>
        <PhoneInput
          value={phone}
          onChange={(value) => {
            setPhone(value);
            setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
        />
        {errors.phone ? <p className="mt-1 text-sm text-red-600">{errors.phone}</p> : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Компания</label>
        <input id="company" name="company" value={company} onChange={(event) => setCompany(event.target.value)} autoComplete="off" tabIndex={-1} />
      </div>

      <div>
        <ConsentCheckbox
          checked={consent}
          onChange={(value) => {
            setConsent(value);
            setErrors((prev) => ({ ...prev, consent: undefined }));
          }}
        />
        {errors.consent ? <p className="mt-1 text-sm text-red-600">{errors.consent}</p> : null}
      </div>

      <button type="submit" disabled={isSubmitting} className="rounded-md bg-brand px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>

      {errors.submit ? <p className="text-sm text-red-600">{errors.submit}</p> : null}
      {isSuccess ? <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Спасибо! Заявка отправлена, мы скоро свяжемся с вами.</p> : null}
    </form>
  );
}
