import LoadingScreen from "@/components/website/LoadingScreen";
import HeroSection from "@/components/website/programs/HeroSection";
import { useState } from "react";

export default function Events() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <HeroSection />
    </>
  );
}
