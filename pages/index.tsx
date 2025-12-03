import { useState } from "react";
import Footer from "@/components/website/layout/Footer";
import LoadingScreen from "@/components/website/LoadingScreen";
import HeroSection from "@/components/website/home/HeroSection";
import LocationSection from "@/components/website/home/LocationSection";
import ServicesSection from "@/components/website/home/ServicesSection";
import ProgramsSection from "@/components/website/home/ProgramsSection";
import OverseerSection from "@/components/website/home/OverseerSection";
import CommunityHighlight from "@/components/website/home/CommuityHighlight";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <HeroSection />
      <LocationSection />
      <ServicesSection />
      <CommunityHighlight />
      <ProgramsSection />
      <OverseerSection />
      <Footer />
    </>
  );
}
