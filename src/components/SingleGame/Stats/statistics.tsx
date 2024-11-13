/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

export default function Statistics() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any[]>([]);

  const matchId = 42;

  useEffect(() => {
    if (matchId) {
      FetchStats();
    }
  }, [matchId])

  const FetchStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/sports/games/${matchId}/player_stats/`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.status !== 200) {
        setError('Error: Failed to fetch the stats');
        return;
      }
      const data = await response.data;
      setStats(data);
      setError(null);
    } catch (error) {
      setError('An error occurred while fetching stats');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderPassingTable = () => (
    <div className="overflow-x-auto p-2">
      <h1>Passing</h1>
      <table className="min-w-full text-xs bg-white border border-gray-300 text-gray-800">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left py-3 px-4 font-semibold">Player</th>
            <th className="text-center py-3 px-4 font-semibold">C/ATT</th>
            <th className="text-center py-3 px-4 font-semibold">YDS</th>
            <th className="text-center py-3 px-4 font-semibold">TD</th>
            <th className="text-center py-3 px-4 font-semibold">INT</th>
            <th className="text-center py-3 px-4 font-semibold">SACKS</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-4 text-blue-600 hover:underline cursor-pointer">Joe Burrow #9</td>
            <td className="text-center py-3 px-4">34/56</td>
            <td className="text-center py-3 px-4">428</td>
            <td className="text-center py-3 px-4">4</td>
            <td className="text-center py-3 px-4">0</td>
            <td className="text-center py-3 px-4">3-7</td>
          </tr>
          <tr className="border-b font-semibold">
            <td className="py-3 px-4">TEAM</td>
            <td className="text-center py-3 px-4">34/56</td>
            <td className="text-center py-3 px-4">421</td>
            <td className="text-center py-3 px-4">4</td>
            <td className="text-center py-3 px-4">0</td>
            <td className="text-center py-3 px-4">3-7</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderRushingTable = () => (
    <div className="overflow-x-auto p-2">
      <h1>Rushing</h1>
      <div className="flex">

  <table className="border-collapse text-right">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <a href="https://www.espn.in/nfl/player/_/id/3043078/derrick-henry" className="text-blue-600 truncate">Derrick Henry</a>
            <span className="text-gray-500">#22</span>
          </div>
        </td>
      </tr>
      <tr>
        <td className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <a href="https://www.espn.in/nfl/player/_/id/3916387/lamar-jackson" className="text-blue-600 truncate">Lamar Jackson</a>
            <span className="text-gray-500">#8</span>
          </div>
        </td>
      </tr>
      <tr>
        <td className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <a href="https://www.espn.in/nfl/player/_/id/4038441/justice-hill" className="text-blue-600 truncate">Justice Hill</a>
            <span className="text-gray-500">#43</span>
          </div>
        </td>
      </tr>
      <tr>
        <td className="p-4 border-b text-center font-semibold">Team</td>
      </tr>
    </tbody>
  </table>

  <div className="overflow-auto">
    <table className="border-collapse text-right w-full">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2">CAR</th>
          <th className="px-4 py-2">YDS</th>
          <th className="px-4 py-2">AVG</th>
          <th className="px-4 py-2">TD</th>
          <th className="px-4 py-2">LONG</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 border-b">16</td>
          <td className="px-4 py-2 border-b">68</td>
          <td className="px-4 py-2 border-b">4.3</td>
          <td className="px-4 py-2 border-b">1</td>
          <td className="px-4 py-2 border-b">11</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">7</td>
          <td className="px-4 py-2 border-b">33</td>
          <td className="px-4 py-2 border-b">4.7</td>
          <td className="px-4 py-2 border-b">0</td>
          <td className="px-4 py-2 border-b">10</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">2</td>
          <td className="px-4 py-2 border-b">-2</td>
          <td className="px-4 py-2 border-b">-1.0</td>
          <td className="px-4 py-2 border-b">0</td>
          <td className="px-4 py-2 border-b">0</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-semibold">25</td>
          <td className="px-4 py-2 font-semibold">99</td>
          <td className="px-4 py-2 font-semibold">4.0</td>
          <td className="px-4 py-2 font-semibold">1</td>
          <td className="px-4 py-2 font-semibold">11</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    </div>
  );

  const renderReceivingTable = () => (
    <div className="overflow-x-auto p-2">
      <h1>Receiving</h1>
      <table className="min-w-full text-xs bg-white border border-gray-300 text-gray-800">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left py-3 px-4 font-semibold">Player</th>
            <th className="text-center py-3 px-4 font-semibold">REC</th>
            <th className="text-center py-3 px-4 font-semibold">YDS</th>
            <th className="text-center py-3 px-4 font-semibold">AVG</th>
            <th className="text-center py-3 px-4 font-semibold">TD</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-4 text-blue-600 hover:underline cursor-pointer">Player Name #87</td>
            <td className="text-center py-3 px-4">10</td>
            <td className="text-center py-3 px-4">120</td>
            <td className="text-center py-3 px-4">12.0</td>
            <td className="text-center py-3 px-4">2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderOptions = () => {
    switch (activeTab) {
      case "HomeTeam":
        return (
          <div>
            {renderPassingTable()}
            {renderRushingTable()}
            {renderReceivingTable()}
            {/* Add more tables as needed */}
          </div>
        );
      case "Overview":
        return <div>Overview content goes here</div>;
      case "AwayTeam":
        return (
          <div>
            {renderPassingTable()}
            {renderRushingTable()}
            {renderReceivingTable()}
            {/* Duplicate tables for the Away team */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center bg-gray-700 px-2 text-white justify-between py-[12px] text-xs rounded-sm">
        <div
          className={`text-gray-200 hover:text-white cursor-pointer ${activeTab === "HomeTeam" ? "text-white font-bold border-b-2 border-white" : ""}`}
          onClick={() => setActiveTab("HomeTeam")}
        >
          Home Team
        </div>
        <div
          className={`text-gray-200 hover:text-white cursor-pointer ${activeTab === "Overview" ? "text-white font-bold border-b-2 border-white" : ""}`}
          onClick={() => setActiveTab("Overview")}
        >
          Overview
        </div>
        <div
          className={`text-gray-200 hover:text-white cursor-pointer ${activeTab === "AwayTeam" ? "text-white font-bold border-b-2 border-white" : ""}`}
          onClick={() => setActiveTab("AwayTeam")}
        >
          Away Team
        </div>
      </div>
      {renderOptions()}
    </div>
  );
}
