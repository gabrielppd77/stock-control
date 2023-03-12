import type { AppProps } from "next/app";
import "../styles/globals.css";

import { Header } from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl p-8 px-28">
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  );
}
