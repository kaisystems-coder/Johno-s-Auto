import { Suspense } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import Services from "@/components/Services";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

/*
  Each section sits in its own Suspense boundary. Nothing here suspends; the
  boundaries let React hydrate section by section (selective hydration), so
  hydration runs as several short tasks instead of one long one that blocks
  input on phones.
*/
const sections = [Hero, ProofStrip, Services, About, Showcase, Testimonials, FinalCta];

export default function Home() {
  return (
    <>
      <Suspense>
        <Nav />
      </Suspense>
      <main id="main">
        {sections.map((S, i) => (
          <Suspense key={i}>
            <S />
          </Suspense>
        ))}
      </main>
      <Suspense>
        <Footer />
      </Suspense>
      <Suspense>
        <WhatsAppFloat />
      </Suspense>
    </>
  );
}
