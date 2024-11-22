const UserContestLoader = () => {
    return (
      <>
        {Array.from({ length: 1 }).map((_, i) => (
          <div
            key={i}
            className="mb-4 bg-[#2365EA] rounded-lg animate-pulse"
          >
            {/* Header Skeleton */}
            <div className="flex text-center p-4 text-sm justify-between">
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-400 rounded w-16 mx-auto"></div>
                <div className="h-4 bg-gray-400 rounded w-20 mx-auto"></div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-400 rounded w-12 mx-auto"></div>
                <div className="h-4 bg-gray-400 rounded w-28 mx-auto"></div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-400 rounded w-12 mx-auto"></div>
                <div className="h-4 bg-gray-400 rounded w-16 mx-auto"></div>
              </div>
            </div>
  
            {/* Pools List Skeleton */}
            <div className="space-y-2">
              {Array.from({ length: 1 }).map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between text-[12px] p-2 bg-slate-900 rounded-b-lg border-b-[1px] space-x-2"
                >
                  <div className="h-4 bg-gray-400 rounded w-12"></div>
                  <div className="h-4 bg-gray-400 rounded w-16"></div>
                  <div className="h-4 bg-gray-400 rounded w-16"></div>
                  <div className="h-4 bg-gray-400 rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };
  
  export default UserContestLoader;
  