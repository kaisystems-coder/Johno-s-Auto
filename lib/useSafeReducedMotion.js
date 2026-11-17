"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

const getSnapshot = () =>
  typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(QUERY).matches;

// Server snapshot is false so SSR markup matches the hydration render.
const getServerSnapshot = () => false;

/** Reduced-motion preference without a hydration mismatch. */
export function useSafeReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True only for a real mouse/trackpad. Hover-only effects gate on this. */
const FINE = "(hover: hover) and (pointer: fine)";
function subscribeFine(cb) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(FINE);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}
export function useFinePointer() {
  return useSyncExternalStore(
    subscribeFine,
    () => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(FINE).matches,
    () => false
  );
}
