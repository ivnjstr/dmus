import { About } from "@/components/about";
import { Capabilities } from "@/components/capabilities";
import { ContactModalProvider } from "@/components/contact-modal";
import { GetInTouch } from "@/components/get-in-touch";
import { Hero } from "@/components/hero";
import { Identity } from "@/components/identity";
import { Packages } from "@/components/packages";
import { Performance } from "@/components/performance";
import { RevealObserver } from "@/components/reveal-observer";
import { SampleWorks } from "@/components/sample-works/sample-works";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Splash } from "@/components/splash";

export default function Home() {
  return (
    <ContactModalProvider>
      {/* First in the page so it covers everything from the first paint. */}
      <Splash />
      <SiteHeader />
      <main>
        <Hero />
        <Capabilities />
        <SampleWorks />
        <Identity />
        <Performance />
        <Packages />
        <About />
        <GetInTouch />
      </main>
      <SiteFooter />
      <RevealObserver />
    </ContactModalProvider>
  );
}
