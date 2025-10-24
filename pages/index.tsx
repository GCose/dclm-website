import Head from "next/head";
import HeroSection from "@/components/website/home/HeroSection";
import Navigation from "@/components/website/layout/Navigation";

export default function Home() {
  return (
    <>
      <Head>
        <title>Deeper Christian Life Ministry | Brikama, The Gambia</title>
        <meta
          name="description"
          content="Where faith meets community in the heart of Brikama, The Gambia. Join us for worship, fellowship, and spiritual growth."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <HeroSection />
    </>
  );
}
