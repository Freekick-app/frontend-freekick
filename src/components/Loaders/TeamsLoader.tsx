export default function TeamsLoader({
    count = 12,
    gridCols = 3,
    itemHeight = "h-36",
  }: {
    count?: number;
    gridCols?: number;
    itemHeight?: string;
  }) {
    return (
      <div className={`grid grid-cols-${gridCols} gap-2 p-2`}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`text-center bg-gray-600 rounded-lg ${itemHeight}`}
          >
            <div className="h-28 bg-gray-400 animate-pulse rounded-lg"></div>
            <p className="mt-2 bg-gray-400 animate-pulse h-4 w-3/4 mx-auto rounded"></p>
          </div>
        ))}
      </div>
    );
  }
  