import { useState } from "react";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { TbRosetteNumber1 } from "react-icons/tb";
// import { FaTrophy } from "react-icons/fa6";
import MyContestCard from "@/components/my-contest-card";
import StatsDisplay from "@/components/StatsDisplay";
import Answers from "./answers";
import Leaderboard from "./leader-board";
export default function Contest() {

    const [activeTab, setActiveTab] = useState("My Contests");



    const renderContent = () => {
        switch (activeTab) {
            case "My Contests":
                return <div className="flex gap-3 flex-col">
                    <MyContestCard/>
                    <MyContestCard/>
                </div>;
            case "Answers":
                return <div className="flex gap-4 flex-col">
                    <Answers/>
                    <Answers/>
                </div>;
            case "Stats":
                return <div>
                    <StatsDisplay/>
                    </div>;
            case "LeaderBoard":
                return <div><Leaderboard></Leaderboard></div>;
            default:
                return null;
        }
    };

    return (
        <div className="px-4">

            <div className="flex justify-center items-center space-x-4 bg-gray-900 px-2 py-6 rounded-[60px]">
                <div className="flex items-center space-x-2">
                    <img src="./arizhona.png" alt="Arizona Cardinals Logo" className="h-8 w-10" />
                    <p className="text-white font-bold text-sm">Arizona Cardinals</p>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-gray-500 font-bold text-base">24</p>
                    <div className="bg-[#CEFF00] text-black font-bold px-2 text-lg py-1 rounded-full text-center">vs</div>
                    <p className="text-gray-500 font-bold text-sm">17</p>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-white font-bold text-sm">Carolina Panthers</p>
                    <img src="./panthers.png" alt="Carolina Panthers Logo" className="h-8 w-10" />
                </div>
            </div>
            <div className="flex justify-between mt-3">
                <button onClick={() => setActiveTab("My Contests")} className={`rounded-3xl text-sm p-[12px] ${activeTab === "My Contests" ? "bg-[#CEFF00] text-black" : "bg-gray-800 text-white"}`}>My Quizes</button>
                <button onClick={() => setActiveTab("Answers")} className={`rounded-3xl text-sm p-[12px] ${activeTab === "Answers" ? "bg-[#CEFF00] text-black" : "bg-gray-800 text-white"}`}>Answers</button>
                <button onClick={() => setActiveTab("Stats")} className={`rounded-3xl text-sm p-[12px] ${activeTab === "Stats" ? "bg-[#CEFF00] text-black" : "bg-gray-800 text-white"}`}>Stats</button>
                <button onClick={() => setActiveTab("LeaderBoard")} className={`rounded-3xl text-sm p-[12px] ${activeTab === "LeaderBoard" ? "bg-[#CEFF00] text-black" : "bg-gray-800 text-white"}`}>LeaderBoard</button>
            </div>
            <div className="mt-4">
                {renderContent()}
            </div>
        </div>
    );
}
