import { useRef } from 'react';

export type NavDirection = 'fwd' | 'back' | 'fade';

function indexOfPath(order: string[], path: string) {
  const exact = order.indexOf(path);
  if (exact !== -1) return exact;
  return order.findIndex((item) => item !== '/' && path.startsWith(item));
}

export function useNavDirection(pathname: string, order: string[]): NavDirection {
  const prev = useRef(pathname);
  const direction = useRef<NavDirection>('fade');

  if (prev.current !== pathname) {
    const from = indexOfPath(order, prev.current);
    const to = indexOfPath(order, pathname);
    direction.current =
      from === -1 || to === -1 || from === to ? 'fade' : to > from ? 'fwd' : 'back';
    prev.current = pathname;
  }

  return direction.current;
}
