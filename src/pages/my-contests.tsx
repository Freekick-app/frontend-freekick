/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaMoneyBill } from "react-icons/fa";
import { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axios";
import { AuthService } from "@/services/auth";
import { getGames } from "@/api/sports";
import { useAppState } from "@/utils/appState";
import UnAuthorised from "@/components/UnAuthorised";

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

const MyContests = () => {
  // const [name, setName] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, setUser, isInitialized } = useAppState();

  const fetchApiData = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await getGames();
      // setData(response);
      // console.log(response);
      setData(response);
      setLoading(false);
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

  // Function to format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options).replace(",", " at");
  };

    if (!user?.address && isInitialized) {
      return <UnAuthorised />;
    }

  return (
    <div className="bg-black min-h-screen text-white p-2 ">
      <div className="space-y-4 pt-2">
        {loading ? (
          <div
            className="loader mx-auto border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin
            aspect-square w-8 flex justify-center items-center text-yellow-700"
          >
            $
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : data && data.length > 0 ? (
          data.map((match) => (
            <div
              key={match.id}
              className="bg-gray-800 py-4 px-4 flex flex-col gap-2 items-center text-center rounded-[40px]"
            >
              <div className="flex justify-between items-center gap-2">
                <img
                  src={match.home_team.logo_url}
                  alt={`${match.home_team.name} logo`}
                  className="max-w-8 h-8"
                />
                <p className="text-white font-bold text-sm flex-1 text-center">
                  {match.home_team.display_name}
                </p>

                <div className="bg-[#CEFF00] text-black font-bold p-2 h-10 w-10 rounded-full mx-2 text-center">
                  vs
                </div>

                <p className="text-white font-bold text-sm flex-1 text-center">
                  {match.away_team.display_name}
                </p>
                <img
                  src={match.away_team.logo_url}
                  alt={`${match.away_team.name} logo`}
                  className="max-w-8 h-8"
                />
              </div>

              <div className="flex justify-center">
                <div className="bg-blue-600 text-white text-xs w-[150px] py-2 rounded-xl text-center">
                  {formatDate(match.date)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No contests available</p>
        )}
      </div>
    </div>
  );
};

export default MyContests;
