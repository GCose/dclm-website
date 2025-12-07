import { useState } from "react";
import Footer from "@/components/website/layout/Footer";
import CTASection from "@/components/website/CTASection";
import LoadingScreen from "@/components/website/LoadingScreen";
import HeroSection from "@/components/website/about/HeroSection";
import BibleDoctrine from "@/components/website/about/BibleDoctrine";
import PastorsSection from "@/components/website/about/PastorsSection";
import Layout from "@/components/website/layout/Layout";

export default function About() {
  const [loading, setLoading] = useState(true);

  return (
    <Layout title="About Us" description="Learn about our beliefs and how we're connected to the global DCLM family.">
      {loading && (
        <LoadingScreen
          onComplete={() => setLoading(false)}
          title="LEARN ABOUT WHO WE ARE"
        />
      )}
      <HeroSection />
      <BibleDoctrine />
      <PastorsSection />
      <CTASection />
      <Footer />
    </Layout>
  );
}
