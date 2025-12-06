import Head from "next/head";
import { useState } from "react";
import Footer from "@/components/website/layout/Footer";
import CTASection from "@/components/website/CTASection";
import LoadingScreen from "@/components/website/LoadingScreen";
import HeroSection from "@/components/website/about/HeroSection";

export default function About() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Head>
        <title>About Us | DCLM Brikama Region</title>
        <meta
          name="description"
          content="Learn about Deeper Christian Life Ministry Brikama Region - our history, pastors, branches, and biblical doctrines."
        />
      </Head>
      {loading && (
        <LoadingScreen
          onComplete={() => setLoading(false)}
          title="LEARN ABOUT WHO WE ARE"
        />
      )}
      <HeroSection />
      {/* <PastorsSection /> */}
      {/* <BibleDoctrinesSection /> */}
      <CTASection />
      <Footer />
    </>
  );
}
