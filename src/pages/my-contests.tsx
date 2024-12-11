/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaMoneyBill } from "react-icons/fa";
import { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axios";
import { AuthService } from "@/services/auth";
import { getGames } from "@/api/sports";
import { useAppState } from "@/utils/appState";
import UnAuthorised from "@/components/UnAuthorised";
import UserUpcomingContests from "@/components/SingleGame/MyContests/user-upcoming-contest";
import UserLivecontests from "@/components/SingleGame/MyContests/user-live-contest";
import UserCompletedContests from "@/components/SingleGame/MyContests/user-complted-contest";

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
  const [activeTab, setActiveTab] = useState("upcoming");

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

  const renderOptions = () => {
    switch (activeTab) {
      case "upcoming":
        return <UserUpcomingContests />
      case "live":
        return <UserLivecontests />
      case "completed":
        return <UserCompletedContests />
    }
  }




  if (!user?.address && isInitialized) {
    return <UnAuthorised />
  }

  return (
    <div className="w-full">
      <div className="px-1">
        <div className="flex justify-between bg-gray-600 text-white font-semibold rounded-xl items-center">

          <div className="flex w-full justify-between items-center">

            <div
              className={`${activeTab === "upcoming"
                ? "text-white bg-[#2663EB] px-4  py-1 rounded-xl cursor-pointer"
                : " px-4 py-1 cursor-pointer rounded-xl"
                }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </div>

            <div
              className={`${activeTab === "live"
                ? "text-white bg-[#2663EB] px-16 py-1 rounded-xl cursor-pointer"
                : "bg-gray-600 px-4 py-1 cursor-pointer"
                }`}
              onClick={() => setActiveTab("live")}
            >
              Live
            </div>


            <div
              className={`${activeTab === "completed"
                ? "text-white bg-[#2663EB] px-4 py-1 rounded-xl cursor-pointer"
                : "bg-gray-600 px-4 py-1 cursor-pointer rounded-xl"
                }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </div>
          </div>
        </div>
      </div>

      {renderOptions()}
    </div>
  );
};

export default MyContests;
