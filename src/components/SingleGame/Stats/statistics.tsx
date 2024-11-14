/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

export default function Statistics() {
  const router = useRouter();
  const {matchId} = router.query;
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [gameStats, setgameStats] = useState<any[]>([]);
  const [gameScore, setGameScore] = useState<any[]>([]);
  const [homeTeamName, setHomeTeamName] = useState<any | null>(null);
  const [awayTeamName, setAwayTeamName] = useState<any | null>(null);

  // const matchId = 76;

  useEffect(() => {
    if (matchId) {
      FetchStats();
      FetchGameStats();
      FetchTeamScore();
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

  const FetchGameStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/sports/games/${matchId}/stats/`, {
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
      setgameStats(data);
      setError(null);
    } catch (error) {
      setError("Error loading Stats");
    } finally {
      setLoading(false);
    }
  };

  const FetchTeamScore = async() => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/sports/games/${matchId}/`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.status !== 200) {
        setError('Error: Failed to fetch the scores');
        return;
      }
      const data = await response.data;
      setHomeTeamName(data?.home_team?.display_name);
      setAwayTeamName(data?.away_team?.display_name);
      setGameScore(data);
      setError(null);
    } catch (error) {
      setError("Error loading Stats");
    } finally {
      setLoading(false);
    }
  };

  const getLastWord = (str: string) => {
    const words = str.split(" ");
    return words[words.length - 1];
  };


  const renderOverviewTable = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!gameStats || gameStats.length === 0) {
      return <p className="text-center text-white">Match is yet to start</p>;
    }

    const teamData = gameStats || []; // Make sure gameStats has the data

    return (
      <div className="flex flex-col space-y-4 p-1 font-semibold mt-2">
        {teamData.length > 0 && (
          <table className="w-full text-center text-sm border-collapse border border-gray-300 rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gray-600 ">
                <th className="border p-2 ">Stats</th>
                <th className="border p-2 ">
                  <img src={teamData[0].team.logo_url} alt={`${teamData[0].team.display_name} logo`} className="w-10 h-10 mx-auto" />
                </th>
                <th className="border p-2">
                  <img src={teamData[1].team.logo_url} alt={`${teamData[1].team.display_name} logo`} className="w-10 h-10 mx-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-500">
                <td className="border p-2 text-start ">1st Downs</td>
                <td className="border p-2">{teamData[0].first_downs}</td>
                <td className="border p-2">{teamData[1].first_downs}</td>
              </tr>
              <tr className="bg-gray-200 text-black ">
                <td className="border p-2 text-start">Total Yards</td>
                <td className="border p-2">{teamData[0].total_yards}</td>
                <td className="border p-2">{teamData[1].total_yards}</td>
              </tr>
              <tr className="bg-gray-500 ">
                <td className="border p-2 text-start">Passing Yards</td>
                <td className="border p-2">{teamData[0].passing_yards}</td>
                <td className="border p-2">{teamData[1].passing_yards}</td>
              </tr>
              <tr className="bg-gray-200 text-black ">
                <td className="border p-2 text-start">Rushing Yards</td>
                <td className="border p-2">{teamData[0].rushing_yards}</td>
                <td className="border p-2">{teamData[1].rushing_yards}</td>
              </tr>
              <tr className="bg-gray-500 ">
                <td className="border p-2 text-start">Penalties</td>
                <td className="border p-2">
                  {teamData[0].penalties} - {teamData[0].penalty_yards} 
                </td>
                <td className="border p-2">
                  {teamData[1].penalties} - {teamData[1].penalty_yards} 
                </td>
              </tr>
              <tr className="bg-gray-200 text-black ">
                <td className="border p-2 text-start">Turnovers</td>
                <td className="border p-2">{teamData[0].turnovers}</td>
                <td className="border p-2">{teamData[0].turnovers}</td>
              </tr>
              <tr className="bg-gray-500 ">
                <td className="border p-2 text-start">3rd Down Efficiency</td>
                <td className="border p-2">{teamData[0].third_down_conversions}</td>
                <td className="border p-2">{teamData[1].third_down_conversions}</td>
              </tr>
              <tr className="bg-gray-200 text-black ">
                <td className="border p-2 text-start">4th Down Efficiency</td>
                <td className="border p-2">{teamData[0].fourth_down_conversions}</td>
                <td className="border p-2">{teamData[1].fourth_down_conversions}</td>
              </tr>
              <tr className="bg-gray-500 ">
                <td className="border p-2 text-start">Red Zone </td>
                <td className="border p-2">{teamData[0].red_zone_conversions}</td>
                <td className="border p-2">{teamData[1].red_zone_conversions}</td>
              </tr>
              <tr className="bg-gray-200 text-black">
                <td className="border p-2 text-start">Time of Possession</td>
                <td className="border p-2">{teamData[0].time_of_possession}</td>
                <td className="border p-2">{teamData[1].time_of_possession}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  };


  const renderOptions = () => {
    switch (activeTab) {
      case "HomeTeam":
        return (
          <div>

          </div>
        );
      case "Overview":
        return <div>{renderOverviewTable()}</div>;
      case "AwayTeam":
        return (
          <div>
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
          { homeTeamName||"Home Team"}
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
         { awayTeamName ||" Away Team"}
        </div>
      </div>
      {renderOptions()}
    </div>
  );
}
