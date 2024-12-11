/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

const CricketMatches = () => {
    const [loading, setLoading] = useState<boolean>(false); // Set loading to false for static data
    const [error, setError] = useState<string | null>(null);

    // Static data for cricket matches
    const staticData = [
        {
            id: 1,
            home_team: {
                logo_url: "./mumbai.png",
                name: "Home Team 1",
                display_name: "Mumbai Indians",
            },
            away_team: {
                logo_url: "./delhi.png",
                name: "Away Team 1",
                display_name: "Delhi Capitals",
            },
            date: "2024-12-10T15:30:00Z",
        },
        {
            id: 2,
            home_team: {
                logo_url: "./sunrisers.png",
                name: "Home Team 2",
                display_name: "Sunrisers Haidrabad",
            },
            away_team: {
                logo_url: "./knight.png",
                name: "Away Team 2",
                display_name: "Kolkata Knight Riders",
            },
            date: "2024-12-11T18:00:00Z",
        },
    ];

    const getFirstLetters = (text: string) => {
        return text
            .split(" ")
            .map((word) => word.charAt(0))
            .join("");
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handlePlaceBet = (matchId: number) => {
        console.log(`Placing bet for match ID: ${matchId}`);
    };

    return (
        <div className="px-4">
            {loading && <p>Loading....</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <p className="text-xs text-gray-400">Todays Matches</p>
                <div
                    className="relative flex justify-between items-center bg-gray-700 rounded-2xl p-4 h-[130px]"
                    style={{
                        backgroundImage: `url('/stadium4.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="flex items-center gap-4 font-bold">
                        <img src="./rcb.png" alt="Home Team" className="h-[70px]" />
                        <span>RCB</span>
                    </div>

                    {/* Centered "VS" */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* <span className="text-white font-bold text-2xl">VS</span> */}
                        <img src="./vs.png" alt="vs" className="h-14 w-16" />
                    </div>

                    <div className="flex items-center gap-4 font-bold">
                        <span>CSK</span>
                        <img src="./csk.png" alt="Away Team" className="h-[70px]" />
                    </div>
                </div>

                <p className="text-gray-500 text-xs">Upcoming Matches</p>
                <div className="flex flex-col gap-1 ">
                    {staticData.map((match) => (
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
                                        {getFirstLetters(match.home_team.display_name)}
                                    </div>
                                </div>

                                <div className="text-center absolute inset-x-0 text-gray-400 text-[8px] flex flex-col justify-center items-center">
                                    <div>{formatDate(match.date)}</div>
                                    <div>{formatTime(match.date)}</div>
                                </div>

                                <div className="flex items-center">
                                    <div className="text-white font-semibold text-[12px] mr-4 ">
                                        {getFirstLetters(match.away_team.display_name)}
                                    </div>
                                    <img
                                        src={match.away_team.logo_url}
                                        alt={match.away_team.name}
                                        className="rounded-full h-[60px]"
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
        </div>
    );
};

export default CricketMatches;
