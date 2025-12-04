import { useState } from "react";
import CTASection from "@/components/website/home/CTASection";
import LoadingScreen from "@/components/website/LoadingScreen";
import HeroSection from "@/components/website/programs/HeroSection";

export default function Events() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <HeroSection />
      <CTASection />
    </>
  );
}
