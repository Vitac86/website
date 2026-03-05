import { cn } from '@/lib/utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: Props): JSX.Element {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}
