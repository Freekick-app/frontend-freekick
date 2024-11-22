export default function SkeletonGameDetails() {
    return (
      <div className="px-1 w-full mx-auto text-center">
        {/* Game Details Skeleton */}
        <div className="sticky top-[60px] bg-black">
          <div className="bg-gray-700 p-2 space-y-2 items-center text-center rounded-xl relative">
            <div className="flex justify-between">
              {/* Home Team Skeleton */}
              <div className="flex items-center gap-1">
                <div className="h-12 w-12 bg-gray-400 animate-pulse rounded-full"></div>
                <div className="text-start">
                  <div className="h-4 bg-gray-400 animate-pulse w-16 mb-1 rounded"></div>
                  <div className="h-2 bg-gray-400 animate-pulse w-12 rounded"></div>
                </div>
              </div>
  
              {/* Center Date and Time Skeleton */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="text-center text-gray-400 text-[10px] flex flex-col space-y-1">
                  <div className="h-3 bg-gray-400 animate-pulse w-20 mx-auto rounded"></div>
                  <div className="h-3 bg-gray-400 animate-pulse w-16 mx-auto rounded"></div>
                </div>
              </div>
  
              {/* Away Team Skeleton */}
              <div className="flex items-center gap-1">
                <div className="text-end">
                  <div className="h-4 bg-gray-400 animate-pulse w-16 mb-1 rounded"></div>
                  <div className="h-2 bg-gray-400 animate-pulse w-12 rounded"></div>
                </div>
                <div className="h-12 w-12 bg-gray-400 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
  
          {/* Tabs Skeleton */}
          <div className="flex items-center px-1 bg-gray-900 text-white justify-between py-2 text-xs rounded-sm">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-400 animate-pulse w-20 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  