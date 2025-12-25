import { useState } from "react";
import Footer from "@/components/website/layout/Footer";
import Layout from "@/components/website/layout/Layout";
import CTASection from "@/components/website/CTASection";
import LoadingScreen from "@/components/website/LoadingScreen";
import HeroSection from "@/components/website/events/HeroSection";

export default function Events() {
  const [loading, setLoading] = useState(true);

  return (
    <Layout
      title="Events | View All Events"
      description="Surf through all services organkzed by the church."
    >
      {loading && (
        <LoadingScreen
          title="Explore all events we've had"
          onComplete={() => setLoading(false)}
        />
      )}
      <HeroSection />
      <CTASection />
      <Footer />
    </Layout>
  );
}
