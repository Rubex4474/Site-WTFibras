"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 4v15m0 0-6-6m6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(4,38,59,0.08)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="WT Fibras"
            width={124}
            height={59}
            priority
            className={cn(
              "h-9 w-auto transition-[filter] duration-500",
              solid ? "" : "brightness-0 invert",
            )}
          />
        </div>
        <a
          href="#modelos"
          className={cn(
            "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]",
            solid
              ? "bg-brand text-cream"
              : "bg-cream/15 text-cream backdrop-blur-sm",
          )}
        >
          Escolher meu spa
          <ArrowDownIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
      </div>
    </motion.header>
  );
}
