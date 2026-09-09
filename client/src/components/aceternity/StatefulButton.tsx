import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function StatefulButton({
  status = 'idle',
  className = '',
  children,
  disabled,
  type = 'submit',
}: {
  status?: Status;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  const label =
    status === 'loading' ? 'Enviando…' : status === 'success' ? 'Enviado' : children;

  return (
    <motion.button
      type={type}
      disabled={disabled || status === 'loading'}
      whileTap={status === 'loading' ? undefined : { scale: 0.98 }}
      className={`inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors duration-ui hover:bg-brand-hover disabled:opacity-60 ${className}`}
    >
      {status === 'loading' ? (
        <motion.span
          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
        />
      ) : null}
      {status === 'success' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : null}
      <span>{label}</span>
    </motion.button>
  );
}
