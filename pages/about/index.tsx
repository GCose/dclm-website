import Head from "next/head";
import { useState } from "react";
import Footer from "@/components/website/layout/Footer";
import CTASection from "@/components/website/CTASection";
import LoadingScreen from "@/components/website/LoadingScreen";
import HeroSection from "@/components/website/about/HeroSection";
import BibleDoctrine from "@/components/website/about/BibleDoctrine";

export default function About() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Head>
        <title>DCLM Brikama Region | About Us</title>
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
      <BibleDoctrine />
      {/* <PastorsSection /> */}
      <CTASection />
      <Footer />
    </>
  );
}
