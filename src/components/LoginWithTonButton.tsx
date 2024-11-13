import { useState, useEffect, useRef } from 'react';
import {useIsConnectionRestored, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import { FC } from 'react';
import {axiosInstanceWithoutAuth} from "@/utils/axios";
import { AuthService } from '@/services/auth';

const localStorageKey = 'access_token';
const payloadTTLMS = 1000 * 60 * 20;

const ConnectWallet: FC = () => {

    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const interval = useRef<ReturnType<typeof setInterval> | undefined>();

    useEffect(() => {
        if (!isConnectionRestored) {
            return;
        }

        clearInterval(interval.current);

        if (!wallet) {
            localStorage.removeItem(localStorageKey);
            

            const refreshPayload = async () => {
                tonConnectUI.setConnectRequestParameters({ state: 'loading' });

                const value:any =await axiosInstanceWithoutAuth.get("/blockchain/auth/ton-payload/")
                const payload = {"tonProof":value?.data?.payload}
                console.log("payload", payload)
                if (!value) {
                    tonConnectUI.setConnectRequestParameters(null);
                } else {
                    tonConnectUI.setConnectRequestParameters({state: 'ready', value: payload});
                }
            }

            refreshPayload();
            setInterval(refreshPayload, payloadTTLMS);
            return;
        }

        const token = localStorage.getItem(localStorageKey);
        if (token) {
            // set token
            return;
        }

        console.log('wallet', wallet)

        if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
          axiosInstanceWithoutAuth.post("/blockchain/auth/ton-login/", {
            proof: wallet.connectItems.tonProof.proof, wallet: wallet.account
          }).then((result:any) => {
                if (result) {
                  // const token = AuthService.getAccessToken()

                    // setToken(result);
                    localStorage.setItem(localStorageKey, result);
                } else {
                    alert('Please try another wallet');
                    tonConnectUI.disconnect();
                }
            })
        } else {
            alert('Please try another wallet');
            tonConnectUI.disconnect();
        }

    }, [wallet, isConnectionRestored])

    console.log(wallet, "ahsdbhsdbghj", isConnectionRestored)
    const [isLoading, setIsLoading] = useState(false)

  async function handleConnect() {
    
    await tonConnectUI.connectWallet()
  }
  return (
    <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className={`px-4 py-2 font-semibold text-white rounded-lg ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Connect TON Wallet
        </button>
      
      
      {/* {isConnected && wallet && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-between w-full gap-4">
            <div className="text-sm text-gray-600">
              Connected: {wallet.account.address.slice(0, 6)}...{wallet.account.address.slice(-4)}
            </div>
            <button
              onClick={handleDisconnect}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Disconnect
            </button>
          </div>
          
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className={`w-full px-4 py-2 font-semibold text-white rounded-lg ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In with TON'}
          </button>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-sm mt-2 text-center">
          {error}
        </div>
      )} */}
    </div>
  );
};

export default ConnectWallet;