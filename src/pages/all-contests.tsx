/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

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

const AllContests = () => {
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
        .get(`${backend_url}/sports/games`, {
          headers: {
            Authorization: `Basic ${btoa(`${storedName}:${storedPassword}`)}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setError("Failed to fetch data");
          console.log(error);
        })
        .finally(() => setLoading(false));
    } else {
      setError("Missing credentials");
      setLoading(false);
    }
  }, []);

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

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const isToday = (matchDate: Date) =>
    matchDate.toDateString() === today.toDateString();

  const isTomorrow = (matchDate: Date) =>
    matchDate.toDateString() === tomorrow.toDateString();

  const todayMatches = data.filter((match) => isToday(new Date(match.date)));
  const tomorrowMatches = data.filter((match) => isTomorrow(new Date(match.date)));
  const upcomingMatches = data.filter(
    (match) => new Date(match.date) > tomorrow
  );

  return (
    <div className="bg-black min-h-screen text-white px-4 space-y-6">
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading contests...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
          
            {todayMatches.length > 0 ? (
              todayMatches.map((match) => (
                <MatchCard key={match.id} match={match} formatDate={formatDate} />
              ))
            ) : (
              <p className="text-center text-gray-400">No matches today</p>
            )}

          
            {tomorrowMatches.length > 0 ? (
              tomorrowMatches.map((match) => (
                <MatchCard key={match.id} match={match} formatDate={formatDate} />
              ))
            ) : (
              <p className="text-center text-gray-400">No matches tomorrow</p>
            )}

            <h2 className="text-xl font-bold text-center">Upcoming Matches</h2>
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} formatDate={formatDate} />
              ))
            ) : (
              <p className="text-center text-gray-400">No upcoming matches</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};


const MatchCard = ({ match, formatDate }: { match: Match; formatDate: (date: string) => string }) => (
  <div className="bg-gray-800 py-4 px-4 space-y-2 items-center text-center rounded-[40px]">
    <div className="flex justify-center items-center gap-1">
      <img
        src={match.home_team.logo_url}
        alt={`${match.home_team.name} logo`}
        className="w-8 h-8"
      />
      <p className="text-white font-bold text-sm">
        {match.home_team.display_name}
      </p>
      <div className="bg-[#CEFF00] text-black font-bold px-2 py-1 rounded-full text-center">
        vs
      </div>
      <p className="text-white font-bold text-sm">
        {match.away_team.display_name}
      </p>
      <img
        src={match.away_team.logo_url}
        alt={`${match.away_team.name} logo`}
        className="w-8 h-8"
      />
    </div>
    <div className="flex justify-center">
      <div className="bg-blue-600 text-white text-xs w-[150px] py-2 rounded-xl text-center">
        {formatDate(match.date)}
      </div>
    </div>
  </div>
);

export default AllContests;
