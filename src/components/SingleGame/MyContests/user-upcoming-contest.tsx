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
        <div>Users Upcoming Contest
      
        </div>
    )
}