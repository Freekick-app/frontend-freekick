import { FaMoneyBill } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="bg-black min-h-screen text-white p-4 space-y-6  ">
   
      <div className="bg-[#1F1DFF] p-6 rounded-2xl text-center">
        <p className="text-gray-300">Balance</p>
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2"><FaMoneyBill/>4,450</h1>
        <p className="text-[#CEFF00] text-sm mt-1">+4.34%, 24 September 2024</p>
        
 
        <div className="mt-4 flex justify-between items-center space-x-2">
          <span className="text-white font-semibold">🔥 Win streak:</span>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#CEFF00] bg-[#1F1DFF] border-[6px] border-[#CEFF00]">
            4
          </div>
        </div>
      </div>

      <div className="flex justify-around bg-gray-800 p-4 rounded-2xl">
        {['Mon', 'Tue', 'Wed', 'Thr', 'Fri'].map((day, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${index === 0 ? 'bg-[#CEFF00]' : index === 1 ? 'bg-red-500' : 'bg-gray-700'}`}>
              {index === 0 ? '✔' : index === 1 ? '✖' : ''}
            </div>
            <p className="text-xs text-gray-400">{day}</p>
          </div>
        ))}
      </div>

     
      <div className="space-y-4">
        {[
          { teams: ['Arizona Cardinals', 'Carolina Panthers'], date: '23 Sep at 5:00pm' },
          { teams: ['Jacksonville Jaguars', 'Cleveland Browns'], date: '24 Sep at 6:00pm' },
        ].map((match, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-2xl flex justify-between items-center">
            <div className="text-sm">
              <p className="text-[#CEFF00] font-bold">{match.teams[0]}</p>
              <p className="text-yellow-400 font-bold text-center">vs</p>
              <p className="text-[#CEFF00] font-bold">{match.teams[1]}</p>
            </div>
            <div className="bg-[#CEFF00]'
             text-black text-xs px-3 py-1 rounded-full">{match.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
