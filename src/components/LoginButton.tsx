import { useState } from 'react';
import { Web3AuthService } from '../services/web3Auth';
import { AuthService } from '../services/auth';
import { useEffect } from 'react';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(()=> {
    if(Web3AuthService){
      setTimeout(async ()=>{
      const web3Auth = Web3AuthService.getInstance();
    const address = await web3Auth.getCurrentWalletAddress();
    if (address) setWalletAddress(address)
    },10)
    }

  }, [])

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get Web3 service instance
      const web3Auth = Web3AuthService.getInstance();

      // Connect wallet and get address
      const walletAddress = await web3Auth.connectWallet();

      // Request message to sign
      const message = await AuthService.requestMessage(walletAddress);

      // Sign message
      const signature = await web3Auth.signMessage(message);

      // Verify signature and get tokens
      const tokens = await AuthService.verifySignature(walletAddress, signature);

      // Save tokens
      AuthService.saveTokens(tokens);

      // Redirect or update UI
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  function shortAddress(address:string) {
    const short = ` 0x${address.slice(2, 6)}...${address.slice(-4)}`
    return short
  }

  return (
    <div>
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="p-1 text-xs bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? 'Connecting...' : walletAddress? shortAddress(walletAddress): 'Connect Wallet'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}