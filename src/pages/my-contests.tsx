/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaMoneyBill } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedName) setName(storedName);
    if (storedPassword) setPassword(storedPassword);

    if (storedName && storedPassword) {
      axios
        .get("http://127.0.0.1:8000/api/sports/games", {
          headers: {
            Authorization: `Basic ${btoa(`${storedName}:${storedPassword}`)}`,
          },
        })
        .then((response) => {
          console.log("API response:", response.data);
          setData(response.data);
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

  return (
    <div className="bg-black min-h-screen text-white px-4 space-y-6">
      <div className="bg-[#1F1DFF] p-6 rounded-[40px] text-center">
        <p className="text-gray-300">Balance</p>
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <FaMoneyBill /> 4,450
        </h1>
        <p className="text-[#CEFF00] text-sm mt-1">+4.34%, 24 September 2024</p>

        <div className="mt-4 flex justify-between items-center space-x-2">
          <span className="text-white font-semibold">🔥 Win streak:</span>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#CEFF00] bg-[#1F1DFF] border-[6px] border-[#CEFF00]">
            4
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading contests...</p>
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
