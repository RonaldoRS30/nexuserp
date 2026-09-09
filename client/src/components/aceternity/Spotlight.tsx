import { motion } from 'motion/react';

type SpotlightProps = {
  className?: string;
};

export function Spotlight({ className = '' }: SpotlightProps) {
  const first =
    'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(239,84%,67%,.22) 0, hsla(239,84%,55%,.08) 50%, hsla(239,84%,45%,0) 80%)';
  const second =
    'radial-gradient(50% 50% at 50% 50%, hsla(239,84%,67%,.14) 0, hsla(239,84%,55%,.06) 80%, transparent 100%)';
  const third =
    'radial-gradient(50% 50% at 50% 50%, hsla(239,84%,67%,.10) 0, hsla(239,84%,45%,.04) 80%, transparent 100%)';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        animate={{ x: [0, 80, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute left-0 top-0 h-full w-full"
      >
        <div
          className="absolute left-0 top-0"
          style={{ transform: 'translateY(-280px) rotate(-45deg)', background: first, width: 520, height: 1200 }}
        />
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ transform: 'rotate(-45deg) translate(5%, -50%)', background: second, width: 220, height: 1200 }}
        />
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ transform: 'rotate(-45deg) translate(-180%, -70%)', background: third, width: 220, height: 1200 }}
        />
      </motion.div>
      <motion.div
        animate={{ x: [0, -80, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute right-0 top-0 h-full w-full"
      >
        <div
          className="absolute right-0 top-0"
          style={{ transform: 'translateY(-280px) rotate(45deg)', background: first, width: 520, height: 1200 }}
        />
        <div
          className="absolute right-0 top-0 origin-top-right"
          style={{ transform: 'rotate(45deg) translate(-5%, -50%)', background: second, width: 220, height: 1200 }}
        />
      </motion.div>
    </motion.div>
  );
}
