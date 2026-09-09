import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';

type Step = {
  title: string;
  text: string;
};

export function StickyScroll({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ['start start', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const points = steps.map((_, index) => index / steps.length);
    const next = points.reduce((closest, point, index) => {
      return Math.abs(latest - point) < Math.abs(latest - points[closest]) ? index : closest;
    }, 0);
    setActive(next);
  });

  return (
    <div className="mt-12">
      <ol className="grid gap-6 sm:grid-cols-2 lg:hidden">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-2xl border border-line bg-surface-muted p-6">
            <span className="font-display text-2xl font-semibold text-brand/35">0{index + 1}</span>
            <p className="mt-3 text-sm font-semibold leading-6">{step.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{step.text}</p>
          </li>
        ))}
      </ol>

      <div
        ref={ref}
        className="relative hidden h-[32rem] gap-12 overflow-y-auto rounded-2xl border border-line bg-surface-muted px-10 py-8 lg:flex"
      >
        <div className="min-w-0 flex-1">
          {steps.map((step, index) => (
            <div key={step.title} className="py-16">
              <p className="font-display text-sm font-semibold text-brand/50">0{index + 1}</p>
              <motion.h3
                animate={{ opacity: active === index ? 1 : 0.28 }}
                className="mt-3 text-2xl font-semibold text-ink"
              >
                {step.title}
              </motion.h3>
              <motion.p
                animate={{ opacity: active === index ? 1 : 0.28 }}
                className="mt-3 max-w-md text-sm leading-7 text-ink-muted"
              >
                {step.text}
              </motion.p>
            </div>
          ))}
          <div className="h-24" />
        </div>
        <div className="sticky top-8 hidden h-72 w-80 shrink-0 overflow-hidden rounded-2xl border border-line bg-white p-8 lg:block">
          <p className="font-display text-5xl font-semibold text-brand/20">0{active + 1}</p>
          <p className="mt-6 text-xl font-semibold">{steps[active]?.title}</p>
          <p className="mt-3 text-sm leading-7 text-ink-muted">{steps[active]?.text}</p>
        </div>
      </div>
    </div>
  );
}
