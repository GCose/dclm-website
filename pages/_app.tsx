import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/website/layout/Layout";
import ScrollProvider from "@/components/website/layout/ScrollProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ScrollProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ScrollProvider>
  );
}
