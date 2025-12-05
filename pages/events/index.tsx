import { useState } from "react";
import CTASection from "@/components/website/CTASection";
import LoadingScreen from "@/components/website/LoadingScreen";
import HeroSection from "@/components/website/events/HeroSection";
import Footer from "@/components/website/layout/Footer";

export default function Events() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <LoadingScreen
          title="Explore all events we've had"
          onComplete={() => setLoading(false)}
        />
      )}
      <HeroSection />
      <CTASection />
      <Footer />
    </>
  );
}
