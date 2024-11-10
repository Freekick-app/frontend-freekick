/* eslint-disable @typescript-eslint/no-explicit-any */


/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";


export default function Statistics() {
  const [activeTab, setActiveTab] = useState("HomeTeam");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<any[]>([]);


  const homeTeamId = 22; // Replace with actual HomeTeam ID
  const awayTeamId = 11; // Replace with actual AwayTeam ID


  useEffect(() => {

    FetchTeams(activeTab === "HomeTeam" ? homeTeamId : awayTeamId);

  }, [activeTab])


  const FetchTeams = async (teamId: number) => {
    try {
      // console.log("Fetching pools for matchId:", matchId);

      setLoading(true);
      const response = await axiosInstance.get(`/sports/teams/${teamId}/roster`, {
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
      console.log(data);
      setPlayers(data);
      setError(null);
    } catch (error) {
      setError('An error occurred while fetching pools');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };




  const renderOptions = () => {
    switch (activeTab) {
      case "HomeTeam":
        return <div className="mt-1">
          <h2 className="font-bold">Rosters</h2>
          <div className="grid grid-cols-3 gap-2 p-2 ">

            {players.map((player) => (
              <div key={player.id} className="text-center bg-gray-600 rounded-lg">

                <img
                  src={player.headshot_url}
                  alt={player.full_name}
                  className=" h-18 mx-auto "
                />
                <p className="text-white mt-2">{player.full_name}</p>
              </div>
            ))}
          </div>
        </div>
      case "AwayTeam":
        return <div className="mt-1">
        <h2 className="font-bold">Rosters</h2>
        <div className="grid grid-cols-3 gap-2 p-2 ">

          {players.map((player) => (
            <div key={player.id} className="text-center bg-gray-600 rounded-lg">

              <img
                src={player.headshot_url}
                alt={player.full_name}
                className=" h-18 mx-auto "
              />
              <p className="text-white mt-2">{player.full_name}</p>
            </div>
          ))}
        </div>
      </div>
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="flex items-center bg-gray-700 px-2  text-white justify-between py-[8px] text-sm rounded-sm">
        <div
          className={`text-gray-200 hover:text-white cursor-pointer ${activeTab === "HomeTeam" ? "text-white font-bold border-b-2 border-white" : ""
            }`}
          onClick={() => setActiveTab("HomeTeam")}
        >
          Home Team
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
