/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { FC } from 'react';
import { axiosInstanceWithoutAuth } from "@/utils/axios";
import { AuthService } from "@/services/auth"; // Import AuthService
import { BiWalletAlt } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';

const localStorageKey = 'access_token';
const payloadTTLMS = 1000 * 60 * 20;

const ConnectWallet: FC = () => {
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const shortAddress = (address: string) => `${address.slice(-4)}`;



  useEffect(() => {
    if (!isConnectionRestored) {
      return;
    }

    clearInterval(interval.current);

    if (!wallet) {
      localStorage.removeItem(localStorageKey);
      
      setWalletAddress(null);

      const refreshPayload = async () => {
        tonConnectUI.setConnectRequestParameters({ state: 'loading' });
        const value: any = await axiosInstanceWithoutAuth.get("/blockchain/auth/ton-payload/");
        const payload = { "tonProof": value?.data?.payload };
        console.log("payload", payload);
        if (!value) {
          tonConnectUI.setConnectRequestParameters(null);
        } else {
          tonConnectUI.setConnectRequestParameters({ state: 'ready', value: payload });
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

    console.log('wallet', wallet);

    if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
      axiosInstanceWithoutAuth.post("/blockchain/auth/ton-login/", {
        proof: wallet.connectItems.tonProof.proof,
        wallet: wallet.account,
      }).then((result: any) => {
        if (result) {
          // Save the tokens using AuthService
          console.log("result ithe ahe",result)
          debugger
          
          AuthService.saveTokens(result.data.tokens); // Save the tokens in localStorage
          setWalletAddress(wallet.account.address);
        //   localStorage.setItem(localStorageKey, result.access); // Save the access token for future use
        } else {
          alert('Please try another wallet');
          tonConnectUI.disconnect();
        }
      }).catch((error) => {
        console.error('Error during login:', error);
        alert('Error connecting wallet');
      });
    } else {
      alert('Please try another wallet');
      tonConnectUI.disconnect();
    }
  }, [wallet, isConnectionRestored]);

  const [isLoading, setIsLoading] = useState(false);

  async function handleConnect() {
    await tonConnectUI.connectWallet();
  }

  return (
    <div className="flex flex-col items-center gap-4">
    {walletAddress ? (
      <div className="flex items-center gap-4">
        <button className="text-[20px]">
          <IoMdNotificationsOutline />
        </button>
        <button className="text-white text-[10px] px-3 py-2 bg-slate-800 rounded-full flex items-center">
          <BiWalletAlt className="text-base" />
          <span className="ml-1">{shortAddress(walletAddress)}</span>
        </button>
      </div>
    ) : (
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className={`p-2 font-semibold text-xs text-white rounded-lg ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Connect TON Wallet
      </button>
    )}
  </div>
  );
};

export default ConnectWallet;
