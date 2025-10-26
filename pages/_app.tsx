import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ScrollProvider from "@/components/website/layout/ScrollProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ScrollProvider>
      <Component {...pageProps} />
    </ScrollProvider>
  );
}
