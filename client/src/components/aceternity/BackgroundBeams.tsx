import { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const paths = [
  'M 8 110 Q 22 58 38 -8',
  'M 18 110 Q 34 62 52 -8',
  'M 28 110 Q 48 55 66 -8',
  'M 40 110 Q 58 60 78 -8',
  'M 52 110 Q 70 52 90 -8',
  'M 64 110 Q 82 64 102 -8',
  'M 76 110 Q 92 50 112 -8',
  'M 88 110 Q 104 58 124 -8',
];

export function BackgroundBeams() {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, '');

  if (reduce) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#a8a29e" stopOpacity="0" />
          <stop offset="45%" stopColor="#78716c" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#d6d3d1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="0.7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{
            duration: 3.8,
            delay: index * 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}
