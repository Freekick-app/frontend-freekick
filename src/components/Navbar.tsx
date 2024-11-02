import { FiHome } from "react-icons/fi";
// import { GrSchedule } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const handleMyMatches = () => {
    router.push('/MyMatches'); 
  };

  

    return (
        <footer className="flex justify-between items-center w-[320px]  h-[80px] text-black bg-gray-900 p-4 text-2xl rounded-[4rem] fixed bottom-[20px] left-1/2 transform -translate-x-1/2">
      
        <button  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#CEFF00] ">
          <Link href="/index"><FiHome /></Link>
          
        </button>
        <button onClick={handleMyMatches} className="w-12 h-12 flex items-center justify-center rounded-full bg-[#CEFF00]">
        <SlCalender/>
        </button>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#CEFF00]">
        <IoIosNotificationsOutline/>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#CEFF00]">
        <IoSettingsOutline/>
        </div>
      </footer>
    );
  }
  