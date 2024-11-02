import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
 const router = useRouter();
 const ignoreLayoutPaths = [""]
  console.log(router.pathname)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-[500px] w-full items-center bg-black min-h-screen">
        
       {!ignoreLayoutPaths.includes(router.pathname) && <div className="fixed top-[10px] w-full z-10">
          <Header />
        </div>}
        
        <div className=" items-center justify-center pt-24">
          <Component {...pageProps} />
        </div>

        {!ignoreLayoutPaths.includes(router.pathname) && <div className="fixed bottom-0 w-full z-10">
          <Navbar />
        </div>}
      </div>
    </div>
  );
}
