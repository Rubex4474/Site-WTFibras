"use client";

import { motion, type MotionValue } from "framer-motion";

export function HeroWater({
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
      className="absolute inset-0"
      aria-hidden
    >
      {/* faixa de água confinada à base — estende além da tela nos 4 lados
          (esquerda, direita e embaixo) para que a borda "rasgada" real da
          turbulência nunca fique visível; no topo ela é mascarada com um
          degradê suave, sem nenhuma borda dura */}
      <div
        className="absolute inset-x-[-20%] -bottom-[20%] h-[80%]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 38%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 38%)",
        }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter
              id="wt-caustics"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              {/* baseFrequency fixo — animar esse valor força o navegador a
                  regerar o campo de ruído inteiro a cada frame, o que
                  derrubava o FPS em celulares (feTurbulence + feDisplacementMap
                  já são caros sozinhos, animados ficam proibitivos) */}
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.013 0.021"
                numOctaves="2"
                seed="7"
                result="turb"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="turb"
                scale="85"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <radialGradient id="wt-water-a" cx="32%" cy="55%" r="70%">
              <stop offset="0%" stopColor="#2E9CCA" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2E9CCA" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="wt-water-b" cx="72%" cy="80%" r="65%">
              <stop offset="0%" stopColor="#BFE3F0" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#BFE3F0" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="wt-water-c" cx="50%" cy="70%" r="60%">
              <stop offset="0%" stopColor="#7FD1E8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#7FD1E8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g style={{ mixBlendMode: "screen" }} filter="url(#wt-caustics)">
            <rect width="100%" height="100%" fill="url(#wt-water-a)" />
            <rect width="100%" height="100%" fill="url(#wt-water-b)" />
            <rect width="100%" height="100%" fill="url(#wt-water-c)" />
          </g>
        </svg>
      </div>

      {/* anéis de ondulação, contínuos, independentes do scroll */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute h-36 w-36 rounded-full border border-brand-mist/20"
            animate={{ scale: [1, 6.5], opacity: [0.3, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.4,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
