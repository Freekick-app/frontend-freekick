import { getQuestions } from "@/api/pools";
import { AuthService } from "@/services/auth";
import { useEffect, useState } from "react";

interface PoolInfo {
  id: number;
  name: string;
  status: string;
  bet_size: number;
  current_participants: number;
  max_participants: number;
}

interface Option {
  id: string;
  text: string;
}

interface UserAnswer {
  selected_option_id: string;
  answered_at: string;
}

interface Question {
  id: number;
  text: string;
  points: number;
  difficulty: string;
  question_type: string;
  options: Option[];
  user_answer?: UserAnswer;
}

interface PoolData {
  pool_info: PoolInfo;
  questions: Question[];
}

export default function DisplayQuestions() {
  const [data, setData] = useState<PoolData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the current question
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const poolId = 34;

  useEffect(() => {
    const token = AuthService.getAccessToken();

    if (token) {
      const initQuestions = async () => {
        try {
          setError("");
          const response = await getQuestions(poolId);
          setData(response);
        } catch (error) {
          setError("Failed to fetch questions");
          console.error("Fetch Error: ", error);
        } finally {
          setLoading(false);
        }
      };

      initQuestions();
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, [poolId]);

  const handleNext = () => {
    if (data && currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>Error: {error}</p>;

  const currentQuestion = data?.questions[currentQuestionIndex];

  return (
    <div className="p-4">
      <h1>Pool Info</h1>
      {data && (
        <div>
          <p>
            <strong>ID:</strong> {data.pool_info.id}
          </p>
          <p>
            <strong>Name:</strong> {data.pool_info.name}
          </p>
          <p>
            <strong>Status:</strong> {data.pool_info.status}
          </p>
          <p>
            <strong>Bet Size:</strong> {data.pool_info.bet_size}
          </p>
          <p>
            <strong>Participants:</strong> {data.pool_info.current_participants}
            /{data.pool_info.max_participants}
          </p>
        </div>
      )}

      <h1>Question</h1>
      {currentQuestion && (
        <div>
          <p>
            <strong>Question:</strong> {currentQuestion.text}
          </p>
          <p>
            <strong>Points:</strong> {currentQuestion.points}
          </p>
          <p>
            <strong>Difficulty:</strong> {currentQuestion.difficulty}
          </p>
          <p>
            <strong>Type:</strong> {currentQuestion.question_type}
          </p>

          <p>
            <strong>Options:</strong>
          </p>
          <ul>
            {currentQuestion.options.map((option) => (
              <li key={option.id}>
                <span> - {option.text}</span>
              </li>
            ))}
          </ul>

          <p>
            <strong>Your Answer:</strong>
          </p>
          {currentQuestion.user_answer ? (
            <div>
              <ul>
                {currentQuestion.user_answer.selected_option_id
                  .replace(/'/g, '"')
                  .slice(1, -1)
                  .split(",")
                  .map((selectedId: string) => {
                    const idTrimmed = selectedId.trim().replace(/['"]/g, "");
                    const selectedOption = currentQuestion.options.find(
                      (option) => option.id === idTrimmed
                    );
                    return (
                      <li key={idTrimmed}>
                        <span className="font-bold">
                          {selectedOption ? selectedOption.text : "Unknown option"}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : (
            <p>Not answered</p>
          )}
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={data && currentQuestionIndex === data.questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
