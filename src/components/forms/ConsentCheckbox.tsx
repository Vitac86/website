import Link from 'next/link';

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function ConsentCheckbox({ checked, onChange }: Props): JSX.Element {
  return (
    <label className="flex items-start gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1" required />
      <span>
        Даю согласие на обработку персональных данных. <Link href="/consent" className="text-brand">Подробнее</Link>
      </span>
    </label>
  );
}
