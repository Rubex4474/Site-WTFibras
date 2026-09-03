"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { HeroWater } from "./HeroWater";
import { HeroBubbles } from "./HeroBubbles";

function LogoFace({ rotateY }: { rotateY: MotionValue<number> }) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ rotateY, backfaceVisibility: "hidden" }}
    >
      <Image
        src="/images/logo-full.png"
        alt="WT Fibras"
        fill
        sizes="180px"
        className="object-contain"
      />
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Água + bolhas: visual de marca ambiente (não um objeto centralizado),
  // então pode conviver com o texto o tempo todo — sem disputa de centro
  // de atenção. Zoom sutil, parallax e blur/fade perto do fim do pin.
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const sceneOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, 0.6],
  );
  const blurAmount = useTransform(scrollYProgress, [0.75, 1], [0, 10]);
  const sceneFilter = useMotionTemplate`blur(${blurAmount}px)`;

  // Texto: já visível na abertura, some perto do fim do pin
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.55, 0.8],
    [1, 1, 1, 0],
  );
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -50]);

  // Logo: gira em 3D junto com o scroll, acompanhando a frase (mesmo
  // fade/deslocamento do texto acima, por estar dentro do mesmo container)
  const rotateYTarget = useTransform(scrollYProgress, [0, 0.7], [0, 360]);
  const rotateY = useSpring(rotateYTarget, {
    stiffness: 140,
    damping: 26,
    mass: 0.6,
  });
  const rotateYBack = useTransform(rotateY, (v) => v + 180);

  // Fundo: leve deriva de gradiente para dar profundidade ao pin
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-deep">
        {/* atmosfera de fundo */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(46,156,202,0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_85%_100%,rgba(191,227,240,0.16),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-[#03334f] to-[#021c2c]" />
        </motion.div>
        <div className="noise-overlay" aria-hidden />

        {/* texto de abertura: fade-in na carga + fade-out dirigido pelo scroll */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 max-w-[85vw] text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand-mist/80 sm:max-w-none sm:text-[0.7rem] sm:tracking-widest2"
          >
            WT Fibras · Desde sempre em hidromassagem
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl italic leading-[0.95] text-cream sm:text-7xl md:text-8xl"
          >
            Água quente,
            <br />
            <span className="not-italic font-light text-brand-mist">
              momentos eternos.
            </span>
          </motion.h1>

          {/* logo, girando em 3D junto com o scroll, abaixo da frase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-8 h-20 w-20 sm:mt-10 sm:h-28 sm:w-28"
          >
            <div
              className="absolute inset-0 rounded-full bg-brand-light/20 blur-2xl"
              aria-hidden
            />
            <div style={{ perspective: 600 }} className="relative h-full w-full">
              <div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <LogoFace rotateY={rotateY} />
                <LogoFace rotateY={rotateYBack} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* água (cáusticas) + bolhas de hidromassagem — visual de marca, não de produto */}
        <HeroWater
          scale={sceneScale}
          y={sceneY}
          opacity={sceneOpacity}
          filter={sceneFilter}
        />
        <HeroBubbles
          scale={sceneScale}
          y={sceneY}
          opacity={sceneOpacity}
          filter={sceneFilter}
        />

        {/* indicador de scroll */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="absolute inset-x-0 bottom-9 z-20 flex flex-col items-center gap-2 text-cream/70"
        >
          <span className="text-[0.65rem] uppercase tracking-widest2">
            Role para descobrir
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-cream/50"
          />
        </motion.div>
      </div>
    </section>
  );
}
