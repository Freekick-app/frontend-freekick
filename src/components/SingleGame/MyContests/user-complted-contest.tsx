export default function UserCompletedContests() {
    return (
        <div className="p-2">
            <div className=" flex flex-col p-1">
                <div className="bg-gray-400 flex justify-between rounded-t-lg">
                    <h1>NFL</h1>
                    <h1>Time</h1>
                    </div>
                <div className="px-1 w-full mx-auto text-center bg-gray-500">
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
                                    <div className="text-center text-gray-400 text-[15px] flex flex-col">
                                        <div>Status</div>
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
                <hr/>
                <div className=" bg-gray-500 flex gap-2 rounded-b-lg">
                    <h1>Pools</h1>
                    <h1>Joined Contests</h1>
                </div>
            </div>
        </div>
    );
}
