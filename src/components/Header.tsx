// import { BiMenuAltRight } from "react-icons/bi";
// import { RiWallet3Fill } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";


export default function Header() {
    return (
      <header className="flex items-center justify-between p-4 h-[80px] bg-black text-white">
        <div className="flex items-center space-x-4">
          <div className="rounded-full w-14 h-14 bg-gray-500"></div>
          <span className="text-lg">Hello, Username</span>
        </div>
        <button className="text-gray-400 text-2xl p-2 bg-slate-900 rounded-full"><FaWallet /></button>
      </header>
    );
  }
  