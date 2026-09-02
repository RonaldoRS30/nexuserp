import { useEffect, useRef, useState } from 'react';

export function RouteProgress({ trigger }: { trigger: string }) {
  const first = useRef(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setTick((value) => value + 1);
  }, [trigger]);

  if (!tick) return null;

  return (
    <div
      key={tick}
      className="route-progress pointer-events-none fixed left-0 right-0 top-0 z-[80] h-[3px]"
      aria-hidden
    />
  );
}
