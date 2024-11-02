import { useState } from "react";
import BetCard from './BetCard';

import { FaFootballBall } from "react-icons/fa";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";
import { FaBasketballBall } from "react-icons/fa";

export default function BetPage() {
  const [selectedSport, setSelectedSport] = useState("Football");

  const sports = [
    { name: "Football", icon: <FaFootballBall /> },
    { name: "Volleyball", icon: <MdOutlineSportsVolleyball /> },
    { name: "Soccer", icon: <IoIosFootball /> },
    { name: "Basketball", icon: <FaBasketballBall /> },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="px-4 py-4 ">
        <section className="mb-2">
          <div className="flex space-x-4 items-center justify-between">
            {sports.map((sport, index) => (
              <div
                key={index}
                onClick={() => setSelectedSport(sport.name)}
                className="flex items-center cursor-pointer bg-gray-800 rounded-3xl"
              >
                <div
                  className={`p-2  rounded-full ${
                    selectedSport === sport.name ? "bg-[#CEFF00]" : "bg-gray-800"
                  }`}
                >
                  <span
                    className={`text-[32px] items-center justify-between flex ${
                      selectedSport === sport.name ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {sport.icon}
                  </span>
                </div>
                {selectedSport === sport.name && (
                  <div className="ml-2  px-2 py-1 rounded-full">
                    <span className="text-white font-semibold">{sport.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        <section className="rounded-lg relative ">
          <div className='flex items-center justify-between px-4'>
            <h2 className="text-3xl font-bold mt-4">NFL</h2>
            <button className='bg-slate-800 p-2 px-4 rounded-full text-base'>See All</button>
          </div>

          <div className="flex justify-between gap-1 relative z-0">
            <BetCard />
            <BetCard />
            <div className="absolute inset-x-0 top-0 flex justify-center mt-[140px] z-10">
              <div className="bg-[#CEFF00] text-black rounded-full border-black border-[10px] py-2 px-4 text-xl font-bold">
                2:5
              </div>
            </div>
          </div>

          <div className='bg-gray-900 rounded-3xl mt-4 '>
            {/* <div className="flex rounded-2xl justify-between text-center text-gray-300 mt-2 ">
              <button className="flex-1 mx-1 py-2 bg-black rounded-full">1x 3.56</button>
              <button className="flex-1 mx-1 py-2 bg-black rounded-full">1x 3.56</button>
              <button className="flex-1 mx-1 py-2 bg-black rounded-full">1x 3.56</button>
            </div> */}

            <button className="w-full bg-[#1F1DFF] py-6 rounded-full text-white text-lg font-semibold">
              Place a bet
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
