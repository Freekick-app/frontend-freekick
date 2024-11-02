import { TbRosetteNumber1 } from "react-icons/tb";
import { FaTrophy } from "react-icons/fa6";

export default function MyContestCard(){
    return(
        <div className=" bg-gray-900 p-4 rounded-2xl">
                    <div className="flex justify-between text-gray-500">
                        <h1>Prize Pool</h1>
                        <h1>Spots</h1>
                        <h1>Entry</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1>1 crore</h1>
                        <h1>3,0000</h1>
                        <h1>100</h1>
                    </div>
                    <hr/>
                    <div className=" flex text-center items-center text-sm gap-16 py-1 text-gray-500 rounded-lg">
                        
                        <h1 className="flex items-center gap-1" ><TbRosetteNumber1 className="text-xl"/>$1 Million</h1>
                        <h2 className="flex  items-center gap-1"> <FaTrophy/> 80%</h2>
                    </div>
                    <div className="flex justify-between bg-slate-500 p-4 rounded-xl text-black">
                        <h1>Quiz</h1>
                        <h1>#2300</h1>
                    </div>
                </div>
    )
}