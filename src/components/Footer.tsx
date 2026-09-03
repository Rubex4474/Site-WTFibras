import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-brand-deep py-14 text-cream/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Image
            src="/images/logo.png"
            alt="WT Fibras"
            width={124}
            height={59}
            className="h-8 w-auto brightness-0 invert opacity-90"
          />
          <p className="text-sm">
            Av. Prof. Luiz Ignácio Anhaia Mello, 1773 — Vila Prudente, São
            Paulo/SP
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} WT Fibras. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
