/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getGames } from "@/api/sports";
import MatchesLoader from "../Loaders/MatchesLoader";
// import { AuthService } from "@/services/auth";
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
  const [selectedButton, setSelectedButton] = useState("contests");

  const router = useRouter();

  // fetch the api data
  const fetchApiData = async () => {
    try {
      setError("");
      const response = await getGames();
      // setData(response);
      // console.log(response);
      const today = new Date();
      const upcomingMatches = response?.filter((match: any) => {
        if (
          new Date(match?.date) > today &&
          match?.home_team?.display_name !== "TBD"
        ) {
          return match;
        }
      });
      setData(upcomingMatches);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData();
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
      day: "2-digit",
      month: "2-digit",
    };
    return date.toLocaleDateString("en-GB", options); // Formats date as DD/MM
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format
    };
    return date.toLocaleTimeString("en-GB", options); // Formats time as hh:mm AM/PM
  };

  return (
    <div>
      {loading && (
        <MatchesLoader/>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col gap-1 ">
        {data.map((match) => (
          <div
            key={match.id}
            className="bg-gray-700 w-full rounded-2xl h-[70px] p-1 my-4 relative z-0"
            style={{
              backgroundImage: `url('/stadium.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              
            
            }}
          >
            <div className="flex justify-between items-center ">
              <div className="flex items-center">
                <img
                  src={match.home_team.logo_url}
                  alt={match.home_team.name}
                  className="rounded-full  h-[60px]"
                />
                <div className="text-white font-semibold text-[12px] ml-4 ">
                  {getLastWord(match.home_team.display_name)}
                </div>
              </div>

              <div className="text-center absolute inset-x-0 text-gray-400 text-[8px] flex flex-col justify-center items-center">
                <div>{formatDate(match.date)}</div>
                <div>{formatTime(match.date)}</div>
              </div>

              <div className="flex items-center">
                <div className="text-white font-semibold text-[12px] mr-4 ">
                  {getLastWord(match.away_team.display_name)}
                </div>
                <img
                  src={match.away_team.logo_url}
                  alt={match.away_team.name}
                  className="rounded-full  h-[60px]"
                />
              </div>
            </div>
            <div className="flex items-center justify-center z-10 absolute inset-x-0 top-[50px]">
              <button
                className="  bg-blue-600 py-2 rounded-full px-8  text-white text-[10px] font-semibold"
                onClick={() => handlePlaceBet(match.id)}
              >
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FootballMatches;
