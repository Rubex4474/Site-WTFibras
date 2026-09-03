"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

export function HeroLogoWave({
  scale,
  y,
  opacity,
  filter,
  progress,
}: {
  scale: MotionValue<number>;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
  filter: MotionValue<string>;
  progress: MotionValue<number>;
}) {
  const pathLength = useTransform(progress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      style={{ scale, y, opacity, filter }}
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute -inset-24 rounded-full bg-[radial-gradient(circle,rgba(191,227,240,0.25),transparent_65%)] blur-3xl" />
        <svg
          viewBox="0 0 320 170"
          className="relative h-[34vh] max-h-[340px] w-auto"
          fill="none"
        >
          <defs>
            <linearGradient id="wt-cyan-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#1DA1DE" />
              <stop offset="100%" stopColor="#008AC4" />
            </linearGradient>
          </defs>
          {/* faixa traseira (marinho), menor, deslocada para baixo/direita */}
          <motion.path
            d="M162,98 C205,132 255,128 302,62"
            stroke="#2B527E"
            strokeWidth="20"
            strokeLinecap="round"
            style={{ pathLength }}
          />
          {/* faixa principal (ciano), maior */}
          <motion.path
            d="M18,88 C95,150 190,140 296,22"
            stroke="url(#wt-cyan-grad)"
            strokeWidth="26"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
