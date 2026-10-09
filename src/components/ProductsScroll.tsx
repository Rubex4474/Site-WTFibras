"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  products,
  formatPrice,
  includedItemsFor,
  FREE_SHIPPING_STATES_LABEL,
} from "@/lib/products";

function CheckIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden="true">
      <path
        d="m5 12.5 4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M2 6h11v10H2V6Zm11 4h4l3.5 3.5V16H13v-6ZM5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const N = products.length;
const BLEND = 0.055;

function windowFor(i: number) {
  const start = i / N;
  const end = (i + 1) / N;

  if (i === 0) {
    return {
      opacityIn: [0, end - BLEND, end + BLEND],
      opacityOut: [1, 1, 0],
      yIn: [0, end - BLEND, end + BLEND],
      yOut: [0, 0, -28],
    };
  }
  if (i === N - 1) {
    return {
      opacityIn: [start - BLEND, start + BLEND, 1],
      opacityOut: [0, 1, 1],
      yIn: [start - BLEND, start + BLEND, 1],
      yOut: [28, 0, 0],
    };
  }
  return {
    opacityIn: [start - BLEND, start + BLEND, end - BLEND, end + BLEND],
    opacityOut: [0, 1, 1, 0],
    yIn: [start - BLEND, start + BLEND, end - BLEND, end + BLEND],
    yOut: [28, 0, 0, -28],
  };
}

export function ProductsScroll() {
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const colorMids = products.map((_, i) => (i + 0.5) / N);
  const bgColor = useTransform(
    scrollYProgress,
    colorMids,
    products.map((p) => p.colorDeep),
  );
  const glowColor = useTransform(
    scrollYProgress,
    colorMids,
    products.map((p) => p.color),
  );

  return (
    <section ref={wrapperRef} className="relative" style={{ height: `${N * 100}vh` }}>
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <motion.div
          style={{ backgroundColor: glowColor }}
          className="pointer-events-none absolute -inset-[15%] opacity-25 blur-[120px]"
          aria-hidden
        />
        <div className="noise-overlay" aria-hidden />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
          <span className="mb-3 text-[0.68rem] font-semibold uppercase tracking-widest2 text-cream/50 sm:mb-8">
            Linha WT Fibras
          </span>

          <div className="grid items-center gap-4 sm:gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
            {/* Coluna de texto — pilha de painéis por produto */}
            <div className="relative order-2 h-[300px] sm:h-[340px] md:order-1 md:h-[460px]">
              {products.map((product, i) => {
                const w = windowFor(i);
                const opacity = useTransform(
                  scrollYProgress,
                  w.opacityIn,
                  w.opacityOut,
                );
                const y = useTransform(scrollYProgress, w.yIn, w.yOut);

                return (
                  <motion.div
                    key={product.slug}
                    style={{ opacity, y }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <span
                      className="mb-1 font-display text-xs italic sm:mb-3 sm:text-sm"
                      style={{ color: product.colorSoft }}
                    >
                      {product.tagline}
                    </span>
                    <h2 className="font-display text-2xl italic leading-[0.95] text-cream sm:text-5xl md:text-6xl">
                      {product.name}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
                      <span
                        className="inline-flex h-6 items-center rounded-full px-3 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-deep sm:h-9 sm:px-4 sm:text-xs"
                        style={{ backgroundColor: product.colorSoft }}
                      >
                        Até {product.capacity} pessoas
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-wide text-cream/50 sm:text-xs">
                        {product.line}
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2 sm:mt-5 sm:gap-3">
                      {product.originalPrice && (
                        <span className="text-xs text-cream/40 line-through sm:text-sm">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="font-display text-xl italic text-cream sm:text-4xl">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <p className="text-[0.65rem] text-cream/50 sm:mt-1 sm:text-xs">
                      em até {product.installments}x sem juros
                    </p>

                    {/* o que já vem no valor */}
                    <ul className="mt-2 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                      {includedItemsFor(product).map((item) => (
                        <li
                          key={item}
                          className="inline-flex items-center gap-1 rounded-full bg-cream/10 px-2 py-0.5 text-[0.65rem] font-semibold text-cream sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs"
                        >
                          <CheckIcon
                            className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
                            style={{ color: product.colorSoft }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-2 max-w-md font-body text-xs leading-snug text-cream/75 sm:mt-5 sm:text-[0.95rem] sm:leading-relaxed">
                      {product.description}
                    </p>
                    <p className="mt-1 text-[0.65rem] text-cream/40 sm:mt-3 sm:text-xs">
                      {product.dimensions} · {product.liters}L
                    </p>

                    <div
                      className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-1 text-[0.6rem] sm:mt-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs"
                      style={{
                        borderColor: `${product.colorSoft}55`,
                        color: product.colorSoft,
                      }}
                    >
                      <TruckIcon className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                      <span>Frete grátis para {FREE_SHIPPING_STATES_LABEL}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Coluna de imagem — pilha de fotos por produto */}
            <div className="relative order-1 aspect-square w-[62vw] max-w-[260px] justify-self-center sm:w-full sm:max-w-[560px] md:order-2 md:max-w-[680px] md:justify-self-end">
              {products.map((product, i) => {
                const w = windowFor(i);
                const opacity = useTransform(
                  scrollYProgress,
                  w.opacityIn,
                  w.opacityOut,
                );
                const scale = useTransform(opacity, [0, 1], [0.92, 1]);

                return (
                  <motion.div
                    key={product.slug}
                    style={{ opacity, scale }}
                    className="absolute inset-0"
                  >
                    <div className="relative h-full w-full">
                      <div
                        className="absolute inset-6 rounded-full opacity-40 blur-3xl"
                        style={{ backgroundColor: product.colorSoft }}
                        aria-hidden
                      />
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 88vw, 52vw"
                        className="relative object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,0.4)]"
                      />
                      {!product.hasRealPhoto && (
                        <span className="absolute bottom-2 right-2 rounded-full bg-black/30 px-3 py-1 text-[0.6rem] uppercase tracking-wide text-cream/70 backdrop-blur-sm">
                          Imagem ilustrativa
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* indicador de progresso, decorativo */}
          <div className="absolute bottom-4 left-6 flex gap-2 sm:bottom-10 md:left-10">
            {products.map((product, i) => {
              const w = windowFor(i);
              const opacity = useTransform(
                scrollYProgress,
                w.opacityIn,
                w.opacityOut,
              );
              const width = useTransform(opacity, [0, 1], [12, 34]);
              return (
                <motion.span
                  key={product.slug}
                  style={{ opacity: useTransform(opacity, [0, 1], [0.35, 1]), width }}
                  className="h-[3px] rounded-full bg-cream"
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
