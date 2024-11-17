/* eslint-disable @typescript-eslint/no-unused-vars */

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AuthService, AuthTokens } from "@/services/auth";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Toaster } from "react-hot-toast";
import AppStateContext, {
  useAppState,
  IAppContextProps,
  User,
  TgUser,
} from "@/utils/appState";
import { getProfile } from "@/api/blockchain";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [tgUserName, setTgUserName] = useState<string>("");
  const [tonWalletAddress, setTonWalletAddress] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [tgUser, setTgUser] = useState<TgUser>({} as TgUser);

  const ignoreLayoutPaths = [""];

  const initializeAuth = async () => {
    try {
      const data = await getProfile();
      if (data?.length > 0) setUser(data[0]);
    } catch (error) {
      console.error("Error initializing authentication:", error);
      setIsAuthenticated(false);
    } finally {
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    if (tonWalletAddress) {
      setUser((prevUser) => ({ ...prevUser, address: tonWalletAddress }));
    }
  }, [tonWalletAddress]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        tg.ready();
        const user = tg.initDataUnsafe?.user;
        if (user) {
          setTgUser(user);
          const displayName = user.username
            ? user.username
            : `${user.first_name} ${user.last_name || ""}`;
          setTgUserName(displayName);
        }
      } else {
      }
    }
  }, []);

  const value: IAppContextProps = {
    user,
    setUser,
    setTgUserName,
    tgUserName,
    refreshProfile: initializeAuth,
    setTonWalletAddress,
    tonWalletAddress,
    isInitialized,
    setIsInitialized,
    tgUser,
    setTgUser,
  };

  useEffect(() => {
    // localStorage.setItem("username", "mayur");
    // localStorage.setItem("password","Mayur@0108");

    initializeAuth();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <TonConnectUIProvider manifestUrl="https://tan-occupational-rook-922.mypinata.cloud/ipfs/QmSVy6aYSip9A7bgSMvbijw7b1Ytw5gdyzaZgKGiis47bf">
        <AppStateContext.Provider value={value}>
          <div className="max-w-[500px] w-full items-center bg-black min-h-screen">
            {!ignoreLayoutPaths.includes(router.pathname) && (
              <div className="sticky top-0 w-full z-10">
                <Header />
              </div>
            )}

            <div className=" items-center justify-center pt-2 pb-20">
              <Component {...pageProps} />
              <Toaster position="bottom-center" />
            </div>

            {!ignoreLayoutPaths.includes(router.pathname) && (
              <div className="fixed bottom-0 w-full z-10  bg-opacity-50">
                <Navbar />
              </div>
            )}
          </div>
        </AppStateContext.Provider>
      </TonConnectUIProvider>
    </div>
  );
}
