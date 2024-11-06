/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Questions({ poolId, questions, currentQuestionIndex, selectedOptions, handleOptionSelect, handlePrevious, handleNext,  }:
    {
        poolId:any;   
        questions?: any[];
        currentQuestionIndex: number;
        selectedOptions:  {
            [key: number]: string;
        };
        handleOptionSelect: (option: any,
            questionIndex: string) => void;
        
        handlePrevious: () => void;
        handleNext: () => void;

    }
) {
    
    

    return (
        <div className="bg-black text-white flex items-center justify-center">
            {questions&&questions.length > 0 && (
                <div className="p-4 max-w-xl mx-auto text-center">
                    <h2 className="text-xl font-bold">{questions[currentQuestionIndex].text}</h2>
                    <div className="flex flex-col items-center">
                        {questions[currentQuestionIndex].options.map((option:any) => (
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
}