"use client";

import { WHATSAPP_URL } from "@/lib/products";
import { cn } from "@/lib/utils";

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

export function WhatsAppButton({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#0F3D2E] font-body font-semibold text-cream transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]",
        size === "sm" && "px-5 py-2.5 text-sm",
        size === "md" && "px-7 py-3.5 text-base",
        size === "lg" && "px-9 py-5 text-lg",
        className,
      )}
    >
      <span className="absolute inset-0 -translate-x-full bg-[#17583F] transition-transform duration-500 group-hover:translate-x-0" />
      <WhatsAppIcon className="relative h-5 w-5 shrink-0" />
      <span className="relative">{children}</span>
    </a>
  );
}
