import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WT Fibras | Spas de Hidromassagem",
  description:
    "Spas de hidromassagem premium com mais de 15 anos de mercado e 3 anos de garantia. Barcelona, Redondo, Quadrado, Copacabana e Itaparica. Fale agora no WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-body antialiased bg-cream text-brand-deep">
        {children}
      </body>
    </html>
  );
}
