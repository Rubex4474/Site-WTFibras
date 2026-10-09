"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  type Product,
  formatPrice,
  whatsappUrlFor,
  includedItemsFor,
  FREE_SHIPPING_STATES_LABEL,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import { trackEvent, whatsappEventFor } from "@/lib/analytics";

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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.02 3C9.4 3 4 8.37 4 15c0 2.36.68 4.56 1.86 6.44L4 29l7.75-1.83A11.9 11.9 0 0 0 16.02 27C22.63 27 28 21.63 28 15S22.63 3 16.02 3Zm0 21.8c-1.98 0-3.83-.57-5.4-1.55l-.39-.23-4.6 1.09 1.12-4.48-.25-.4A9.75 9.75 0 0 1 6.2 15c0-5.42 4.4-9.8 9.82-9.8 5.42 0 9.8 4.38 9.8 9.8 0 5.42-4.4 9.8-9.8 9.8Zm5.36-7.34c-.29-.15-1.73-.86-2-.95-.27-.1-.46-.15-.66.14-.2.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.47-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.2 3.01.15.19 2.06 3.15 5 4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.19-.56-.34Z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
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

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const specFields: { label: string; value: (p: Product) => string }[] = [
  { label: "Dimensões", value: (p) => p.dimensions },
  { label: "Capacidade", value: (p) => `${p.liters} litros` },
  { label: "Jatos", value: (p) => `${p.jets} jatos` },
  { label: "Linha", value: (p) => p.line },
];

export function ProductVideoCard({
  product,
  variants,
}: {
  product: Product;
  variants?: Variants;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const shortName = product.name.replace("Spa ", "");

  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-brand-deep/10 bg-white/60 p-4"
    >
      <div
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-15"
        style={{ backgroundColor: product.color }}
        aria-hidden
      />

      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-deep/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 30vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <p className="mt-4 text-center font-display text-xl italic text-brand-deep">
        {shortName}
      </p>
      <p className="text-center text-[0.68rem] uppercase tracking-wide text-brand-deep/50">
        {product.capacity} pessoas
      </p>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 flex items-center justify-center gap-1.5 self-center text-[0.68rem] font-semibold uppercase tracking-wide text-brand-deep/60 transition-colors hover:text-brand-deep"
      >
        {expanded ? "Fechar" : product.video ? "Vídeo e ficha técnica" : "Ficha técnica"}
        <ChevronIcon
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300",
            expanded && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 border-t border-brand-deep/10 pt-4">
              {product.video && (
                <div className="relative mx-auto aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-xl bg-brand-deep/10">
                  {isPlaying ? (
                    <video
                      className="h-full w-full object-contain"
                      src={product.video}
                      poster={product.videoPoster}
                      autoPlay
                      controls
                      playsInline
                    />
                  ) : (
                    <>
                      <Image
                        src={product.videoPoster ?? product.image}
                        alt={`Vídeo do ${shortName}`}
                        fill
                        sizes="220px"
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        aria-label={`Assistir vídeo do ${shortName}`}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-deep/80 text-cream shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                          <PlayIcon className="ml-1 h-5 w-5" />
                        </span>
                      </button>
                    </>
                  )}
                </div>
              )}

              <div className="text-center">
                <div className="flex items-baseline justify-center gap-2">
                  {product.originalPrice && (
                    <span className="text-xs text-brand-deep/40 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="font-display text-2xl italic text-brand-deep">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-brand-deep/70">
                  em até {product.installments}x sem juros
                </p>
              </div>

              <div className="rounded-2xl bg-brand-deep/5 px-4 py-3">
                <p className="text-center text-[0.6rem] uppercase tracking-wide text-brand-deep/40">
                  Incluso no valor
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {includedItemsFor(product).map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-xs font-semibold text-brand-deep/80"
                    >
                      <CheckIcon className="h-3.5 w-3.5 shrink-0" style={{ color: product.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="mx-auto flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  backgroundColor: `${product.colorSoft}40`,
                  color: product.color,
                }}
              >
                <TruckIcon className="h-3.5 w-3.5 shrink-0" />
                Frete grátis para {FREE_SHIPPING_STATES_LABEL}
              </div>

              <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                {specFields.map((field) => (
                  <div key={field.label}>
                    <dt className="text-[0.6rem] uppercase tracking-wide text-brand-deep/40">
                      {field.label}
                    </dt>
                    <dd className="text-xs text-brand-deep/80">
                      {field.value(product)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappUrlFor(product)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent(whatsappEventFor(product.slug), { spa: product.name })
        }
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D2E] px-4 py-2.5 text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        <WhatsAppIcon className="h-4 w-4 shrink-0" />
        Falar sobre o {shortName}
      </a>
    </motion.div>
  );
}
