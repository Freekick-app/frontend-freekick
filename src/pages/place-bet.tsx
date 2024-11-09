/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Questions from "@/components/Questions/questions";
import axiosInstance from "@/utils/axios";
import { AuthService } from "@/services/auth";

const PlaceBet = () => {
  const router = useRouter();
  const { matchId } = router.query;
  const [poolId, setPoolId] = useState<string | undefined>();
  const [betSize] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const [authCredentials, setAuthCredentials] = useState<{ token:string} | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: { id: string; text: string } }>({});
  const [selectedOptions2, setSelectedOptions2] = useState<{ [key: number]: { id: string; text: string }[] }>({});
  const [betState, setBetState] = useState("initial");
  const [gameDetails, setGameDetails] = useState<any>();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token  = AuthService.getAccessToken();
    // const username = localStorage.getItem("username");
    // const password = localStorage.getItem("password");
    if (token) {
      setAuthCredentials({token});
    } else {
      setError("Missing authentication credentials");
    }
  }, []);

  useEffect(() => {
    if (poolId) {
      console.log("poolId:", poolId);
    }
  }, [poolId]);

  const handlePlaceBet = async () => {
    if (!authCredentials) {
      setError("Missing authentication credentials");
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
      if (!authCredentials) {
        setError("Missing authentication credentials");
        return;
      }
      const response = await axiosInstance.get(
        `/sports/games/${matchId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",

          },
        }
      );
      if (response.status !==200) {
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
    if (matchId && authCredentials) {
      showGameDetails();
      console.log(gameDetails)
    }
  }, [matchId, authCredentials]);



  useEffect(() => {
    if (gameDetails?.date) {
      const matchDate = new Date(gameDetails.date);

      const updateTimer = () => {
        const now = new Date();
        const diff = matchDate.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeLeft("Match has started");
        } else {
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s left`);
        }
      };

      updateTimer();
      const timer = setInterval(updateTimer, 1000);

      return () => clearInterval(timer);
    }
  }, [gameDetails?.date]);



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
        <div className="px-4  max-w-xl mx-auto text-center">
          {gameDetails ? (
            <div className="bg-gray-800 py-4 px-4 space-y-2 items-center text-center rounded-[40px]">
              <div className="flex justify-center items-center gap-1">
                <img
                  src={gameDetails.home_team.logo_url}
                  alt="Home Team logo"
                  className="w-8 h-8"
                />
                <p className="text-white font-bold text-sm">
                  {gameDetails.home_team.display_name}
                </p>
                <div className="bg-[#CEFF00] text-black font-bold px-2 py-1 rounded-full text-center">
                  vs
                </div>
                <p className="text-white font-bold text-sm">
                  {gameDetails.away_team.display_name}
                </p>
                <img
                  src={gameDetails.away_team.logo_url}
                  alt="Away Team logo"
                  className="w-8 h-8"
                />
              </div>
              <div className="flex justify-center">
                <div className="bg-blue-600 text-white text-xs w-[150px] py-2 rounded-xl text-center">
                  {timeLeft}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading game details...</p>
          )}
          <hr className="m-2" />
          <div className="bg-gray-800 p-4 rounded-3xl">
            {/* <h1 className="text-2xl font-bold">Place Your Bet for Match {matchId}</h1> */}
            <div className="flex justify-between font-bold  text-center ">
              <div className="flex flex-col items-start">
              <h1>Prize Pool</h1>
              <h1 className="text-xl">$100</h1>
              </div>
              
              <button className="bg-blue-500 rounded-xl px-2 text-center text-base items-center ">Bet Size: ${betSize}</button>
            </div>
            
            <button
              onClick={handlePlaceBet}
              className="mt-4 bg-[#CEFF00] py-2 px-4 rounded-full text-black text-lg font-semibold"
            >
              Place Bet
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceBet;
