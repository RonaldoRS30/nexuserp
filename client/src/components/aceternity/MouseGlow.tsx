import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    const node = ref.current;
    if (!parent || !node) return;

    const onMove = (event: MouseEvent) => {
      const box = parent.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      node.style.background = `radial-gradient(520px circle at ${x}px ${y}px, rgba(79,70,229,0.28), transparent 58%)`;
    };

    parent.addEventListener('mousemove', onMove);
    return () => parent.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        background: 'radial-gradient(520px circle at 72% 28%, rgba(79,70,229,0.22), transparent 58%)',
      }}
      aria-hidden
    />
  );
}
