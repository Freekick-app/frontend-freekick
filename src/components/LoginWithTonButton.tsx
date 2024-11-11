import { useState } from 'react';
import { useTon } from '../services/TonProvider';
import { TonConnectButton } from '@tonconnect/ui-react';

export default function ConnectWallet() {
  const { isConnected, isLoading, signIn } = useTon();
  const [error, setError] = useState('');
  
  const handleSignIn = async () => {
    try {
      setError('');
      await signIn();
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <TonConnectButton />
      
      {isConnected && (
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className={`px-4 py-2 font-semibold text-white rounded-lg ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Signing in...' : 'Sign In with TON'}
        </button>
      )}
      
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
}