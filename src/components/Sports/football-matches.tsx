/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthService } from "@/services/auth";
import axiosInstance from "@/utils/axios";

interface Team {
  id: number;
  name: string;
  abbreviation: string;
  display_name: string;
  logo_url: string;
}

interface Match {
  id: number;
  home_team: Team;
  away_team: Team;
  date: string;
}

const FootballMatches = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    // const storedName = localStorage.getItem("username");
    // const storedPassword = localStorage.getItem("password");
    const token = AuthService.getAccessToken();

    // if (storedName) setName(storedName);
    // if (storedPassword) setPassword(storedPassword);
    
    if (token) {
      axiosInstance.get(`/sports/games`, {
          headers: {
            // Authorization: `Bearer ${token}`
          },
        })
        .then((response) => {
          console.log(response.data);
          const today = new Date();
          const oneWeekFromToday = new Date();
          oneWeekFromToday.setDate(today.getDate() + 7);

          // Filter matches occurring within the next week
          const filteredMatches = response.data.filter((match: Match) => {
            const matchDate = new Date(match.date);
            return matchDate >= today && matchDate <= oneWeekFromToday;
          });

          setData(filteredMatches);
        })
        .catch((error) => {
          setError("Failed to fetch data");
          console.error("Fetch error:", error);
        })
        .finally(() => setLoading(false));
    } else {
      setError("Missing credentials");
      setLoading(false);
    }
  }, []);

  const handlePlaceBet = (matchId: number) => {
    router.push(`/place-bet?matchId=${matchId}`);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data.map((match) => (
        <div key={match.id} className="my-4">
          <div className="flex justify-between gap-4 relative z-0">
            <div className="bg-[#333333] p-4 rounded-3xl flex flex-col items-center text-center w-1/2">
              <img
                src={match.home_team.logo_url}
                alt={match.home_team.name}
                className="rounded-full w-[130px] h-[130px]"
              />
              <h3 className="mt-2 font-semibold text-white">
                {match.home_team.display_name}
              </h3>
              <span className="text-[#CEFF00] mt-1">⭐ Score</span>
            </div>

            <div className="bg-[#333333] p-4 rounded-3xl flex flex-col items-center text-center w-1/2">
              <img
                src={match.away_team.logo_url}
                alt={match.away_team.name}
                className="rounded-full w-[130px] h-[130px]"
              />
              <h3 className="mt-2 font-semibold text-white">
                {match.away_team.display_name}
              </h3>
              <span className="text-[#CEFF00] mt-1">⭐ Score</span>
            </div>

            <div className="absolute inset-x-0 top-0 flex justify-center mt-[180px] z-10">
              <div className="bg-[#CEFF00] text-black rounded-full border-black border-[10px] py-2 px-4 text-xl font-bold">
                2:5
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button className="w-full bg-[#1F1DFF] py-6 rounded-full text-white text-lg font-semibold"
             onClick={() => handlePlaceBet(match.id)}>Place a Bet</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FootballMatches;
