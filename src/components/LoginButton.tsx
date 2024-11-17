import { useState } from "react";
import { Web3AuthService } from "../services/web3Auth";
import { AuthService } from "../services/auth";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiWalletAlt } from "react-icons/bi";
import { AiOutlineDisconnect } from "react-icons/ai";
import { useAppState, User } from "@/utils/appState";

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { user, setUser, refreshProfile } = useAppState();

  // useEffect(() => {
  //   // Check if a token already exists in local storage
  //   const initializeWallet = async () => {
  //     const token = AuthService.getAccessToken(); // Adjust this based on your AuthService's method to get the token
  //     if (token) {
  //       try {
  //         const web3Auth = Web3AuthService.getInstance();
  //         const address = await web3Auth.getCurrentWalletAddress();
  //         if (address) setWalletAddress(address);
  //       } catch (error) {
  //         console.error("Failed to fetch wallet address:", error);
  //         // setError('Failed to fetch wallet address.');
  //       }
  //     }
  //   };

  //   initializeWallet();
  // }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    // setError(null);

    try {
      const web3Auth = Web3AuthService.getInstance();
      const walletAddress = await web3Auth.connectWallet();
      const message = await AuthService.requestMessage(walletAddress);
      const signature = await web3Auth.signMessage(message);
      const tokens = await AuthService.verifySignature(
        walletAddress,
        signature
      );
      if (!tokens) {
        throw new Error("Failed to verify signature");
      }
      AuthService.saveTokens(tokens);
      // setWalletAddress(walletAddress);
      // const data = await getProfile();
      // if (data?.length > 0) setUser(data[0]);
      await refreshProfile()
    } catch (error) {
      console.error("Login failed:", error);
      // setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const shortAddress = (address: string) => {
    return `${address.slice(0, 3)}...${address.slice(-3)}`;
  };

  async function handleDisconnect() {
    const web3Auth = Web3AuthService.getInstance();
    await web3Auth.disconnectWallet();
    setUser({} as User);
    AuthService.clearTokens();
  }
  return (
    <div className="flex items-center space-x-3">
      {user?.address ? (
        <>
          <button className="text-[20px]">
            <IoMdNotificationsOutline />
          </button>
          <button className="text-white text-[10px] px-3 py-2 bg-slate-800 rounded-full flex text-center items-center">
            <BiWalletAlt className="text-base" />
            <span className="ml-1">{shortAddress(user?.address)}</span>
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
        </>
      ) : (
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="px-2 py-1 text-xs bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
      {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
    </div>
  );
}
