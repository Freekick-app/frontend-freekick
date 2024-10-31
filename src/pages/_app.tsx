import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <div className="max-w-[500px] w-full">
       <div className="bg-black min-h-screen text-white">
      {/* Fixed header */}
      <div className="fixed top-0 w-full z-10">
        <Header />
      </div>
      
      {/* Main content with padding to avoid overlap with fixed header */}
      <div className="pt-16">
        <Component {...pageProps} />
      </div>

      {/* Fixed navbar */}
      <div className="fixed bottom-0 w-full z-10">
        <Navbar />
      </div>
    </div>
  </div>
;
}
