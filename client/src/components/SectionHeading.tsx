interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'w-full text-center' : 'w-full'}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-ink-muted">{description}</p> : null}
    </div>
  );
}
