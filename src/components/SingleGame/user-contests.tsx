import { AuthService } from "@/services/auth";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Participant = {
    id: number;
    bet_amount: string;
    joined_at: string;
    rank: number | null;
    score: number;
    user: number;
    winning_amount: string;
};

type Pool = {
    id: number;
    name: string;
    bet_size: number;
    current_participants: number;
    max_participants: number;
    total_prize_pool: string;
    status: string;
    participants: Participant[];
    game: {
        description: string;
        start_time: string;
        end_time: string;
    };
};

export default function UserContests() {
    const router = useRouter();
    const { matchId } = router.query;
    const [myPools, setMyPools] = useState<Pool[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [authCredentials, setAuthCredentials] = useState<{ token: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    

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
        if (matchId && authCredentials) {
            fetchMyPools();
        }
    }, [matchId, authCredentials]);
    
    const fetchMyPools = async () => {
     
        if(!authCredentials){
            setError("Please login to See Youn Contest.");
            // toast.error("Please login to See Your Contest.");
            setLoading(false);
            return;
        }

        try {
            // console.log("Fetching pools for matchId:", matchId);
          
            setLoading(true);
            const response = await axiosInstance.get('/pools/my_pools/', {
                params: { game_id: matchId },
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            if (response.status !== 200) {
                setError('Error: Failed to fetch pools');
                return;
            }
            const data: Pool[] = await response.data;
            setMyPools(data);
            console.log(data);
            setError(null);
        } catch (error) {
            setError('An error occurred while fetching pools');
            console.error(error);
        
        }finally {
            setLoading(false); 
        }
    };

    const groupedPools = myPools.reduce((acc, pool) => {
        if (!acc[pool.bet_size]) {
            acc[pool.bet_size] = [];
        }
        acc[pool.bet_size].push(pool);
        return acc;
    }, {} as Record<number, Pool[]>);



    return (
        <div className="rounded-lg m-2">
        {loading ? (
            <div className="text-center text-white p-4">Loading...</div>
        ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
        ) : myPools.length === 0 ? (
            <div className="text-center text-white p-4 flex flex-col gap-4 items-center">
                <h1>You have not participated in any contests for this game.</h1>
                <button className="bg-[#CEFF00] text-black p-2 rounded-lg">Join Contest</button>
            </div>
        ) : (
            Object.keys(groupedPools).length > 0 ? (
                Object.entries(groupedPools).map(([betSize, pools]) => (
                    <div key={betSize} className="mb-4 bg-[#2365EA] rounded-lg">
                        <div className="flex text-center p-4 text-sm justify-between">
                            <div className="flex flex-col">
                                <h1>Prize Pool</h1>
                                <h1>3X | ${betSize}</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1>Spots</h1>
                                <h1>{pools[0].max_participants} Pools | {pools.reduce((acc, pool) => acc + pool.current_participants, 0)} Players</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1>Entry</h1>
                                <h1>${betSize}</h1>
                            </div>
                        </div>
                        {pools.map((pool) => (
                            <div key={pool.id} className="flex justify-between text-[12px] p-2 bg-slate-900 rounded-b-lg border-b-[1px]">
                                <h1>Pool {pool.id}</h1>
                                <h1>{pool.current_participants}/{pool.max_participants}</h1>
                                <h1>Won ${pool.participants[0]?.winning_amount ?? '0.00'}</h1>
                                <h1>Rank {pool.participants[0]?.rank ?? 'N/A'}</h1>
                                <h1>Status: {pool.status === "completed" ? "Quiz Completed" : "In Progress"}</h1>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <div className="text-center text-white p-4">No pools available. ||  <p>{error}</p></div>
               
            )
        )}
    </div>
    );
}
