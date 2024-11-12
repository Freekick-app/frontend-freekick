import { useState, useEffect } from 'react';
import {useIsConnectionRestored, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import { FC } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ConnectWallet: FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);

  // Get connected status and address
  const isConnected = tonConnectUI?.connected;
  const wallet = tonConnectUI?.wallet;

  // Initialize connection state
//   useEffect(() => {
//     const checkConnection = async () => {
//       try {
//         if (tonConnectUI?.wallet) {
//           await tonConnectUI.disconnect();
//         }
//         setIsInitializing(false);
//       } catch (err) {
//         console.error('Error during initialization:', err);
//         setIsInitializing(false);
//       }
//     };
    
//     checkConnection();
//   }, [tonConnectUI]);

//   const handleConnect = async () => {
//     try {
//       setError('');
//       setIsLoading(true);

//       // Ensure we're disconnected first
//       if (isConnected) {
//         await tonConnectUI.disconnect();
//       }

//       // Wait a bit before attempting to connect
//       await new Promise(resolve => setTimeout(resolve, 500));

//       // Now try to connect
//       await tonConnectUI.connectWallet();
//     } catch (err) {
//       console.error('Connection error:', err);
//       // Only show error if it's not the "already connected" error
//       if (err instanceof Error && !err.message.includes('WalletAlreadyConnectedError')) {
//         setError(err.message || 'Failed to connect wallet');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDisconnect = async () => {
//     try {
//       setError('');
//       await tonConnectUI.disconnect();
//     } catch (err) {
//       console.error('Disconnect error:', err);
//       setError(err instanceof Error ? err.message : 'Failed to disconnect wallet');
//     }
//   };

//   const handleSignIn = async () => {
//     if (!wallet) {
//       setError('Please connect your wallet first');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Get payload for signing
//       const payloadResponse = await fetch(`${API_URL}/blockchain/auth/ton-payload/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           wallet_address: wallet.account.address, 
//         })
//       });
      
//       if (!payloadResponse.ok) {
//         throw new Error('Failed to get payload');
//       }
      
//       const { payload } = await payloadResponse.json();
      
//       if (payload) {
//         // Set ready state with tonProof
//         tonConnectUI.setConnectRequestParameters({
//           state: "ready",
//           value: { tonProof: payload },
//         });

//         // Create a promise to wait for the proof
//         const proofPromise = new Promise<string>((resolve, reject) => {
//           const unsubscribe = tonConnectUI.onStatusChange((w) => {
//             if (w && w.connectItems?.tonProof && "proof" in w.connectItems.tonProof) {
//               unsubscribe();
//               resolve(JSON.stringify(w.connectItems.tonProof.proof));
//             }
//           });

//           // Add timeout
//           setTimeout(() => {
//             unsubscribe();
//             reject(new Error('Proof request timeout'));
//           }, 30000);
//         });

//         // Wait for the proof
//         const proof = await proofPromise;
      
//         // Login with proof
//         const loginResponse = await fetch(`${API_URL}/blockchain/auth/ton-login/`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             wallet_address: wallet.account.address[0],
//             proof
//           })
//         });
        
//         if (!loginResponse.ok) {
//           throw new Error('Authentication failed');
//         }
        
//         const { tokens } = await loginResponse.json();
        
//         // Store tokens
//         localStorage.setItem('access_token', tokens.access);
//         localStorage.setItem('refresh_token', tokens.refresh);
        
//         // Redirect or update state
//         window.location.href = '/dashboard';
//       } else {
//         throw new Error('Invalid payload received');
//       }
//     } catch (err) {
//       console.error('Sign in error:', err);
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('Failed to sign in');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (tonConnectUI?.connected) {
//         tonConnectUI.disconnect();
//       }
//     };
//   }, [tonConnectUI]);


  

  if (isInitializing) {
    return <div>Initializing...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {!isConnected && (
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className={`px-4 py-2 font-semibold text-white rounded-lg ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Connecting...' : 'Connect TON Wallet'}
        </button>
      )}
      
      {isConnected && wallet && (
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
      )}
    </div>
  );
};

export default ConnectWallet;