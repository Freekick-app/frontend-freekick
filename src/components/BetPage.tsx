
import BetCard from './BetCard';

import { FaFootballBall } from "react-icons/fa";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";
import { FaBasketballBall } from "react-icons/fa";
import { SiLeagueoflegends } from "react-icons/si";

export default function BetPage() {
  return (
    <div className="bg-black min-h-screen text-white">
     
      <main className="px-4 py-8">
        <section className="mb-6">
          <div className="flex space-x-4 items-center justify-between">
            <div className="rounded-full bg-[#CEFF00] p-2">
              <span className="text-black text-2xl"><FaFootballBall /></span>
            </div>
            <div className="rounded-full bg-[#CEFF00] p-2">
              <span className="text-black text-2xl"><MdOutlineSportsVolleyball /></span>
            </div>
            <div className="rounded-full bg-[#CEFF00] p-2">
              <span className="text-black text-2xl"><IoIosFootball /></span>
            </div>
            <div className="rounded-full bg-[#CEFF00] p-2">
              <span className="text-black text-2xl"><FaBasketballBall /></span>
            </div>
            
          </div>
        </section>
        
        <section className="rounded-lg relative">
          <div className='flex items-center justify-between mb-4 px-2'>
            <h2 className="text-lg flex gap-2 items-center font-bold mt-2"><SiLeagueoflegends/> NFL</h2>
            <button className='bg-slate-800 p-2 rounded-full text-xs'>See All</button>
          </div>

          <div className="flex justify-between gap-1 relative z-0">
            <BetCard />
            <BetCard />
            <div className="absolute inset-x-0 top-0 flex justify-center mt-[170px] z-10">
              <div className="bg-[#CEFF00] text-black rounded-full border-black border-[10px] py-2 px-4 text-xl font-bold">
                2:5
              </div>
            </div>
          </div>

          <div className='bg-gray-900 p-2 rounded-3xl mt-4'>
            <div className="flex rounded-2xl justify-between text-center text-gray-300 mt-2 ">
              <button className="flex-1 mx-1 py-2 bg-black rounded-full">1x 3.56</button>
              <button className="flex-1 mx-1 py-2 bg-black rounded-full">1x 3.56</button>
              <button className="flex-1 mx-1 py-2 bg-black rounded-full">1x 3.56</button>
            </div>

            <button className="w-full bg-[#1F1DFF] mt-4 py-3 rounded-full text-white font-semibold">
              Place a bet
            </button>
          </div>
        </section>
      </main>
      
    </div>
  );
}
