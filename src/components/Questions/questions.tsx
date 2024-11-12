/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import toast from "react-hot-toast";

interface Option {
    id: string;
    text: string;
    //   metadata?: { [key: string]: any };
}

interface Question {
    id: number;
    text: string;
    options: Option[];
    question_type: string;
}

interface QuestionsProps {
    poolId?: string;
    questions: Question[];
    currentQuestionIndex: number;
    selectedOptions: { [key: number]: Option[] };
    handleNext: (questionId: number, selectedOptions: Option[], question_type: string) => void;
    handlePrevious: () => void;
    handleOptionSelect: (questionId: number, options: Option[]) => void;
    loading: boolean;
}

const Questions: React.FC<QuestionsProps> = ({
    poolId,
    questions,
    currentQuestionIndex,
    selectedOptions,
    handleNext,
    handlePrevious,
    handleOptionSelect,
    loading
}) => {
    const currentQuestion = questions[currentQuestionIndex];
    const { question_type, options } = currentQuestion;

    const handleOptionClick = (option: Option, question_type: string) => {
        if (["single_select", "number_range"].includes(question_type)) {
            handleOptionSelect(currentQuestion.id, [option]);

        } else if (["multi_select", "ordered_multi_select"].includes(question_type)) {
            const selected = selectedOptions[currentQuestion.id] || []
            const checkIfSelected = selected?.find((selectedOption) => selectedOption.id === option.id);
            let newSelected = selected ?? []
            if (checkIfSelected) {
                newSelected = selected.filter((selectedOption) => selectedOption.id !== option.id);
            } else {
                newSelected = [...selected, option];

            }
            handleOptionSelect(currentQuestion.id, newSelected);
        } else {
            handleOptionSelect(currentQuestion.id, [option]);
        }
    };

    const handleNextClick = () => {
        // const selected = selectedOptions[currentQuestion.id];
        // if (selected) {
        //     handleNext(currentQuestion.id, selected, question_type);
        // } else {
        //     toast.error("Please select option before proceeding.");

        // }
        const selected = selectedOptions[currentQuestion.id];

        if (!selected) {
            toast.error("Please select an option before proceeding.");
            return;
        }

        if (["multi_select", "ordered_multi_select"].includes(question_type) && selected.length < 3) {
            toast.error("Please select at least 3 options before proceeding.");
            return;
        }

        handleNext(currentQuestion.id, selected, question_type);
    };

    return (
        <div className="p-6 max-w-lg mx-auto  text-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
                Question {currentQuestionIndex + 1}: {currentQuestion.text} <span>{`(${question_type})`}</span>
            </h2>
            <div className="space-y-3">
                {options && options.map((option) => {

                    const disabled = ["ordered_multi_select", "multi_select"].includes(question_type) &&
                        selectedOptions &&
                        selectedOptions[currentQuestion.id]?.length >= 3 &&
                        !selectedOptions[currentQuestion.id].find((selectedOption) => selectedOption.id === option.id)

                    return (


                        <button
                            key={option.id}
                            // disabled={!!(["ordered_multi_select", "multi_select"].includes(question_type) && selectedOptions && (selectedOptions[currentQuestion.id] || [])?.find((selectedOption) => selectedOption.id != option.id && ((selectedOptions[currentQuestion.id] || [])?.length>=3)))}
                            disabled={disabled}
                            onClick={() => handleOptionClick(option, question_type)}
                            className={` ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-blue-500"}  w-full flex flex-row items-center gap-1 py-2 px-4 rounded-lg ${selectedOptions && (selectedOptions[currentQuestion.id] || [])?.find((selectedOption) => selectedOption.id === option.id)
                                ? "bg-blue-600"
                                : "bg-gray-700"
                                }  transition-colors duration-200`}
                        >
                            <p>{option.text}</p>
                            {question_type === "ordered_multi_select" && selectedOptions && (selectedOptions[currentQuestion.id] || [])?.find((selectedOption) => selectedOption.id === option.id) && <p className="bg-black rounded-full w-6 h-6 flex justify-center items-center">
                                {
                                    selectedOptions[currentQuestion.id].findIndex(
                                        (selectedOption) => selectedOption.id === option.id
                                    ) + 1
                                }
                            </p>}
                        </button>
                    )
                }
                )}
            </div>
            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleNextClick}
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-lg ${loading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-[#CEFF00] text-black "
                        }`}
                >
                    {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
                </button>
            </div>

        </div>
    );
};

export default Questions;
