/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface QuestionsProps {
  poolId?: string;
  questions: Question[];
  currentQuestionIndex: number;
  selectedOptions: { [key: number]: Option };
  handleNext: (questionId: number, selectedOption: Option) => void;
  handlePrevious: () => void;
  handleOptionSelect: (questionId: number, option: Option) => void;
}

const Questions: React.FC<QuestionsProps> = ({
  poolId,
  questions,
  currentQuestionIndex,
  selectedOptions,
  handleNext,
  handlePrevious,
  handleOptionSelect,
}) => {
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option: Option) => {
    handleOptionSelect(currentQuestion.id, option);
  };

  const handleNextClick = () => {
    const selectedOption = selectedOptions[currentQuestion.id];
    if (selectedOption) {
      handleNext(currentQuestion.id, selectedOption);
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Question {currentQuestionIndex + 1}: {currentQuestion.text}
      </h2>
      <div className="space-y-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`block w-full py-2 px-4 rounded-lg ${
              selectedOptions[currentQuestion.id]?.id === option.id
                ? "bg-blue-600"
                : "bg-gray-700"
            } hover:bg-blue-500 transition-colors duration-200`}
          >
            {option.text}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        {/* <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-700"
        >
          Previous
        </button> */}
        <button
          onClick={handleNextClick}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Questions;
