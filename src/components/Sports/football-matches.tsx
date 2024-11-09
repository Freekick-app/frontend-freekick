import { useState, useEffect } from "react";
import {axiosInstanceWithoutAuth} from "@/utils/axios";
import { useRouter } from "next/router";
import { AuthService } from "@/services/auth";

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
  const [data, setData] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    axiosInstanceWithoutAuth
        .get(`/sports/games`, {
          headers: {
            // Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
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
  }, []);

  const handlePlaceBet = (matchId: number) => {
    router.push(`/place-bet?matchId=${matchId}`);
  };

  const getLastWord = (str: string) => {
    const words = str.split(" ");
    return words[words.length - 1];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
    };
    return date.toLocaleDateString('en-GB', options); // Formats date as DD/MM
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use 12-hour format
    };
    return date.toLocaleTimeString('en-GB', options); // Formats time as hh:mm AM/PM
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data.map((match) => (
        <div key={match.id} className="bg-gray-800 w-full rounded-2xl h-[100px]   p-1 my-4 relative z-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={match.home_team.logo_url}
                alt={match.home_team.name}
                className="rounded-full max-w-[60px] h-[60px]"
              />
              <div className="text-white font-semibold text-sm ml-1 ">
                {getLastWord(match.home_team.display_name)}
              </div>
            </div>

            <div className="text-center absolute inset-x-0 text-gray-400 text-[10px] flex flex-col justify-center items-center">
              <div>{formatDate(match.date)}</div> 
              <div>{formatTime(match.date)}</div> 
            </div>

            <div className="flex items-center">
              <div className="text-white font-semibold text-sm mr-1 ">
                {getLastWord(match.away_team.display_name)}
              </div>
              <img
                src={match.away_team.logo_url}
                alt={match.away_team.name}
                className="rounded-full max-w-[60px] h-[60px]"
              />
            </div>
          </div>
          <div className="flex items-center justify-center z-10 absolute inset-x-0 top-[70px]">
          <button
            className="  bg-blue-600 py-2 rounded-full px-8  text-white text-sm font-semibold"
            onClick={() => handlePlaceBet(match.id)}
          >
            Play Now
          </button>
          </div>
         
        </div>
      ))}
    </div>
  );
};

export default FootballMatches;
