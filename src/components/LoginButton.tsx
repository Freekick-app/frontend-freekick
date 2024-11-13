

import { useState, useEffect } from 'react';
import { Web3AuthService } from '../services/web3Auth';
import { AuthService } from '../services/auth';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiWalletAlt } from 'react-icons/bi';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if a token already exists in local storage
    const initializeWallet = async () => {
      const token = AuthService.getAccessToken(); // Adjust this based on your AuthService's method to get the token
      if (token) {
        try {
          const web3Auth = Web3AuthService.getInstance();
          const address = await web3Auth.getCurrentWalletAddress();
          if (address) setWalletAddress(address);
        } catch (error) {
          console.error('Failed to fetch wallet address:', error);
          setError('Failed to fetch wallet address.');
        }
      }
    };

    initializeWallet();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const web3Auth = Web3AuthService.getInstance();
      const walletAddress = await web3Auth.connectWallet();
      const message = await AuthService.requestMessage(walletAddress);
      const signature = await web3Auth.signMessage(message);
      const tokens = await AuthService.verifySignature(walletAddress, signature);

      AuthService.saveTokens(tokens);
      setWalletAddress(walletAddress);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  function shortAddress(address: string) {
    return `${address.slice(-4)}`;
  }

  return (
    <div className="flex items-center space-x-3">
      {walletAddress ? (
        <>
          <button className="text-[20px]">
            <IoMdNotificationsOutline />
          </button>
          <button className="text-white text-[10px] px-3 py-2 bg-slate-800 rounded-full flex text-center items-center">
            <BiWalletAlt className="text-base" />
            <span className="ml-1">{shortAddress(walletAddress)}</span>
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="p-1 text-xs bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
