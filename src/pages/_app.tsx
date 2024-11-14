/* eslint-disable @typescript-eslint/no-unused-vars */

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AuthService, AuthTokens } from "@/services/auth";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Toaster } from "react-hot-toast";
import Script from 'next/script'
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {
 const router = useRouter();
 const [isAuthenticated, setIsAuthenticated] = useState(false);

 const ignoreLayoutPaths = [""]
  console.log(router.pathname)


  useEffect(() => {
    
    // localStorage.setItem("username", "mayur");
    // localStorage.setItem("password","Mayur@0108");

    const initializeAuth = async () => {
      try {
        // Attempt to get access token from localStorage
        const accessToken = AuthService.getAccessToken();
        const refreshToken = AuthService.getRefreshToken();

        if (accessToken && refreshToken) {
          // Optionally verify the token here if you have a verification API
          setIsAuthenticated(true);
        } else {
          // If no tokens are found, you could redirect to login or request wallet authentication
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
        setIsAuthenticated(false);
      }
    };

    initializeAuth();




  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <TonConnectUIProvider manifestUrl='https://tan-occupational-rook-922.mypinata.cloud/ipfs/QmSVy6aYSip9A7bgSMvbijw7b1Ytw5gdyzaZgKGiis47bf'>
      <div className="max-w-[500px] w-full items-center bg-black min-h-screen">   
       {!ignoreLayoutPaths.includes(router.pathname) && <div className="sticky top-0 w-full z-10">
          <Header />
         
        </div>}

        
        <div className=" items-center justify-center pt-2 pb-20">
          <Component {...pageProps} />
          <Toaster position="bottom-center" />
        </div>

        {!ignoreLayoutPaths.includes(router.pathname) && <div className="fixed bottom-0 w-full z-10  bg-opacity-50">
          <Navbar />
        </div>}
      </div>
     </TonConnectUIProvider>
    </div>
  );
}
