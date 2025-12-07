import Head from "next/head";
import Navigation from "./Navigation";
import { LayoutProps } from "@/types";

const Layout = ({ children, title, description }: LayoutProps) => {
  const siteTitle = title
    ? `DCLM Brikama Region | ${title}`
    : "DCLM Brikama Region | The Gambia";
  const siteDescription =
    description ||
    "Where faith meets community in the heart of Brikama, The Gambia. Join us for worship, fellowship, and spiritual growth.";

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navigation />
      <main>{children}</main>
    </>
  );
};

export default Layout;
