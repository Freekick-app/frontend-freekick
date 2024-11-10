export default function UserContests(){
    return(
        <div className="bg-[#2365EA] rounded-lg m-2">
          <div className="flex text-center p-4 text-sm justify-between">
            <div className="flex flex-col">
              <h1>Prize Pool</h1>
              <h1>3X | $ 1000</h1>
            </div>
            <div className="flex flex-col">
                <h1>Sports</h1>
                <h1>10 Pools | 100 Players</h1>
            </div>
            <div className="flex flex-col">
              <h1>Entry</h1>
              <h1>$100</h1>
            </div>
          </div>
          <div className="flex justify-between text-[12px] p-2 bg-slate-900 rounded-b-lg border-b-[1px]">
              <h1>Pool 1</h1>
              <h1>18/25</h1>
              <h1>Won $11</h1>
              <h1>Rank 1</h1>
          </div>
        </div>
    )
}