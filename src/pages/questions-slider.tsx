/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Option {
  text: string;
  id: string;
  metadata: Record<string, any>;
}

interface Question {
  id: number;
  text: string;
  points: number;
  difficulty: string;
  options: Option[];
  question_type: number;
}

const data = {
  pool_id: 25,
  questions: [
    {
      id: 7260,
      text: "Which team will win this game?",
      points: 1,
      difficulty: "easy",
      options: [
        {
          text: "Los Angeles Chargers",
          metadata: {
            team_id: 10,
            team_type: "home",
            abbreviation: "LAC",
            game_id: 100,
          },
          id: "8ec27c2b-7f3b-497c-a946-241ddb52cd23",
        },
        {
          text: "Cincinnati Bengals",
          metadata: {
            team_id: 7,
            team_type: "away",
            abbreviation: "CIN",
            game_id: 100,
          },
          id: "adba271d-449d-4d7f-a514-342dd3a7ff28",
        },
      ],
      question_type: 1,
    },
    {
      id: 7261,
      text: "What will be the total combined score?",
      points: 2,
      difficulty: "medium",
      options: [
        {
          text: "Under 30",
          metadata: {
            min_value: 0,
            max_value: 29,
            game_id: 100,
          },
          id: "368fadfe-e210-4233-81fd-4babf9a6d9b1",
        },
        {
          text: "30-39",
          metadata: {
            min_value: 30,
            max_value: 39,
            game_id: 100,
          },
          id: "be3558b4-4b5d-4440-9c03-2d99a7c4f43e",
        },
        {
          text: "40-49",
          metadata: {
            min_value: 40,
            max_value: 49,
            game_id: 100,
          },
          id: "e5f7886a-bfa3-469e-ac2d-6e36b6f3a659",
        },
        {
          text: "50 or more",
          metadata: {
            min_value: 50,
            max_value: 100,
            game_id: 100,
          },
          id: "c8212d94-59d0-4681-af31-c1ff8bef413d",
        },
      ],
      question_type: 2,
    },
  ],
};

const QuestionSlider = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState(data.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (router.query.questions) {
      setQuestions(JSON.parse(router.query.questions as string));
    }

  }, [router.query.questions]);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleOptionSelect = (questionId: number, optionId: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: optionId,
    }));
  };

  return (
    <div className="bg-black text-white flex items-center justify-center">
      {questions.length > 0 && (
        <div className="p-4 max-w-xl mx-auto text-center">
          <h2 className="text-xl font-bold">{questions[currentQuestionIndex].text}</h2>
          <div className="flex flex-col items-center">
            {questions[currentQuestionIndex].options.map((option) => (
              <div key={option.id}
              onClick={() => handleOptionSelect(questions[currentQuestionIndex].id, option.id)}
              className={`block p-2 my-2 rounded w-full cursor-pointer ${selectedOptions[questions[currentQuestionIndex].id] === option.id
                  ? "bg-gray-600 text-white"
                  : "bg-[#CEFF00] text-black"
                }`}>
                <button
                  // key={option.id}
                  // onClick={() => handleOptionSelect(questions[currentQuestionIndex].id, option.id)}
                  // className={`block p-2 my-2 rounded ${selectedOptions[questions[currentQuestionIndex].id] === option.id
                  //     ? "bg-gray-600 text-white"
                  //     : "bg-[#CEFF00] text-black"
                  //   }`}
                >
                  {option.text}
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-700 text-white p-2 rounded-xl"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-gray-700 text-white p-2 rounded-xl"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionSlider;
