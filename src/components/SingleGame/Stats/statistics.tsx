/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";


export default function Statistics() {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderOptions = () => {
    switch (activeTab) {
      case "HomeTeam":
        return <div className="">
          hometeam
        </div>
      case "Overview":
        return <div>ovierview</div>
      case "AwayTeam":
        return <div>away team</div>
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="flex items-center bg-gray-700 px-2  text-white justify-between py-[12px] text-xs rounded-sm">
        <div
          className={`text-gray-200 hover:text-white cursor-pointer ${activeTab === "HomeTeam" ? "text-white font-bold border-b-2 border-white" : ""
            }`}
          onClick={() => setActiveTab("HomeTeam")}
        >
          Home Team
        </div>
        <div
          className={`text-gray-200 hover:text-white cursor-pointer ${activeTab === "Overview" ? "text-white font-bold border-b-2 border-white" : ""
            }`}
          onClick={() => setActiveTab("Overview")}
        >
          Overview
        </div>
        <div
          className={`text-gray-200 hover:text-white cursor-pointer ${activeTab === "AwayTeam" ? "text-white font-bold border-b-2 border-white" : ""
            }`}
          onClick={() => setActiveTab("AwayTeam")}
        >
          AwayTeam
        </div>
       
      </div>
      {renderOptions()}
    </div>

  )
}