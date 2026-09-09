import type { ReactNode } from 'react';
import { classNames } from '../../utils/format';

export function BentoGrid({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={classNames('grid auto-rows-fr gap-4 md:grid-cols-2', className)}>{children}</div>;
}

export function BentoCard({
  className,
  index,
  title,
  text,
}: {
  className?: string;
  index: number;
  title: string;
  text: string;
}) {
  return (
    <article className={classNames('rounded-2xl border border-line bg-white p-6', className)}>
      <span className="font-display text-sm text-ink-muted">0{index + 1}</span>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-muted">{text}</p>
    </article>
  );
}
