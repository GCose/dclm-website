import { useState } from "react";
import HeroSection from "@/components/website/home/HeroSection";
import LoadingScreen from "@/components/website/home/LoadingScreen";
import LocationSection from "@/components/website/home/LocationSection";
import ServicesSection from "@/components/website/home/ServicesSection";
import ProgramsSection from "@/components/website/home/ProgramsSection";
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
    </>
  );
}
