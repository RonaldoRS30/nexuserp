import { RefObject, useCallback, useLayoutEffect, useState } from 'react';

export type IndicatorBox = {
  left: number;
  top: number;
  width: number;
  height: number;
  ready: boolean;
};

export function useSlidingIndicator(
  activeKey: string,
  containerRef: RefObject<HTMLElement | null>,
) {
  const [box, setBox] = useState<IndicatorBox>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false,
  });

  const measure = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;
    const el = root.querySelector<HTMLElement>('[data-nav-item][data-active="true"]');
    if (!el) return;
    const r = root.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    setBox({
      left: b.left - r.left + root.scrollLeft,
      top: b.top - r.top + root.scrollTop,
      width: b.width,
      height: b.height,
      ready: true,
    });
  }, [containerRef]);

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      measure();
    });
    const root = containerRef.current;
    const observer = root ? new ResizeObserver(measure) : null;
    if (root) observer?.observe(root);
    window.addEventListener('resize', measure);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [activeKey, measure, containerRef]);

  return box;
}
