import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface TonContextType {
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signIn: () => Promise<void>;
}

const TonContext = createContext<TonContextType>({} as TonContextType);

const manifestUrl = 'https://your-domain.com/tonconnect-manifest.json';

export function TonProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const { wallet, connectWallet, disconnectWallet } = useTonConnectUI();
  const router = useRouter();
  
  async function connect() {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }
  
  async function disconnect() {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error('Disconnect error:', error);
      throw error;
    }
  }
  
  async function signIn() {
    if (!wallet?.account.address) {
      throw new Error('Wallet not connected');
    }
    
    setIsLoading(true);
    try {
      // Get payload for signing
      const payloadResponse = await fetch('/api/blockchain/auth/ton-payload/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet_address: wallet.account.address })
      });
      
      const { payload } = await payloadResponse.json();
      
      // Get signature using TON Connect
      const proof = await wallet.tonConnectUI.signMessage(payload);
      
      // Login with proof
      const loginResponse = await fetch('/api/blockchain/auth/ton-login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet_address: wallet.account.address,
          proof
        })
      });
      
      if (!loginResponse.ok) {
        throw new Error('Authentication failed');
      }
      
      const { tokens } = await loginResponse.json();
      
      // Store tokens in local storage
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
      
      // Redirect to dashboard or home
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  
  const value = {
    address: wallet?.account.address || null,
    isConnected: !!wallet?.account.address,
    isLoading,
    connect,
    disconnect,
    signIn
  };
  
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <TonContext.Provider value={value}>
        {children}
      </TonContext.Provider>
    </TonConnectUIProvider>
  );
}

export function useTon() {
  const context = useContext(TonContext);
  if (context === undefined) {
    throw new Error('useTon must be used within a TonProvider');
  }
  return context;
}

export default TonProvider;