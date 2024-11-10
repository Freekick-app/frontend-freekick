/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Questions from "@/components/Questions/questions";
import axiosInstance, { axiosInstanceWithoutAuth } from "@/utils/axios";
import { AuthService } from "@/services/auth";
import { TbCircleNumber1Filled } from "react-icons/tb";
import ContestOptions from "@/components/SingleGame/contest-options";
import UserContests from "@/components/SingleGame/user-contests";
import Statistics from "@/components/SingleGame/statistics";



const PlaceBet = () => {
  const router = useRouter();
  const { matchId } = router.query;
  const [poolId, setPoolId] = useState<string | undefined>();
  const [betSize] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const [authCredentials, setAuthCredentials] = useState<{ token: string } | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: { id: string; text: string } }>({});
  const [selectedOptions2, setSelectedOptions2] = useState<{ [key: number]: { id: string; text: string }[] }>({});
  const [betState, setBetState] = useState("initial");
  const [gameDetails, setGameDetails] = useState<any>();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("contests");
  const [myPools, setMyPools] = useState<any>();

  const betSizes = [100, 50, 20, 10, 5, 1];


  useEffect(() => {
    const token = AuthService.getAccessToken();
    // const username = localStorage.getItem("username");
    // const password = localStorage.getItem("password");
    if (token) {
      setAuthCredentials({ token });
    } else {
      setError("Please login to place a bet.");
    }
  }, []);

  useEffect(() => {
    if (poolId) {
      console.log("poolId:", poolId);
    }
  }, [poolId]);

  const handlePlaceBet = async (betSize: number) => {
    if (!authCredentials) {
      setError("Please login to place a bet.");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/pools/place_bet/`,
        {
          game_id: matchId,
          bet_size: betSize,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authCredentials.token}`,
          },
        }
      );

      const questionsData = await response.data;

      console.log(questionsData, "response")
      questionsData?.questions.forEach((question: any) => {
        console.log(`Question ID: ${question.id}, Question Type: ${question.question_type}`);
      });
      // console.log(questionsData);
      setPoolId(questionsData.pool_id);
      setQuestions(questionsData?.questions);
      setBetState("bet_started");
      setError(null);
    } catch (error) {
      console.error("Error placing bet:", error);
      setError("Failed to place bet. Please try again.");
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex;
      if (nextIndex === questions.length - 1) {
        setBetState("submit");
      }
      return nextIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleOptionSelect = (questionId: number, option: { id: string; text: string }) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };

  function handleOptionsSelect(questionId: number, options: { id: string; text: string }[]) {
    setSelectedOptions2((prev) => ({
      ...prev,
      [questionId]: options
    }))
  }

  const handleBackToHome = async () => {
    console.log("Returing to quiz pages")
   
    router.push("/")
  };

  const handleSubmitAnswer = async (
    questionId: number,
    selected_options: { id: string; text: string }[],
    question_type: string = "single_select"
  ) => {
    setLoading(true)
    const orderedOptions = selected_options.map((option, index) => ({
      id: option.id,
      text: option.text,
      ...(question_type === "ordered_multi_select" && { order: index + 1 }),
    }));

    const payload = {
      pool_id: poolId,
      question_id: questionId,
      selected_options: orderedOptions,
    };

    console.log(payload);

    try {
      if (!authCredentials) {
        setError("Missing authentication credentials");
        setLoading(false)
        return;
      }

      const response = await axiosInstance.post(
        `/pools/${poolId}/submit_answer/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // body: JSON.stringify(payload),
        }
      );

      const data = await response.data

      if (data.status === "success") {
        console.log("Answer submitted");
        handleNext();
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit answer. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  const showGameDetails = async () => {
    try {
      // if (!authCredentials) {
      //   setError("Missing authentication credentials");
      //   return;
      // }
      const response = await axiosInstanceWithoutAuth.get(
        `/sports/games/${matchId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",

          },
        }
      );
      if (response.status !== 200) {
        const errorData = response.data
        setError(`Error: ${errorData.message || "Failed to fetch game details"}`);
        return;
      }
      const data = await response.data
      setGameDetails(data);
      console.log(data);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching game details");
      console.error(error);
    }
  };
  useEffect(() => {
    if (matchId) {
      showGameDetails();
      // MyPools();
      console.log(gameDetails)
    }
  }, [matchId]);



  // useEffect(() => {
  //   if (gameDetails?.date) {
  //     const matchDate = new Date(gameDetails.date);

  //     const updateTimer = () => {
  //       const now = new Date();
  //       const diff = matchDate.getTime() - now.getTime();

  //       if (diff <= 0) {
  //         setTimeLeft("Match has started");
  //       } else {
  //         const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  //         const minutes = Math.floor((diff / (1000 * 60)) % 60);
  //         const seconds = Math.floor((diff / 1000) % 60);
  //         setTimeLeft(`${hours}h ${minutes}m ${seconds}s left`);
  //       }
  //     };

  //     updateTimer();
  //     const timer = setInterval(updateTimer, 1000);

  //     return () => clearInterval(timer);
  //   }
  // }, [gameDetails?.date]);



  const getLastWord = (str: string) => {
    const words = str.split(" ");
    return words[words.length - 1];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
    };
    return date.toLocaleDateString('en-GB', options); // Formats date as DD/MM
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use 12-hour format
    };
    return date.toLocaleTimeString('en-GB', options); // Formats time as hh:mm AM/PM
  };


  const renderOptions = () => {
    switch (activeTab) {
      case "contests":
        return <div className="flex flex-col">
        {betSizes.map((size, index) => (
            <ContestOptions 
              key={index} 
              handlePlaceBet={handlePlaceBet} 
              betSize={size} // Pass each bet size to ContestOptions
            />
          ))}    
        </div> 
      case "myContests":
        return <UserContests/>
      case "teams":
        return <div>Teams</div>;
      case "statistics":
        return <div><Statistics/></div>;
      default:
        return null;
    }
  }


  return (
    <div className="bg-black text-white flex items-center justify-center">
      {betState === "bet_started" && questions && questions.length > 0 ? (
        <Questions
          poolId={poolId}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          selectedOptions={selectedOptions2}
          handleNext={(questionId, options, question_type) => handleSubmitAnswer(questionId, options, question_type)}
          handlePrevious={handlePrevious}
          handleOptionSelect={handleOptionsSelect}
          loading={loading}
        />
      ) : betState === "submit" || betState === "submitted" ? (
        <div className="p-4 max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold">You have completed the quiz!</h1>
          <button
            onClick={handleBackToHome}
            className="mt-4 bg-[#CEFF00] py-2 px-4 rounded-full text-black text-lg font-semibold"
          >
            Place another bet?
          </button>
        </div>
      ) : (
        <div className="px-1 w-full mx-auto text-center">
          {gameDetails ? (
            <div className=" sticky top-[60px] bg-black">
              <div className="bg-gray-700 p-2 space-y-2 items-center text-center rounded-xl relative">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <img
                      src={gameDetails.home_team.logo_url}
                      alt="Home Team logo"
                      className="h-12"
                    />
                    <div className="text-start">
                      <p className="text-white font-semibold text-sm ">
                        {getLastWord(gameDetails.home_team.display_name)}
                      </p>
                      <h1 className="text-[8px]">4-5, 2nd AFC South</h1>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="text-center text-gray-400 text-[10px] flex flex-col">
                      <div>{formatDate(gameDetails.date)}</div>
                      <div>{formatTime(gameDetails.date)}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center"><div className="text-end">
                    <p className="text-white font-semibold text-sm ">
                      {getLastWord(gameDetails.away_team.display_name)}
                    </p>
                    <h1 className="text-[8px]">4-5, 2nd AFC South</h1>
                  </div>
                    <img
                      src={gameDetails.away_team.logo_url}
                      alt="Away Team logo"
                      className=" h-12"
                    />
                  </div></div>
              </div>
              <div className="flex items-center px-1 bg-gray-900 text-white justify-between py-2 text-xs rounded-sm">
                <div
                  className={`text-gray-300 hover:text-white cursor-pointer ${activeTab === "contests" ? "text-white font-bold border-b-2 border-white" : ""
                    }`}
                  onClick={() => setActiveTab("contests")}
                >
                  Contests
                </div>
                <div
                  className={`text-gray-300 hover:text-white cursor-pointer ${activeTab === "myContests" ? "text-white font-bold border-b-2 border-white" : ""
                    }`}
                  onClick={() => setActiveTab("myContests")}
                >
                  My Contests
                </div>
                <div
                  className={`text-gray-300 hover:text-white cursor-pointer ${activeTab === "teams" ? "text-white font-bold border-b-2 border-white" : ""
                    }`}
                  onClick={() => setActiveTab("teams")}
                >
                  Teams
                </div>
                <div
                  className={`text-gray-300 hover:text-white cursor-pointer ${activeTab === "statistics" ? "text-white font-bold border-b-2 border-white" : ""
                    }`}
                  onClick={() => setActiveTab("statistics")}
                >
                  Statistics
                </div>
              </div>
            </div>


          ) : (
            <p>Loading game details...</p>
          )}


          {renderOptions()}
        </div>
      )}
    </div>
  );
};

export default PlaceBet;
