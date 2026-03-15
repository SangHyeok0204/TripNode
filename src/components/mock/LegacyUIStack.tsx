export function LegacyUIStack({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[350px] ${className}`}>
      {/* Stacked cards representing multiple apps/windows */}

      {/* Card 1 - Map app (back) */}
      <div
        className="
          absolute w-48 h-36 bg-gray-100 rounded-lg shadow-md border border-gray-200 overflow-hidden
          transition-all duration-300 ease-out
          group-hover/legacy:shadow-lg group-hover/legacy:translate-y-[-2px]
        "
        style={{
          top: "10%",
          left: "5%",
          transform: "rotate(-6deg)",
        }}
      >
        <div className="h-6 bg-gray-200 flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
          <div className="w-2 h-2 rounded-full bg-gray-400" />
          <div className="w-2 h-2 rounded-full bg-gray-400" />
        </div>
        <div className="p-2">
          <div className="w-full h-4 bg-gray-300 rounded mb-2" />
          <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-400">지도 앱</span>
          </div>
        </div>
      </div>

      {/* Card 2 - Review app */}
      <div
        className="
          absolute w-44 h-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden
          transition-all duration-300 ease-out delay-[50ms]
          group-hover/legacy:shadow-xl group-hover/legacy:translate-y-[-3px]
        "
        style={{
          top: "20%",
          left: "25%",
          transform: "rotate(3deg)",
        }}
      >
        <div className="h-6 bg-yellow-100 flex items-center px-2 transition-colors duration-300 group-hover/legacy:bg-yellow-200">
          <span className="text-xs text-yellow-700">리뷰</span>
        </div>
        <div className="p-2 space-y-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-3 h-3 bg-yellow-400 rounded-sm transition-colors duration-300 group-hover/legacy:bg-yellow-500" />
            ))}
          </div>
          <div className="w-full h-3 bg-gray-200 rounded" />
          <div className="w-3/4 h-3 bg-gray-200 rounded" />
          <div className="w-full h-3 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Card 3 - Search results */}
      <div
        className="
          absolute w-52 h-44 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden
          transition-all duration-300 ease-out delay-[100ms]
          group-hover/legacy:shadow-2xl group-hover/legacy:translate-y-[-4px]
        "
        style={{
          top: "35%",
          left: "15%",
          transform: "rotate(-2deg)",
        }}
      >
        <div className="h-8 bg-gray-50 flex items-center px-2 gap-2 border-b">
          <div className="flex-1 h-5 bg-gray-200 rounded" />
          <div className="w-5 h-5 bg-gray-300 rounded" />
        </div>
        <div className="p-2 space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-2 p-1 bg-gray-50 rounded items-center"
            >
              <div className="w-8 h-8 bg-gray-200 rounded" />
              <div className="flex-1">
                <div className="w-full h-2 bg-gray-300 rounded mb-1" />
                <div className="w-2/3 h-2 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 4 - Navigation/directions (front) */}
      <div
        className="
          absolute w-48 h-32 bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden
          transition-all duration-300 ease-out delay-[150ms]
          group-hover/legacy:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] group-hover/legacy:translate-y-[-5px]
        "
        style={{
          top: "55%",
          left: "35%",
          transform: "rotate(4deg)",
        }}
      >
        <div className="h-6 bg-blue-500 flex items-center px-2 transition-colors duration-300 group-hover/legacy:bg-blue-600">
          <span className="text-xs text-white">길찾기</span>
        </div>
        <div className="p-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex-1 h-3 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="flex-1 h-3 bg-gray-200 rounded" />
          </div>
          <div className="w-full h-3 bg-blue-100 rounded" />
        </div>
      </div>

      {/* Confusion indicator */}
      <div className="absolute bottom-2 right-2 text-gray-400 transition-all duration-300 group-hover/legacy:text-gray-500 group-hover/legacy:scale-110">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
}
