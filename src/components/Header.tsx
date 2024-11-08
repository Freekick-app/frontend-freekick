/* eslint-disable @typescript-eslint/no-unused-vars */
// import { BiMenuAltRight } from "react-icons/bi";
// import { RiWallet3Fill } from "react-icons/ri";
// import { FaWallet } from "react-icons/fa";
// import { CiWallet } from "react-icons/ci";
import { BiWalletAlt } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import LoginButton from "./LoginButton";
export default function Header() {
    return (
      <header className="flex items-center justify-between px-4 h-[80px] bg-black text-white">
        <div className="flex items-center space-x-4">
          <div className="rounded-full w-14 h-14 bg-gray-500"></div>
          <span className="text-lg">Hello, Username</span>
        </div>
        <div className="flex gap-2">
          <LoginButton/>
        <button className="text-3xl"><IoMdNotificationsOutline/></button>
        <button className="text-white text-2xl px-3 py-2 bg-slate-800 rounded-full"><BiWalletAlt /></button>
        </div>
      </header>
    );
  }
  