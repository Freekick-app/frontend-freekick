import { FiHome } from "react-icons/fi";
// import { GrSchedule } from "react-icons/gr";
// import { IoIosNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import { useRouter } from "next/router";
// import { GoGift } from "react-icons/go";

export default function Navbar() {
  const router = useRouter();

  const handleMyMatches = () => {
    router.push("/my-contests");
  };

  return (
    <footer className="flex justify-between items-center w-[300px]  h-[40px] text-black bg-gray-900 px-4 py-8 text-2xl rounded-[4rem] fixed bottom-[10px] left-1/2 transform -translate-x-1/2">
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#CEFF00] ">
        <Link href="/">
          <FiHome />
        </Link>
      </button>
      <button
        onClick={handleMyMatches}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#CEFF00]"
      >
        <SlCalender />
      </button>
      <div className="w-10 h-10  flex items-center cursor-pointer justify-center rounded-full bg-[#CEFF00]">
        <Link href="/wallet">
          <IoWalletOutline />
        </Link>
      </div>
      {/* <div className="w-10 h-10  flex items-center cursor-pointer justify-center rounded-full bg-[#CEFF00]">
        <IoSettingsOutline />
      </div> */}
    </footer>
  );
}
