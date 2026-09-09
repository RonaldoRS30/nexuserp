import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export function Highlight({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      initial={reduce ? false : { backgroundSize: '0% 100%' }}
      animate={{ backgroundSize: '100% 100%' }}
      transition={{ duration: 1.05, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="box-decoration-clone inline rounded-md bg-gradient-to-r from-indigo-300 to-indigo-100 px-1.5"
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        backgroundSize: reduce ? '100% 100%' : undefined,
      }}
    >
      {children}
    </motion.span>
  );
}
