/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Questions from "@/components/Questions/questions";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const PlaceBet = () => {
  const router = useRouter();
  const { matchId } = router.query;
  const [poolId, setPoolId] = useState<string | undefined>();
  const [betSize] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const [authCredentials, setAuthCredentials] = useState<{ username: string; password: string } | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: { id: string; text: string } }>({});
  const [selectedOptions2, setSelectedOptions2] = useState<{ [key: number]: { id: string; text: string }[] }>({});
  const [betState, setBetState] = useState("initial");
  const [gameDetails, setGameDetails] = useState<any>();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username && password) {
      setAuthCredentials({ username, password });
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
      const response = await axios.post(
        `${backend_url}/pools/place_bet/`,
        {
          game_id: matchId,
          bet_size: betSize,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${btoa(
              `${authCredentials.username}:${authCredentials.password}`
            )}`,
          },
        }
      );

      const questionsData = response.data;
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

      const response = await fetch(
        `${backend_url}/pools/${poolId}/submit_answer/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${btoa(
              `${authCredentials.username}:${authCredentials.password}`
            )}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

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
      const response = await fetch(
        `${backend_url}/sports/games/${matchId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${btoa(
              `${authCredentials.username}:${authCredentials.password}`
            )}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || "Failed to fetch game details"}`);
        return;
      }
      const data = await response.json();
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
        <div className="p-4 max-w-xl mx-auto text-center">
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
                {new Date(gameDetails.match_date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading game details...</p>
        )}

        <h1 className="text-2xl font-bold">Place Your Bet for Match {matchId}</h1>
        <p className="mt-4">Bet Size: {betSize}</p>
        <button
          onClick={handlePlaceBet}
          className="mt-4 bg-[#CEFF00] py-2 px-4 rounded-full text-black text-lg font-semibold"
        >
          Place Bet
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    )}
  </div>
  );
};

export default PlaceBet;
