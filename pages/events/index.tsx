import LoadingScreen from "@/components/website/LoadingScreen";
import HomeSection from "@/components/website/events/HomeSection";
import { useState } from "react";

export default function Events() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <HomeSection />
    </>
  );
}
