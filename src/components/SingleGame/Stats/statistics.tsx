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
      const response = await axiosInstance.get(`/sports/games/${matchId}/player_stats`, {
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
      <table className="min-w-full text-xs bg-white border border-gray-300 text-gray-800">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left py-3 px-4 font-semibold">Player</th>
            <th className="text-center py-3 px-4 font-semibold">ATT</th>
            <th className="text-center py-3 px-4 font-semibold">YDS</th>
            <th className="text-center py-3 px-4 font-semibold">AVG</th>
            <th className="text-center py-3 px-4 font-semibold">TD</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-4 text-blue-600 hover:underline cursor-pointer">Player Name #12</td>
            <td className="text-center py-3 px-4">15</td>
            <td className="text-center py-3 px-4">85</td>
            <td className="text-center py-3 px-4">5.6</td>
            <td className="text-center py-3 px-4">1</td>
          </tr>
        </tbody>
      </table>
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
