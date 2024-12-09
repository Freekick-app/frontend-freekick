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
  const [activeTab, setActivetab] = useState("upcoming");

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
        return <UserUpcomingContests/>
      case "live":
        return <UserLivecontests/>
      case "completed":
        return <UserCompletedContests/>
    }
  }




  if (!user?.address && isInitialized) {
    return <UnAuthorised />
  }

  return (
    <div className="">
      <div className="flex justify-between px-2 pt-1  bg-gray-600 text-white font-semibold ">
        <div className={`${activeTab === "upcoming" ? "  border-b-2 text-[#CEFF00] border-[#CEFF00]": ""} `} onClick={()=> setActivetab("upcoming")}>Upcoming</div>
        <div className={`${activeTab === "live" ? "  border-b-2 text-[#CEFF00] border-[#CEFF00]": ""} `} onClick={()=> setActivetab("live")}>Live</div>
        <div className={`${activeTab === "completed" ? " border-b-2 text-[#CEFF00] border-[#CEFF00]": ""} `} onClick={()=> setActivetab("completed")} >Completed</div>
      </div>
      {renderOptions()}
    </div>
  );
};

export default MyContests;
