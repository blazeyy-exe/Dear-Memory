import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "./tokens";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  /** Add a soft blur-to-sharp. Use sparingly. */
  blur?: boolean;
  /** Play on mount (hero) instead of on scroll into view. */
  immediate?: boolean;
};

/** Single element reveal: rise + fade, optional blur. */
export function Reveal({ children, className, delay = 0, y = 20, duration = 0.7, blur, immediate }: RevealProps) {
  const reduce = useReducedMotion();
  const soft = blur && !reduce;
  const hidden = { opacity: 0, ...(reduce ? {} : { y }), ...(soft ? { filter: "blur(8px)" } : {}) };
  const show = {
    opacity: 1,
    ...(reduce ? {} : { y: 0 }),
    ...(soft ? { filter: "blur(0px)" } : {}),
    transition: { duration, delay, ease: EASE },
  };
  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(immediate ? { animate: show } : { whileInView: show, viewport: VIEWPORT })}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its RevealItem children when scrolled into view. */
export function RevealGroup({
  children, className, stagger = 0.08, delay = 0,
}: { children: ReactNode; className?: string; stagger?: number; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children, className, y = 20,
}: { children: ReactNode; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...(reduce ? {} : { y }) },
        show: { opacity: 1, ...(reduce ? {} : { y: 0 }), transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
