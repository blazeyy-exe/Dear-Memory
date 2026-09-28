import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { EASE, VIEWPORT, useDepthMotion } from "./tokens";

type ImageRevealProps = {
  src: string;
  alt: string;
  /** Final resting rotation in degrees. Replaces Tailwind rotate-* on the frame. */
  tilt?: number;
  /** wipe: vertical clip reveal. slow: long horizontal uncover. soft: blur to sharp. */
  variant?: "wipe" | "slow" | "soft";
  /** Side the horizontal wipe starts from. */
  from?: "left" | "right";
  /** Subtle scroll-linked drift inside the frame (desktop only). */
  parallax?: boolean;
  /** Corner radius in px; must match the frame's rounded-* class. */
  radius?: number;
  delay?: number;
  /** Classes for the frame: radius, shadow, ring. Do not add rotate-*. */
  className?: string;
  imgClassName?: string;
};

/**
 * Frame > clip > scale > img. The shadow lives on the outer frame so the
 * clip-path never cuts it off.
 */
export function ImageReveal({
  src, alt, tilt = 0, variant = "wipe", from = "left", parallax = true,
  radius = 40, delay = 0.12, className = "", imgClassName = "aspect-[4/5]",
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const depth = useDepthMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const drifts = parallax && depth;

  const r = `round ${radius}px`;
  const inset = (t: number, rt: number, b: number, l: number) => `inset(${t}% ${rt}% ${b}% ${l}% ${r})`;
  const open = inset(0, 0, 0, 0);
  const closed =
    variant === "wipe" ? inset(0, 0, 100, 0)
    : variant === "slow" ? (from === "left" ? inset(0, 100, 0, 0) : inset(0, 0, 0, 100))
    : open;
  const dur = variant === "slow" ? 1.5 : 1.1;
  const t = { duration: dur, delay, ease: EASE };

  const frame: Variants = reduce
    ? { hidden: { opacity: 0, rotate: tilt }, show: { opacity: 1, rotate: tilt, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 24, rotate: tilt + (tilt >= 0 ? 1.5 : -1.5) },
        show: { opacity: 1, y: 0, rotate: tilt, transition: { ...t, opacity: { duration: 0.6, delay } } },
      };
  const clip: Variants | undefined =
    reduce || variant === "soft" ? undefined : { hidden: { clipPath: closed }, show: { clipPath: open, transition: t } };
  const settle: Variants | undefined = reduce
    ? undefined
    : variant === "soft"
      ? { hidden: { scale: 1.03, filter: "blur(12px)" }, show: { scale: 1, filter: "blur(0px)", transition: t } }
      : { hidden: { scale: 1.08 }, show: { scale: 1, transition: t } };

  return (
    <motion.div ref={ref} className={className} variants={frame} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <motion.div className="overflow-hidden rounded-[inherit]" variants={clip}>
        <motion.div variants={settle}>
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={`w-full object-cover ${imgClassName}`}
            style={drifts ? { y, scale: 1.12 } : undefined}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
