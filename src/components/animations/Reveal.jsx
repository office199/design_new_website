import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Reveals a single block of content with a soft fade + upward slide the
 * first time it scrolls into view. Respects prefers-reduced-motion.
 */
export function Reveal({ children, className = '', delay = 0, y = 24, as = 'div', once = true }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

const itemV = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/**
 * Container that staggers the entrance of its <StaggerItem> children for
 * a cascading, lively reveal as the group scrolls into view.
 */
export function Stagger({ children, className = '', as = 'div', once = true, gap = 0.08 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: 0.05 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '0px 0px -60px 0px' }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const Comp = motion[as] || motion.div;
  return (
    <Comp className={className} variants={itemV}>
      {children}
    </Comp>
  );
}
