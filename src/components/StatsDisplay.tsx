import { useState } from "react";

type Option = 'Jet' | 'Overview' | 'Option3';

function StatsDisplay() {
 
  const [selectedOption, setSelectedOption] = useState<Option>('Jet');


  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container mx-auto p-2">
     
     <div className="flex w-full mb-4 bg-gray-800 rounded-tl-xl
     rounded-tr-xl rounded-bl-xl rounded-br-xl border">
   
        <button
          onClick={() => handleOptionChange('Jet')}
          className={`py-2 flex-1 rounded-xl ${
            selectedOption === 'Jet' ? 'bg-[#CEFF00] text-black rounded-xl' : 'bg-gray-800 text-white'
          }`}
        >
          Jet
        </button>

      
        <button
          onClick={() => handleOptionChange('Overview')}
          className={`py-2 flex-1 rounded-xl ${
            selectedOption === 'Overview' ? 'bg-[#CEFF00] text-black' : 'bg-gray-800 text-white'
          }`}
        >
          Overview
        </button>

      
        <button
          onClick={() => handleOptionChange('Option3')}
          className={`py-2 flex-1 rounded-xl ${
            selectedOption === 'Option3' ? 'bg-[#CEFF00] text-black' : 'bg-gray-800 text-white'
          }`}
        >
          Cardinals
        </button>
      </div>


      <div className="table-container  rounded-xl border border-gray-300 shadow-lg overflow-hidden ">
        {selectedOption === 'Jet' && (
          <table className="min-w-full border border-gray-300 rounded-xl">
            <thead>
              <tr>
                <th className="border px-4 py-2">Jet Column 1</th>
                <th className="border px-4 py-2">Jet Column 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Jet Data 1</td>
                <td className="border px-4 py-2">Jet Data 2</td>
              </tr>
            </tbody>
          </table>
        )}
        {selectedOption === 'Overview' && (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Overview Column 1</th>
                <th className="border px-4 py-2">Overview Column 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Overview Data 1</td>
                <td className="border px-4 py-2">Overview Data 2</td>
              </tr>
            </tbody>
          </table>
        )}
        {selectedOption === 'Option3' && (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Option3 Column 1</th>
                <th className="border px-4 py-2">Option3 Column 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Option3 Data 1</td>
                <td className="border px-4 py-2">Option3 Data 2</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StatsDisplay;
