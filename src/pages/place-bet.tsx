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
  const [betState, setBetState] = useState("initial");

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

  const handleSubmitQuiz = async () => {
    console.log("Submitting Quiz for Pool", poolId);
    setTimeout(() => {
      console.log("Quiz submitted");
      setBetState("submitted");
    }, 3000);
  };

  const handleSubmitAnswer = async (questionId: number, selected_option: { id: string; text: string }) => {
    const payload = {
      pool_id: poolId,
      question_id: questionId,
      selected_options: [{id: selected_option.id, text: selected_option.text}],
    };
    console.log(payload);
    try {
      if (!authCredentials) {
        setError("Missing authentication credentials");
        return;
      }
      const response = await fetch(`${backend_url}/pools/${poolId}/submit_answer/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${btoa(
            `${authCredentials.username}:${authCredentials.password}`
          )}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      if (data.status == "success") {
        console.log("Answer submitted");
        handleNext();
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit answer. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white flex items-center justify-center">
      {betState === "bet_started" && questions && questions.length > 0 ? (
        <Questions
          poolId={poolId}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          selectedOptions={selectedOptions}
          handleNext={(questionId, option) => handleSubmitAnswer(questionId, selectedOptions[questionId])}
          handlePrevious={handlePrevious}
          handleOptionSelect={handleOptionSelect}
        />
      ) : betState === "submit" || betState === "submitted" ? (
        <div className="p-4 max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Submit Quiz for Pool {poolId}</h1>
          <button
            onClick={handleSubmitQuiz}
            className="mt-4 bg-[#1F1DFF] py-2 px-4 rounded-full text-white text-lg font-semibold"
          >
            Submit Quiz
          </button>
          {betState === "submitted" && <p className="mt-4">Bet Submitted</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ) : (
        <div className="p-4 max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Place Your Bet for Match {matchId}</h1>
          <p className="mt-4">Bet Size: {betSize}</p>
          <button
            onClick={handlePlaceBet}
            className="mt-4 bg-[#1F1DFF] py-2 px-4 rounded-full text-white text-lg font-semibold"
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
