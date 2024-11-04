
import { useState } from "react";
import FootballMatches from "./Sports/football-matches";


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

  const renderMatches = () => {
    switch (selectedSport) {
      case "Football":
        return <FootballMatches />;
      case "Volleyball":
        return <div>volleyball</div>;
      case "Soccer":
        return <div>soccer</div>;
      case "Basketball":
        return <div>basketball</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="px-4  ">
        <section className="mb-2">
          <div className="flex space-x-4 items-center justify-between">
            {sports.map((sport, index) => (
              <div
                key={index}
                onClick={() => setSelectedSport(sport.name)}
                className="flex items-center cursor-pointer bg-gray-800 rounded-3xl"
              >
                <div
                  className={`p-2 rounded-full ${selectedSport === sport.name ? "bg-[#CEFF00]" : "bg-gray-800"}`}
                >
                  <span
                    className={`text-[32px] items-center justify-between flex ${selectedSport === sport.name ? "text-black" : "text-gray-400"}`}
                  >
                    {sport.icon}
                  </span>
                </div>
                {selectedSport === sport.name && (
                  <div className="px-4 py-1 rounded-full">
                    <span className="text-white font-semibold">{sport.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg relative space-y-2 mt-4">
          <div className='flex items-center justify-between px-4'>
            <h2 className="text-xl font-bold">{selectedSport} Matches</h2>
            <button className='bg-slate-800 p-2 px-4 rounded-full text-base'>See All</button>
          </div>
          {renderMatches()}
        </section>
     
      </main>
    </div>
  );
}
