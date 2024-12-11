/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllMyPools } from "@/api/pools";
import { AuthService } from "@/services/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function UserUpcomingContests(){

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [myPools, setMyPools] = useState<[]>([]);
    const [authCredentials, setAuthCredentials] =  useState<{
        token: string;
      } | null>(null);
    
    useEffect(() => {
        const token = AuthService.getAccessToken();
        // const username = localStorage.getItem("username");
        // const password = localStorage.getItem("password");
        if (token) {
          setAuthCredentials({ token });
        } else {
          setError("Please login to See Your Contest.");
          toast.error("Please login to See Your Contest.");
          setLoading(false);
        }
      }, []);

      useEffect(() => {
        if (authCredentials) {
          fetchAllPools();
        }
      }, [authCredentials]);


      const fetchAllPools = async () => {
        if (!authCredentials) {
          setError("Please login to See Youn Contest.");
          // toast.error("Please login to See Your Contest.");
          setLoading(false);
          return;
        }
    
        try {
          // console.log("Fetching pools for matchId:", matchId);
    
          setLoading(true);
    
          const data = await getAllMyPools();
          setMyPools(data);
          console.log(data);
          setError(null);
        } catch (error) {
          setError("An error occurred while fetching pools");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    

    return(
        <div>
              <div className="p-2">
            <div className=" flex flex-col p-1">
                <div className="bg-[#2663EB] flex justify-between rounded-t-lg px-2 h-6 items-center ">
                    <h4 className="text-sm" >Leauge Name</h4>
                    <h1 className="text-xs" >Time</h1>
                </div>
                <div style={{
                                backgroundImage: `url('/stadium6.jpeg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}>
                    <div className="px-1 w-full mx-auto text-center ">
                        <div className="sticky top-[60px] ">
                            <div className=" p-2 space-y-2 items-center text-center rounded-xl relative">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                        <img
                                            src="/nba2.png"
                                            alt="Home Team logo"
                                            className="h-12"
                                        />
                                        <div className="text-start">
                                            <p className="text-white font-semibold text-sm">
                                                name
                                            </p>
                                            <h1 className="text-[8px]">4-5, 2nd AFC South</h1>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <div className="text-center  text-[15px] font-semi-bold flex flex-col">
                                            <div className="bg-red-300 text-xs p-1 rounded-md font-bold text-red-600" >Timer</div>
                                            <div className="text-[6px] text-gray-400">Today, 4:00 PM</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 items-center">
                                        <div className="text-end">
                                            <p className="text-white font-semibold text-sm">
                                                name
                                            </p>
                                            <h1 className="text-[8px]">4-5, 2nd AFC South</h1>
                                        </div>
                                        <img
                                            src="/nba2.png"
                                            alt="Away Team logo"
                                            className="h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="  flex gap-2 rounded-b-lg px-2 py-1 text-sm">
                        <h1>Pools</h1>
                        <h1>Joined Contests</h1>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}