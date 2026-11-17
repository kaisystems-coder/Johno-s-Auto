"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

// LazyMotion + `m` keeps framer-motion's shipped features to domAnimation.
// reducedMotion="user" makes Motion itself honour the OS setting for
// transform animations, as a second line of defence.
export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
