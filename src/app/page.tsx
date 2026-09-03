import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductsScroll } from "@/components/ProductsScroll";
import { Institutional } from "@/components/Institutional";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductsScroll />
        <Institutional />
      </main>
      <Footer />
    </>
  );
}
