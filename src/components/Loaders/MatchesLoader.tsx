

const MatchesLoader = () => {
  return (
    <div className="flex flex-col gap-1">
      {Array(10) // Simulate loading multiple items
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="bg-gray-700 w-full rounded-2xl h-[70px] p-1 my-4 animate-pulse relative"
          >

            <div className="flex justify-between items-center">
              {/* Left Team Skeleton */}
              <div className="flex items-center">
                <div className="bg-gray-600 rounded-full h-[60px] w-[60px]"></div>
                <div className="bg-gray-600 h-[12px] w-[60px] ml-4 rounded"></div>
              </div>

              {/* Date and Time Skeleton */}
              <div className="text-center absolute inset-x-0 flex flex-col justify-center items-center gap-1">
                <div className="bg-gray-600 h-[10px] w-[50px] rounded"></div>
                <div className="bg-gray-600 h-[10px] w-[40px] rounded"></div>
              </div>

              {/* Right Team Skeleton */}
              <div className="flex items-center">
                <div className="bg-gray-600 h-[12px] w-[60px] mr-4 rounded"></div>
                <div className="bg-gray-600 rounded-full h-[60px] w-[60px]"></div>
              </div>
            </div>

            {/* Play Now Button Skeleton */}
            <div className="flex items-center justify-center z-10 absolute inset-x-0 top-[57px]">
              <div className="bg-gray-600 h-[25px] w-[100px] rounded-full"></div>
            </div>
           
          </div>
         
    
          
        ))}
    </div>
  );
};

export default MatchesLoader;
