export default function UserCompletedContests() {
    return (
        <div className="p-2">
            <div className=" flex flex-col p-1">
            <div className="bg-[#2663EB] flex justify-between rounded-t-lg px-2 h-6 items-center ">
                    <h4 className="text-sm" >Leauge Name</h4>
                    <h1 className="text-xs" >Time</h1>
                </div>
                <div  className="bg-gray-800" 
                style={{
                                backgroundImage: `url('/stadium6.jpeg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                  
                            }}>
                    <div className="px-1 w-full mx-auto text-center ">
                        <div className="sticky top-[60px] ">
                            <div className=" p-2 space-y-2 items-center text-center rounded-xl relative">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                        <img
                                            src="/nba2.png"
                                            alt="Home Team logo"
                                            className="h-12"
                                        />
                                        <div className="text-start">
                                            <p className="text-white font-semibold text-sm">
                                                name
                                            </p>
                                            <h1 className="text-[8px]">4-5, 2nd AFC South</h1>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <div className="text-center  text-[15px] font-semi-bold flex flex-col">
                                            <h1>Status</h1>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 items-center">
                                        <div className="text-end">
                                            <p className="text-white font-semibold text-sm">
                                                name
                                            </p>
                                            <h1 className="text-[8px]">4-5, 2nd AFC South</h1>
                                        </div>
                                        <img
                                            src="/nba2.png"
                                            alt="Away Team logo"
                                            className="h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="  flex gap-2 rounded-b-lg px-2 py-1 text-sm">
                        <h1>Pools</h1>
                        <h1>Joined Contests</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}


// bg-[#384152]