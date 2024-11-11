/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance, { axiosInstanceWithoutAuth } from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Statistics() {
  const [activeTab, setActiveTab] = useState("HomeTeam");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameDetails, setGameDetails] = useState<any>();
  const [homeTeamId, setHomeTeamId] = useState<number | null>(null);
  const [awayTeamId, setAwayTeamId] = useState<number | null>(null);
  const [homeTeamName, setHomeTeamName] = useState<any | null>(null);
  const [awayTeamName, setAwayTeamName] = useState<any | null>(null);
  const router = useRouter();
  const { matchId } = router.query;

  useEffect(() => {
    if (matchId) {
      showGameDetails();
    }
  }, [matchId]);

  useEffect(() => {
    if (homeTeamId && awayTeamId) {
      FetchTeams(activeTab === "HomeTeam" ? homeTeamId : awayTeamId);
    }
  }, [activeTab, homeTeamId, awayTeamId]);

  const showGameDetails = async () => {
    try {
      const response = await axiosInstanceWithoutAuth.get(
        `/sports/games/${matchId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status !== 200) {
        const errorData = response.data;
        setError(`Error: ${errorData.message || "Failed to fetch game details"}`);
        return;
      }
      const data = response.data;
      setGameDetails(data);
      setError(null);
      setHomeTeamId(data?.home_team?.id);
      setAwayTeamId(data?.away_team?.id);
      setHomeTeamName(data?.home_team?.display_name);
      setAwayTeamName(data?.away_team?.display_name);
    } catch (error) {
      setError("An error occurred while fetching game details");
      console.error(error);
    }
  };

  const FetchTeams = async (teamId: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/sports/teams/${teamId}/roster`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.status !== 200) {
        setError("Error: Failed to fetch the stats");
        return;
      }
      const data = response.data;
      setPlayers(data);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching team rosters");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderOptions = () => (
    <div className="mt-1">
      <h2 className="font-bold">Rosters</h2>
      <div className="grid grid-cols-3 gap-2 p-2">
        {players.map((player) => (
          <div key={player.id} className="text-center bg-gray-600 rounded-lg">
            <img
              src={player.headshot_url}
              alt={player.full_name}
              className="h-18 mx-auto"
            />
            <p className="text-white mt-2">{player.full_name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center bg-gray-700 px-2 text-white justify-between py-[8px] text-sm rounded-sm">
        <div
          className={`text-gray-200 hover:text-white cursor-pointer ${
            activeTab === "HomeTeam" ? "text-white font-bold border-b-2 border-white" : ""
          }`}
          onClick={() => setActiveTab("HomeTeam")}
        >
          {homeTeamName || "Home Team"}
        </div>
        <div
          className={`text-gray-200 hover:text-white cursor-pointer ${
            activeTab === "AwayTeam" ? "text-white font-bold border-b-2 border-white" : ""
          }`}
          onClick={() => setActiveTab("AwayTeam")}
        >
          {awayTeamName || "Away Team"}
        </div>
      </div>
      {loading ? <p>Loading...</p> : renderOptions()}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
