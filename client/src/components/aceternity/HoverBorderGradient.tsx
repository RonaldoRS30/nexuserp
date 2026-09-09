import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export function HoverBorderGradient({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className="group relative inline-flex overflow-hidden rounded-full p-px">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <motion.span
          className="absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#4F46E5_42%,transparent_68%)] opacity-70"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </span>
      <span className="relative z-10 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-ink ring-1 ring-inset ring-line transition-colors duration-ui group-hover:text-brand">
        {children}
      </span>
    </Link>
  );
}
