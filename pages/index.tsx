import { useState } from "react";
import HeroSection from "@/components/website/home/HeroSection";
import LoadingScreen from "@/components/website/LoadingScreen";
import LocationSection from "@/components/website/home/LocationSection";
import ServicesSection from "@/components/website/home/ServicesSection";
import ProgramsSection from "@/components/website/home/ProgramsSection";
import CommunityHighlight from "@/components/website/home/CommuityHighlight";
import Footer from "@/components/website/layout/Footer";

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
      <Footer />
    </>
  );
}
