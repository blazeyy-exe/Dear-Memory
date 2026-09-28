import { createContext, useContext, useRef, type ReactNode, type PointerEvent } from "react";
import {
  motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue,
} from "framer-motion";
import { EASE, useDepthMotion } from "./tokens";

type Scene = { scroll: MotionValue<number>; px: MotionValue<number>; py: MotionValue<number>; enabled: boolean };
const SceneContext = createContext<Scene | null>(null);

/**
 * The hero <header>. Owns scroll progress and pointer position as motion
 * values, so layers move without any React re-renders. Pointer depth is
 * mouse-only; scroll parallax and pointer are both off on touch/reduced motion.
 */
export function HeroScene({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const enabled = useDepthMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 90, damping: 18, mass: 0.8 };
  const px = useSpring(mx, spring);
  const py = useSpring(my, spring);

  const onMove = (e: PointerEvent) => {
    if (!enabled || e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <SceneContext.Provider value={{ scroll: scrollYProgress, px, py, enabled }}>
      <header ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </header>
    </SceneContext.Provider>
  );
}

type LayerProps = {
  children: ReactNode;
  /** Positioning classes only (absolute, left, top, w-*, z-*). No transforms. */
  className?: string;
  /** Scroll parallax in px across the hero. Positive lags behind, negative runs ahead. */
  depth?: number;
  /** Max pointer influence: rotation in degrees, translation in px. */
  tilt?: { r?: number; x?: number; y?: number };
  /** Play the settle-in entrance. Text and background layers turn this off. */
  enter?: boolean;
  /** Resting rotation in degrees (replaces Tailwind rotate-*). */
  rotate?: number;
  delay?: number;
  blur?: boolean;
};

/** One depth layer: outer = position, middle = scroll + pointer, inner = entrance. */
export function HeroLayer({
  children, className, depth = 0, tilt = {}, enter = true, rotate = 0, delay = 0, blur = false,
}: LayerProps) {
  const s = useContext(SceneContext);
  if (!s) throw new Error("HeroLayer must be rendered inside HeroScene");
  const reduce = useReducedMotion();
  const y = useTransform([s.scroll, s.py], (v: number[]) =>
    s.enabled ? v[0] * depth + v[1] * 2 * (tilt.y ?? 0) : 0);
  const x = useTransform(s.px, (v) => (s.enabled ? v * 2 * (tilt.x ?? 0) : 0));
  const r = useTransform(s.px, (v) => (s.enabled ? v * 2 * (tilt.r ?? 0) : 0));

  const spring = (stiffness: number, damping: number) => ({ type: "spring" as const, stiffness, damping, delay });
  return (
    <div className={className}>
      <motion.div style={{ x, y, rotate: r }}>
        {enter ? (
          <motion.div
            initial={reduce ? { opacity: 1, rotate } : {
              opacity: 0, scale: 0.92, y: 30, rotate: rotate + (rotate >= 0 ? 2 : -2),
              ...(blur ? { filter: "blur(8px)" } : {}),
            }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate, ...(blur ? { filter: "blur(0px)" } : {}) }}
            transition={{
              rotate: spring(70, 14), y: spring(80, 16), scale: spring(90, 17),
              opacity: { duration: 0.7, delay, ease: EASE },
              filter: { duration: 0.8, delay, ease: EASE },
            }}
          >
            {children}
          </motion.div>
        ) : children}
      </motion.div>
    </div>
  );
}

/** Headline wrapper: staggers its <HeroWord> children on mount. */
export function HeroHeadline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } } }}
    >
      {children}
    </motion.h1>
  );
}

export function HeroWord({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={{
        hidden: { opacity: 0, ...(reduce ? {} : { y: 26, filter: "blur(8px)" }) },
        show: {
          opacity: 1, ...(reduce ? {} : { y: 0, filter: "blur(0px)" }),
          transition: { duration: 0.75, ease: EASE },
        },
      }}
    >
      {children}
    </motion.span>
  );
}
