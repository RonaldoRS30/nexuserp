import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames } from '../utils/format';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  children: ReactNode;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const styles = {
    primary:
      'bg-brand text-white hover:bg-brand-hover border-transparent',
    secondary:
      'bg-white text-ink border-line hover:border-brand hover:text-brand',
    ghost: 'bg-transparent text-ink border-transparent hover:text-brand',
    dark: 'bg-primary-dark text-white border-transparent hover:bg-primary',
  }[variant];

  return (
    <button
      className={classNames(
        'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium tracking-tight transition-colors duration-ui disabled:cursor-not-allowed disabled:opacity-60',
        styles,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
