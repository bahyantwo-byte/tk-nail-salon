import { SiteNav } from "@/components/site-nav";
import { PosterHero } from "@/components/poster-hero";
import { TrustStrip } from "@/components/trust-strip";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Gallery } from "@/components/gallery";
import { Location } from "@/components/location";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 pb-20 md:pb-0">
        <PosterHero />
        <TrustStrip />
        <About />
        <Services />
        <Gallery />
        <Location />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
