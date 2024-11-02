import { FaMoneyBill } from "react-icons/fa";

const MyContests = () => {
  return (
    <div className="bg-black min-h-screen text-white p-4 space-y-6">
      <div className="bg-[#1F1DFF] p-6 rounded-[40px] text-center">
        <p className="text-gray-300">Balance</p>
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <FaMoneyBill /> 4,450
        </h1>
        <p className="text-[#CEFF00] text-sm mt-1">+4.34%, 24 September 2024</p>

        <div className="mt-4 flex justify-between items-center space-x-2">
          <span className="text-white font-semibold">🔥 Win streak:</span>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#CEFF00] bg-[#1F1DFF] border-[6px] border-[#CEFF00]">
            4
          </div>
        </div>
      </div>

      <div className="flex justify-around p-4 rounded-2xl">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                index === 0
                  ? 'text-[#CEFF00] border-white border-2'
                  : index === 1
                  ? 'bg-red-500'
                  : 'bg-gray-700'
              }`}
            >
              {index === 0 ? '✔' : index === 1 ? '✖' : ''}
            </div>
            <p className="text-xs text-gray-400">{day}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {[
          {
            teams: [
              { name: 'Arizona Cardinals' },
              { name: 'Carolina Panthers' },
            ],
            date: '23 Sep at 5:00pm',
          },
          {
            teams: [
              { name: 'Jacksonville Jaguars' },
              { name: 'Cleveland Browns' },
            ],
            date: '24 Sep at 6:00pm',
          },
        ].map((match, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 px-16 space-y-2 items-center text-center rounded-[60px]"
          >
            <div className="flex justify-center items-center space-x-2">
              <p className="text-white font-bold text-sm">
                {match.teams[0].name}
              </p>
              <div className="bg-[#CEFF00] text-black font-bold px-2 py-1 rounded-full text-center">
                vs
              </div>
              <p className="text-white font-bold text-sm">
                {match.teams[1].name}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="bg-blue-600 text-white text-xs w-[150px] py-2 rounded-xl text-center">
                {match.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContests;
