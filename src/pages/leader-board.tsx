// pages/leaderboard.js

import Image from 'next/image';

const leaderboardData = [
  { rank: 1, name: 'Theriteam mass', points: '5,548.5', icon: '/avatar1.png', isTopRank: true },
  { rank: 2, name: 'HaZard VJ 10', points: '5,492.5', icon: '/avatar2.png' },
  { rank: 3, name: 'BhairavaVJ', points: '5,487.25', icon: '/avatar1.png', rankChange: 'up' },
  { rank: 4, name: 'P111', points: '5,485.75', icon: '/avatar3.png', rankChange: 'up' },
  { rank: 5, name: 'FREAKER11', points: '5,481.25', icon: '/avatar4.png' },
  { rank: 6, name: 'realmd11', points: '5,478', icon: '/avatar5.png', rankChange: 'down' },
  { rank: 7, name: 'CR7 The KING', points: '5,471.5', icon: '/avatar6.png', rankChange: 'down' },
];

export default function Leaderboard() {
  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md  overflow-hidden">
      <div className="bg-[#CEFF00] text-black py-2 px-4 rounded-xl flex justify-between">
        <span className="font-bold">PLAYER</span>
        <span className="font-bold">RANK</span>
      </div>
      <ul>
        {leaderboardData.map((player, index) => (
          <li key={index} className={`flex items-center rounded-xl py-4 px-4 ${index === 0 ? 'bg-gray-600 text-white' : 'bg-gray-800'}`}>
            <div className="flex items-center space-x-4 rounded-xl">
              <Image src={player.icon} width={40} height={40} alt={player.name} className="rounded-full" />
              <div>
                <p className={`text-sm font-semibold ${index === 0 ? 'text-white' : 'text-white'}`}>{player.name}</p>
                <p className="text-xs text-gray-400">{player.points} POINTS</p>
              </div>
            </div>
            <div className="ml-auto text-right ">
              <p className="text-lg font-bold">{`#${player.rank}`}</p>
              {player.isTopRank && <span className="text-yellow-500">👑</span>}
              {player.rankChange === 'up' && <span className="text-green-500">⬆️</span>}
              {player.rankChange === 'down' && <span className="text-red-500">⬇️</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
