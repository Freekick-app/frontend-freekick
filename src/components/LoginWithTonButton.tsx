/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
  useTonAddress,
} from "@tonconnect/ui-react";
import { FC } from "react";
import { axiosInstanceWithoutAuth } from "@/utils/axios";
import { AuthService } from "@/services/auth"; // Import AuthService
import { BiWalletAlt } from "react-icons/bi";
import { AiOutlineDisconnect } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAppState, User } from "@/utils/appState";
import { getTonPayload, tonLogin } from "@/api/blockchain";
import toast from "react-hot-toast";

const localStorageKey = "access_token";
const payloadTTLMS = 1000 * 60 * 20;

const ConnectWallet: FC = () => {
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();
  // const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const {
    user,
    setUser,
    refreshProfile,
    setTonWalletAddress,
    tonWalletAddress,
  } = useAppState();

  const shortAddress = (address: string) => {
    return `${address.slice(0, 3)}...${address.slice(-3)}`;
  };

  useEffect(() => {
    if (!isConnectionRestored) {
      return;
    }

    clearInterval(interval.current);

    if (!wallet) {
      localStorage.removeItem(localStorageKey);

      setTonWalletAddress("");

      const refreshPayload = async () => {
        tonConnectUI.setConnectRequestParameters({ state: "loading" });
        const value: any = await getTonPayload();
        const payload = { tonProof: value?.payload };
        // console.log("payload", payload);
        if (!value) {
          tonConnectUI.setConnectRequestParameters(null);
        } else {
          tonConnectUI.setConnectRequestParameters({
            state: "ready",
            value: payload,
          });
        }
      };

      refreshPayload();
      setInterval(refreshPayload, payloadTTLMS);
      return;
    }

    const token = localStorage.getItem(localStorageKey);

    if (token) {
      // Token is already saved, no need to do anything
      return;
    }

    if (
      wallet.connectItems?.tonProof &&
      !("error" in wallet.connectItems.tonProof)
    ) {
      // axiosInstanceWithoutAuth
      //   .post("/blockchain/auth/ton-login/", {
      //     proof: wallet.connectItems.tonProof.proof,
      //     wallet: wallet.account,
      //   })
      tonLogin(wallet?.connectItems?.tonProof?.proof, wallet?.account)
        .then(async (result: any) => {
          if (result) {
            // Save the tokens using AuthService
            // console.log("result: ", result);

            if (!result?.tokens) {
              tonConnectUI.disconnect();
              return;
            }
            AuthService.saveTokens(result?.tokens); // Save the tokens in localStorage
            // setWalletAddress(wallet.account.address);
            await refreshProfile();
            //   localStorage.setItem(localStorageKey, result.access); // Save the access token for future use
          } else {
            toast.error("Please try another wallet");
            tonConnectUI.disconnect();
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
          toast.error("Error connecting wallet");
        });
    } else {
      toast.error("Please try another wallet");
      tonConnectUI?.disconnect();
    }
  }, [wallet, isConnectionRestored, tonConnectUI, refreshProfile]);

  useEffect(() => {
    if (userFriendlyAddress) {
      setTonWalletAddress(userFriendlyAddress);
      return;
    }
    setTonWalletAddress("");
  }, [setTonWalletAddress, userFriendlyAddress]);

  const [isLoading, setIsLoading] = useState(false);

  async function handleConnect() {
    try {
      setIsLoading(true);
      await tonConnectUI.openModal();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDisconnect() {
    try {
      await tonConnectUI.disconnect();
      setUser({} as any);
      AuthService.clearTokens();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {user?.address && tonWalletAddress ? (
        <div className="flex items-center gap-1">
          <button className="text-[20px]">
            <IoMdNotificationsOutline />
          </button>
          <button className="text-white text-[10px] px-3 py-2 bg-slate-800 rounded-lg flex items-center">
            <BiWalletAlt className="text-base" />
            <span className="ml-1">
              {shortAddress(tonWalletAddress || user?.address)}
            </span>
          </button>
          <button
            onClick={handleDisconnect}
            disabled={isLoading}
            className={`p-2 font-semibold text-xs text-white rounded-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            <AiOutlineDisconnect />
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className={`p-2 font-semibold text-xs text-white rounded-lg ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0098EA] hover:scale-105"
          }`}
        >
          <div className="flex gap-1">
            <img src="./ton_symbol.png" alt="Ton logo" className="h-4" />
            <h1>Connect Wallet</h1>
          </div>
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
