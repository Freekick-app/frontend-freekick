import { BiMenuAltRight } from "react-icons/bi";


export default function Header() {
    return (
      <header className="flex items-center justify-between p-4 bg-black text-white">
        <div className="flex items-center space-x-4">
          <div className="rounded-full w-10 h-10 bg-gray-500"></div>
          <span>Hello, Username</span>
        </div>
        <button className="text-white text-2xl p-2 bg-slate-900 rounded-full"><BiMenuAltRight /></button>
      </header>
    );
  }
  