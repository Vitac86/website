import { normalizePhone } from '@/lib/lead/validate';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function PhoneInput({ value, onChange }: Props): JSX.Element {
  return (
    <input
      value={value}
      onChange={(event) => onChange(normalizePhone(event.target.value))}
      placeholder="+7 900 000 00 00"
      className="field-input"
      required
      name="phone"
      type="tel"
      inputMode="tel"
      autoComplete="tel"
    />
  );
}
