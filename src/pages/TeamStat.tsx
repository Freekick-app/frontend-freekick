
import { SiPremierleague } from "react-icons/si";
import { BsStarFill } from "react-icons/bs";


export default function TeamStat() {
    return (
        <div className=" items-center text-center px-4">
            <div className="flex py-2 gap-1 ">
            <div className="text-[60px]"><SiPremierleague/></div>
                <div className="flex flex-col ">
                <h1 className="text-3xl font-bold">NFL Best Teams</h1>
                <h2 className="text-gray-500"><span className="text-[#CEFF00]">Statistics on</span>,24 September 2024</h2>
            </div>
              
            </div>
            <div className="bg-gray-800 rounded-[40px] h-[320px] p-4 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Team Statistics</h2>
          <button className="text-sm text-white bg-gray-900 p-2 rounded-2xl">See all</button>
        </div>
       
      </div>
      <div className=" rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Friends betting</h2>
          <button className="text-sm text-white p-2 rounded-2xl bg-gray-800">See all</button>
        </div>
        <div className="flex space-x-4">
          
          {["/avatar1.png", "/avatar2.png", "/avatar3.png", "/avatar4.png"].map((src, index) => (
            <div key={index} className="relative">
              <img src={src} alt={`Friend ${index + 1}`} className="w-[70px] h-[70px] rounded-full border-2 border-gray-700" />
              <span className="absolute bottom-[1px] right-[1px] p-[2px] rounded-full text-black bg-[#CEFF00]  text-2xl "><BsStarFill/></span>
            </div>
          ))}
        </div>
        </div>
        </div>
    )
}