/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

interface ContestOptionsProps {
    handlePlaceBet: () => Promise<void>; // Function that returns a Promise (async function)
    betSize: number; // Assuming betSize is a number
  }


  const ContestOptions: React.FC<ContestOptionsProps> = ({ handlePlaceBet, betSize }) => { 
 
    return (
        <div>
            <div><div className="bg-[#2365EA] p-2 rounded-lg m-2">
                {/* <h1 className="text-2xl font-bold">Place Your Bet for Match {matchId}</h1> */}
                <div className="flex justify-between  p-2 items-center text-center ">
                    <div className="flex items-start ">
                        <h1>3X </h1>
                        <h1 className="">| $1000 Prize Pool</h1>
                    </div>

                    <button className=" rounded-lg w-[78px] text-[16px] text-black p-2 text-center text-base items-center bg-[#CEFF00] " onClick={handlePlaceBet} >${betSize}</button>

                </div>

                <hr className="text-gray-300" />
                <div className="flex items-center text-center justify-between text-gray-400 tet-base">
                    <div className="p-1 flex text-sm gap-1 items-center text-center"><img src="./first.png" alt="first" className="w-[16px] h-[16px]" /> <h1>$300</h1> <img src="./trophy.png" alt="first" className="w-[16px] h-[16px]" /> <h1>70%</h1> </div>
                    <div>
                        <h3 className="text-xs">10 Pools | 100 Players</h3>
                    </div>
                </div>
            </div></div>
        </div>
    )
}

export default ContestOptions;