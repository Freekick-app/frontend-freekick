/* eslint-disable @typescript-eslint/no-unused-vars */
// import { BiMenuAltRight } from "react-icons/bi";
// import { RiWallet3Fill } from "react-icons/ri";
// import { FaWallet } from "react-icons/fa";
// import { CiWallet } from "react-icons/ci";
import { BiWalletAlt } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import LoginButton from "./LoginButton";
import toast, { Toaster } from "react-hot-toast";
// import ConnectWallet from "./LoginWithTonButton"
// import { TonConnectButton } from "@tonconnect/ui-react";

export default function Header() {
  
    return (
      <header className="flex flex-row items-center justify-between px-2 h-[60px] z-50 bg-black text-white">
        <div className="flex items-center space-x-4">
          <div className="rounded-full w-8 h-8 bg-gray-500"></div>
          <span className="text-[12px]">Hello, Username</span>
        </div>
        <div className="flex ">
          {/* <ConnectWallet /> */}
          <LoginButton/>
         
        {/* <button className="text-3xl"><IoMdNotificationsOutline/></button>
        <button className="text-white text-2xl px-3 py-2 bg-slate-800 rounded-full"><BiWalletAlt /></button> */}
        </div> 
      </header>
      
    );
  }
  
{/* <TonProvider>
  <Component {...pageProps} />
</TonProvider> */}