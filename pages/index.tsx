import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Footer from "@/components/website/layout/Footer";
import CTASection from "@/components/website/CTASection";
import LoadingScreen from "@/components/website/LoadingScreen";
import HeroSection from "@/components/website/home/HeroSection";
import LocationSection from "@/components/website/home/LocationSection";
import ServicesSection from "@/components/website/home/ServicesSection";
import ProgramsSection from "@/components/website/home/ProgramsSection";
import OverseerSection from "@/components/website/home/OverseerSection";
import CommunityHighlight from "@/components/website/home/CommuityHighlight";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {loading && (
        <LoadingScreen
          title="WELCOME YOUR SPIRITUAL HOME"
          onComplete={() => setLoading(false)}
        />
      )}
      <HeroSection />
      <LocationSection />
      <ServicesSection />
      <CommunityHighlight />
      <ProgramsSection />
      <OverseerSection />
      <CTASection />
      <Footer />
    </>
  );
}
