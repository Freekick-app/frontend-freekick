import Image from 'next/image';

export default function BetCard() {
  return (
    <div className="bg-[#333333] p-4 rounded-3xl flex flex-col items-center text-center">
      <Image
        src=""
        alt={`Logo`}
        width={140}
        height={80}
        className="rounded-full"
      />
      <h3 className="mt-2 font-semibold text-white">teamname</h3>
      <span className="text-[#CEFF00] mt-1">⭐ teamscore</span>
    </div>
  );
}
