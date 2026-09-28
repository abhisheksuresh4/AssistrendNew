import { useEffect } from 'react';

const SELECTOR = '[data-reveal]:not([data-revealed])';

/* Marks every [data-reveal] element with data-revealed as it enters the viewport.
   - Uses an attribute, not a class, so React re-renders can't wipe it.
   - A MutationObserver picks up elements mounted later (remounts, HMR).
   - Content is only hidden once <html> has .js-reveal, so a failure here never hides anything. */
export default function useReveal() {
  useEffect(() => {
    const root = document.documentElement;

    if (!('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-revealed', '');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    );

    const observeAll = (scope) => {
      if (scope.matches?.(SELECTOR)) io.observe(scope);
      scope.querySelectorAll?.(SELECTOR).forEach((el) => io.observe(el));
    };

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((node) => {
        if (node.nodeType === 1) observeAll(node);
      }));
    });

    observeAll(document);
    mo.observe(document.body, { childList: true, subtree: true });
    root.classList.add('js-reveal');

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);
}
