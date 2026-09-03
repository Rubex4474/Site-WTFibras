"use client";

import { motion, type MotionValue } from "framer-motion";

const BUBBLE_COUNT = 26;

// Mulberry32-style hash: only integer/multiply ops, so it is bit-identical
// between server (Node) and client (browser) — Math.sin() is NOT guaranteed
// to be, which caused a real SSR/CSR hydration mismatch here before.
function seededRandom(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const bubbles = Array.from({ length: BUBBLE_COUNT }, (_, i) => {
  const left = seededRandom(i * 97 + 11) * 100;
  const size = 7 + seededRandom(i * 197 + 71) * 30;
  const duration = 4 + seededRandom(i * 337 + 131) * 5.5;
  const delay = seededRandom(i * 521 + 191) * 6;
  const drift = (seededRandom(i * 773 + 37) - 0.5) * 80;
  const peakOpacity = 0.55 + seededRandom(i * 937 + 293) * 0.4;
  return { left, size, duration, delay, drift, peakOpacity };
});

export function HeroBubbles({
  scale,
  y,
  opacity,
  filter,
}: {
  scale: MotionValue<number>;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
  filter: MotionValue<string>;
}) {
  return (
    <motion.div
      style={{ scale, y, opacity, filter }}
      className="absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_100%,rgba(46,156,202,0.45),transparent_60%)]" />

      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-cream/60 bg-gradient-to-br from-cream/70 to-brand-light/20 shadow-[0_0_10px_rgba(191,227,240,0.35)]"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            bottom: -40,
          }}
          animate={{
            y: [0, -820],
            x: [0, b.drift, 0],
            opacity: [0, b.peakOpacity, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
