/* eslint-disable @typescript-eslint/no-unused-vars */

import { AuthService } from "@/services/auth";
import axiosInstance from "@/utils/axios";
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
  selected_option_id: string[]; 
  answered_at: string;
}

interface Question {
  id: number;
  text: string;
  points: number;
  difficulty: string;
  question_type: string;
  options: Option[];
  user_answer?: UserAnswer | null;
}

interface PoolData {
  pool_info: PoolInfo;
  questions: Question[];
}

export default function DisplayQuestions() {
  const [data, setData] = useState<PoolData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const poolId = 23;

  useEffect(() => {
    const token = AuthService.getAccessToken();

    if (token) {
      axiosInstance
        .get(`/pools/${poolId}/questions/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          setError(error.message);
          console.log("Fetch Error: ", error);
        })
        .finally(() => setLoading(false));
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, [poolId]);

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Pool Info</h1>
      {data && (
        <div>
          <p><strong>ID:</strong> {data.pool_info.id}</p>
          <p><strong>Name:</strong> {data.pool_info.name}</p>
          <p><strong>Status:</strong> {data.pool_info.status}</p>
          <p><strong>Bet Size:</strong> {data.pool_info.bet_size}</p>
          <p><strong>Participants:</strong> {data.pool_info.current_participants}/{data.pool_info.max_participants}</p>
        </div>
      )}

      <h1>Questions</h1>
      <ul>
        {data?.questions.map((question) => (
          <li key={question.id}>
            <p><strong>Question:</strong> {question.text}</p>
            <p><strong>Points:</strong> {question.points}</p>
            <p><strong>Difficulty:</strong> {question.difficulty}</p>
            <p><strong>Type:</strong> {question.question_type}</p>

            <p><strong>Options:</strong></p>
            <ul>
              {question.options.map((option) => (
                <li key={option.id}>
                  <span>Text: {option.text}</span>
                </li>
              ))}
            </ul>

            <p><strong>Your Answer:</strong></p>
            {question.user_answer ? (
              <div>
                <p>Answered At: {question.user_answer.answered_at}</p>
                <ul>
                  {question.user_answer.selected_option_id.map((selectedId) => {
                    const selectedOption = question.options.find(option => option.id === selectedId);
                    return (
                      <li key={selectedId}>
                        {selectedOption ? <span>Text: {selectedOption.text}</span> : <span>Option ID: {selectedId} (Text not found)</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <p>Not answered</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
