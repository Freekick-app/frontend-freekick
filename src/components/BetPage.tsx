/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import FootballMatches from "./Sports/football-matches";


import { FaFootballBall } from "react-icons/fa";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";
import { FaBasketballBall } from "react-icons/fa";
import { Router, useRouter } from "next/router";
import VollyballMatches from "./Sports/vollyball-matches";
import SocerMatches from "./Sports/socer-matches";
import BasketballMatches from "./Sports/basketball-matches";
import CricketMatches from "./Sports/cricket-matches";
import { GiSoccerBall } from "react-icons/gi";
import { FaBasketball, FaFootball, FaVolleyball } from "react-icons/fa6";
import { MdSportsCricket } from "react-icons/md";
import { BiCricketBall } from "react-icons/bi";
import { BiSolidCricketBall } from "react-icons/bi";


export default function BetPage() {
  const [selectedSport, setSelectedSport] = useState("Football");


  const router = useRouter();

  const sports = [
    {
      name: "Football",
      icon: <FaFootball />,
      color: "text-[#815337]", 
      logo: "./nflLogo2.png",
      league: "NFL",
    },
    {
      name: "Cricket",
      icon: <BiSolidCricketBall />,
      color: "text-black",
      logo: "./ipl.png",
      league: "IPL",
    },
    {
      name: "Volleyball",
      icon: <FaVolleyball />,
      color: "text-[#dc5d49]", 
      logo: "./fivb2.png",
      league: "FIVB",
    },
    {
      name: "Soccer",
      icon: <GiSoccerBall />,
      color: "text-black", 
      logo: "./fifa.png",
      league: "FIFA",
    },
    {
      name: "Basketball",
      icon: <FaBasketball />,
      color: "text-[#ee6730]",
      logo: "./nba2.png",
      league: "NBA",
    },
  ];

  const renderMatches = () => {
    switch (selectedSport) {
      case "Football":
        return <FootballMatches />;
      case "Volleyball":
        return <div><VollyballMatches/></div>;
      case "Soccer":
        return <div><SocerMatches/></div>;
      case "Basketball":
        return <div><BasketballMatches/></div>;
      case "Cricket":
        return <div><CricketMatches/></div>;
      default:
        return null;
    }
  };

  const handleSeeAll = () => {
    switch (selectedSport) {
      case "Football":
        router.push("/all-contests");
        break;
      case "Cricket":
        router.push("/cricket-all-contests");
        break;
      case "Volleyball":
        router.push("/volleyball-all-contests");
        break;
      case "Soccer":
        router.push("/soccer-all-contests");
        break;
      case "Basketball":
        router.push("/basketball-all-contests");
        break;
      default:
        router.push("/all-contests"); // Fallback if sport is unrecognized
    }
  };

  
  const selectedSportInfo = sports.find(sport => sport.name === selectedSport) ;

  return (
    <div className="bg-black min-h-screen text-white ">
      <main className="px-2">
        <section className="mb-1 sticky top-[59px] bg-black z-10">
          <div className="flex items-center justify-between ">
            {sports.map((sport, index) => (
              <div
                key={index}
                onClick={() => setSelectedSport(sport.name)}
                className="flex items-center cursor-pointer bg-gray-800 rounded-3xl "
              >
                <div
                  className={`p-2 rounded-full ${selectedSport === sport.name ? "bg-[#CEFF00]" : "bg-gray-800"}`}
                >
                  <span
                    className={`text-[18px] items-center justify-between  flex ${selectedSport === sport.name ? sport.color : "text-gray-400"}`}
                  >
                    {sport.icon}
                  </span>
                </div>
                {selectedSport === sport.name && (
                  <div className="px-3 py-1 rounded-full">
                    <span className="text-white font-normal text-xs">{sport.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <hr className="text-gray-800 m-4"/>
        </section>

        <section className="rounded-lg relative space-y-2 ">
          <div className='flex items-center justify-between px-4'>
            {/* <h2 className="text-[12px] font-bold">{selectedSport} Matches</h2> */}
           <div className="flex gap-2 items-center">
              <img src={selectedSportInfo?.logo } alt={`${selectedSportInfo?.league} logo`} className="text-white max-w-10 max-h-10 " />
              <h2 className="font-bold">{selectedSportInfo?.league}</h2>
            </div>
          
            <button className='bg-slate-800 p-2 px-4 rounded-full text-[10px]' onClick={handleSeeAll}>See All</button>
          </div>
          {renderMatches()}
        </section>

      </main>
    </div>

   
  );
}
