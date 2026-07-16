import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Smooth ease-out curve used across the site for a premium feel.
const EASE = [0.22, 1, 0.36, 1];

/**
 * Wraps a page's content to create a smooth enter/exit transition when
 * navigating between routes. Scrolls to top on mount so the next page
 * always starts from the top, and fully respects prefers-reduced-motion.
 */
export default function PageTransition({ children, className = '' }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}
