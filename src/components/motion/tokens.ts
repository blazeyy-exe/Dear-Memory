import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** One easing curve for the whole site: soft start, long, gentle settle. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fire once, slightly before the element is fully in view. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * True only on desktop-class devices (>=768px, hover + fine pointer) and when
 * the user has not asked for reduced motion. Gates parallax and pointer depth.
 * Starts false so server and first client render match.
 */
export function useDepthMotion() {
  const reduce = useReducedMotion();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok && !reduce;
}
