import { useLayoutEffect } from 'react';

export function useSectionReveal(scopeKey = '', selector = 'main section[id]:not(#inicio)') {
  useLayoutEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      nodes.forEach((node) => node.classList.add('is-inview'));
      return undefined;
    }

    const isVisible = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.94 && rect.bottom > 60;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' },
    );

    nodes.forEach((node) => {
      if (isVisible(node)) {
        node.classList.add('is-inview');
        return;
      }
      node.classList.add('section-reveal');
      observer.observe(node);
    });

    const fallback = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.add('is-inview'));
    }, 1600);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [scopeKey, selector]);
}
