"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { Counter } from "./Counter";
import { ProductVideoCard } from "./ProductVideoCard";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export function Institutional() {
  return (
    <section className="relative overflow-hidden bg-cream py-28 md:py-36">
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-brand-mist/40 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-brand-light/20 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.12 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-block text-[0.7rem] font-semibold uppercase tracking-widest2 text-brand"
          >
            A WT Fibras
          </motion.span>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl italic leading-[1.05] text-brand-deep sm:text-5xl md:text-6xl"
          >
            Quem transforma o quintal em experiência
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-base leading-relaxed text-brand-deep/70 md:text-lg"
          >
            Há mais de 15 anos projetando e fabricando spas de hidromassagem
            em Vila Prudente, São Paulo. Cada peça sai da WT Fibras com 3 anos
            de garantia — porque um produto feito para durar precisa provar
            isso todos os dias.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.15 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-3"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.7 }} className="text-center">
            <div className="font-display text-5xl italic text-brand md:text-6xl">
              <Counter to={15} suffix="+" />
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest2 text-brand-deep/60">
              Anos de mercado
            </p>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ duration: 0.7 }} className="text-center">
            <div className="font-display text-5xl italic text-brand md:text-6xl">
              <Counter to={3} suffix={" anos"} />
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest2 text-brand-deep/60">
              De garantia
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="col-span-2 text-center md:col-span-1"
          >
            <div className="font-display text-5xl italic text-brand md:text-6xl">
              <Counter to={5} />
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest2 text-brand-deep/60">
              Modelos de spa
            </p>
          </motion.div>
        </motion.div>

        {/* Spas enfileirados — vídeo + botão de WhatsApp por modelo */}
        <motion.div
          id="modelos"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.1 }}
          className="mx-auto mt-24 grid max-w-4xl scroll-mt-28 grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-6xl lg:grid-cols-3"
        >
          {products.map((product) => (
            <ProductVideoCard
              key={product.slug}
              product={product}
              variants={fadeUp}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
