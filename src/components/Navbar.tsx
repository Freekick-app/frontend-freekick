import { FiHome } from "react-icons/fi";
// import { GrSchedule } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";

export default function Navbar() {
    return (
        <footer className="flex justify-between items-center w-[240px]  h-[70px] text-black bg-gray-900 p-4 text-2xl rounded-[4rem] fixed bottom-0 left-1/2 transform -translate-x-1/2">
        {/* Icons with centered alignment */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#CEFF00] ">
          <Link href="/index"><FiHome /></Link>
          
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#CEFF00]">
        <SlCalender/>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#CEFF00]">
        <IoIosNotificationsOutline/>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#CEFF00]">
        <IoSettingsOutline/>
        </div>
      </footer>
    );
  }
  