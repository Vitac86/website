'use client';

import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { ConsentCheckbox } from '@/components/forms/ConsentCheckbox';
import { PhoneInput } from '@/components/forms/PhoneInput';
import { normalizePhone } from '@/lib/lead/validate';

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  task?: string;
  consent?: string;
  submit?: string;
};

type Props = {
  theme?: 'light' | 'dark';
};

export function ConsultationForm({ theme = 'light' }: Props): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('Авиация');
  const [email, setEmail] = useState('');
  const [task, setTask] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isDark = theme === 'dark';
  const formClassName = isDark ? 'space-y-4 rounded-xl border border-slate-700/70 bg-slate-900/50 p-4 sm:p-5' : 'space-y-3 rounded-xl bg-white p-4 sm:p-5';
  const fieldClassName = isDark
    ? 'w-full rounded-lg border border-slate-600/85 bg-slate-800/85 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 transition-all duration-300 focus-visible:border-sky-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/20'
    : 'field-input';
  const submitClassName = isDark
    ? 'w-full rounded-xl bg-[linear-gradient(135deg,#1d4ed8,#0d426f)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_26px_-18px_rgba(30,64,175,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60'
    : 'btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60';

  function validateForm(): FormErrors {
    const nextErrors: FormErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Имя должно быть не короче 2 символов';
    }

    const normalizedPhone = normalizePhone(phone);
    if (normalizedPhone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Введите минимум 10 цифр телефона';
    }

    if (email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Введите корректный email';
    }

    if (task.trim().length > 0 && task.trim().length < 5) {
      nextErrors.task = 'Опишите задачу хотя бы в 5 символов';
    }

    if (!consent) {
      nextErrors.consent = 'Подтвердите согласие на обработку данных';
    }

    return nextErrors;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

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
          utm: Object.keys(utm).length > 0 ? utm : undefined,
          email: email.trim() || undefined,
          industry: industry.trim() || undefined,
          task: task.trim() || undefined,
          source: 'consultation_form'
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
      setEmail('');
      setTask('');
      setIndustry('Авиация');
      setErrors({});
      setIsSuccess(true);
    } catch {
      setErrors({ submit: 'Не удалось отправить форму. Попробуйте ещё раз.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={formClassName}>
      {!isDark ? <h3 className="text-lg font-semibold">Получить консультацию</h3> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={`mb-2 block text-xs font-bold uppercase tracking-[0.08em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Имя</label>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Ваше имя"
            className={fieldClassName}
            required
            name="name"
          />
          {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name}</p> : null}
        </div>

        <div>
          <label className={`mb-2 block text-xs font-bold uppercase tracking-[0.08em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Отрасль</label>
          <select value={industry} onChange={(event) => setIndustry(event.target.value)} className={fieldClassName}>
            <option>Авиация</option>
            <option>Автопром</option>
            <option>Медтехника</option>
            <option>Энергетика</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={`mb-2 block text-xs font-bold uppercase tracking-[0.08em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Телефон</label>
          <PhoneInput
            value={phone}
            onChange={(value) => {
              setPhone(value);
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            className={isDark ? 'w-full rounded-lg border border-slate-600/85 bg-slate-800/85 px-3.5 py-2.5 text-sm text-slate-100' : undefined}
          />
          {errors.phone ? <p className="mt-1 text-sm text-red-500">{errors.phone}</p> : null}
        </div>

        <div>
          <label className={`mb-2 block text-xs font-bold uppercase tracking-[0.08em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Email компании</label>
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            type="email"
            placeholder="name@company.com"
            className={fieldClassName}
          />
          {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email}</p> : null}
        </div>
      </div>

      <div>
        <label className={`mb-2 block text-xs font-bold uppercase tracking-[0.08em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Задача по обработке</label>
        <textarea
          value={task}
          onChange={(event) => {
            setTask(event.target.value);
            setErrors((prev) => ({ ...prev, task: undefined }));
          }}
          placeholder="Опишите текущую производственную задачу..."
          rows={3}
          className={fieldClassName}
        />
      </div>
      {errors.task ? <p className="-mt-2 text-sm text-red-500">{errors.task}</p> : null}

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
        {errors.consent ? <p className="mt-1 text-sm text-red-500">{errors.consent}</p> : null}
      </div>

      <button type="submit" disabled={isSubmitting} className={submitClassName}>
        {isSubmitting ? 'Отправка...' : 'Получить поддержку'}
      </button>

      {errors.submit ? <p className="text-sm text-red-500">{errors.submit}</p> : null}
      {isSuccess ? (
        <p className={`rounded-md px-3 py-2 text-sm ${isDark ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
          Спасибо! Заявка отправлена, мы скоро свяжемся с вами.
        </p>
      ) : null}
    </form>
  );
}
