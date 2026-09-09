import { Children, useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export function HoverGrid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const layoutId = useId();
  const items = Children.toArray(children);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <div
          key={index}
          className="relative h-full"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === index ? (
              <motion.span
                className="absolute -inset-2 rounded-[1.35rem] bg-brand/[0.07]"
                layoutId={layoutId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.18 } }}
                exit={{ opacity: 0, transition: { duration: 0.16, delay: 0.08 } }}
              />
            ) : null}
          </AnimatePresence>
          <div className="relative z-10 h-full">{child}</div>
        </div>
      ))}
    </div>
  );
}
