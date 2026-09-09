import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

export function GlowFrame({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 18 });

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    x.set((event.clientX - box.left) / box.width - 0.5);
    y.set((event.clientY - box.top) / box.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={reduce ? undefined : { duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 980 }}
        className="relative overflow-hidden rounded-[1.15rem] p-[2.5px]"
      >
        <span className="absolute inset-0 overflow-hidden rounded-[1.15rem]">
          <motion.span
            className="absolute left-1/2 top-1/2 h-[240%] w-[240%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_32%,#d6d3d1_48%,#a8a29e_56%,transparent_68%)]"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: 'linear' }}
          />
        </span>
        <div className="relative z-10 overflow-hidden rounded-[1.05rem] bg-stone-50">{children}</div>
      </motion.div>
    </motion.div>
  );
}
