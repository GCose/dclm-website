import { useState } from "react";
import LoadingScreen from "@/components/website/LoadingScreen";
import HomeSection from "@/components/website/events/HomeSection";

export default function Events() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <HomeSection />
    </>
  );
}
