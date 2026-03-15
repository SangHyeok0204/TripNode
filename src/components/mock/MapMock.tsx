import { NodeMarker } from "./NodeMarker";
import { RecommendSpot } from "./RecommendSpot";
import { GenerateButton } from "./GenerateButton";

interface MapMockProps {
  className?: string;
  showNodes?: boolean;
  showSpots?: boolean;
  showButton?: boolean;
  showRoutes?: boolean;
  showPanel?: boolean;
}

export function MapMock({
  className = "",
  showNodes = true,
  showSpots = true,
  showButton = true,
  showRoutes = true,
  showPanel = true,
}: MapMockProps) {
  return (
    <div
      className={`
        relative w-full h-full min-h-[400px]
        bg-gradient-to-br from-primary-50 via-gray-100 to-primary-100
        rounded-2xl overflow-hidden
        ${className}
      `}
    >
      {/* Grid pattern for map feel */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--primary-200) 1px, transparent 1px),
            linear-gradient(to bottom, var(--primary-200) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Fake map areas */}
      <div className="absolute top-[15%] left-[10%] w-32 h-24 bg-primary-200/40 rounded-lg" />
      <div className="absolute top-[40%] right-[15%] w-40 h-28 bg-primary-200/40 rounded-lg" />
      <div className="absolute bottom-[20%] left-[25%] w-36 h-20 bg-primary-200/40 rounded-lg" />

      {/* Routes - SVG lines connecting nodes */}
      {showRoutes && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 group-hover/tripnode:opacity-100">
          {/* Route from node 1 to spot 1 */}
          <path
            d="M 25% 30% Q 35% 35%, 40% 25%"
            stroke="var(--primary-400)"
            strokeWidth="2"
            strokeDasharray="6 4"
            fill="none"
            className="opacity-60 transition-all duration-300 group-hover/tripnode:opacity-80 group-hover/tripnode:stroke-[var(--primary-500)]"
          />
          {/* Route from node 1 to spot 2 */}
          <path
            d="M 25% 30% Q 30% 45%, 35% 50%"
            stroke="var(--primary-400)"
            strokeWidth="2"
            strokeDasharray="6 4"
            fill="none"
            className="opacity-60 transition-all duration-300 group-hover/tripnode:opacity-80 group-hover/tripnode:stroke-[var(--primary-500)]"
          />
          {/* Route from node 2 to spot 3 */}
          <path
            d="M 65% 55% Q 55% 50%, 50% 40%"
            stroke="var(--primary-400)"
            strokeWidth="2"
            strokeDasharray="6 4"
            fill="none"
            className="opacity-60 transition-all duration-300 group-hover/tripnode:opacity-80 group-hover/tripnode:stroke-[var(--primary-500)]"
          />
        </svg>
      )}

      {/* Base Nodes - user placed */}
      {showNodes && (
        <>
          <div className="absolute top-[28%] left-[23%] transition-transform duration-300 group-hover/tripnode:scale-110">
            <NodeMarker label="1" size="lg" variant="selected" />
          </div>
          <div className="absolute top-[53%] left-[63%] transition-transform duration-300 delay-75 group-hover/tripnode:scale-110">
            <NodeMarker label="2" size="lg" />
          </div>
        </>
      )}

      {/* Recommend Spots - generated */}
      {showSpots && (
        <>
          <div className="absolute top-[22%] left-[38%] transition-transform duration-300 delay-100 group-hover/tripnode:scale-[1.12]">
            <RecommendSpot size="md" pulse />
          </div>
          <div className="absolute top-[48%] left-[33%] transition-transform duration-300 delay-150 group-hover/tripnode:scale-[1.12]">
            <RecommendSpot size="md" pulse />
          </div>
          <div className="absolute top-[38%] left-[48%] transition-transform duration-300 delay-200 group-hover/tripnode:scale-[1.12]">
            <RecommendSpot size="md" pulse />
          </div>
          <div className="absolute top-[62%] left-[45%] transition-transform duration-300 delay-[250ms] group-hover/tripnode:scale-[1.12]">
            <RecommendSpot size="sm" pulse />
          </div>
        </>
      )}

      {/* Generate Button */}
      {showButton && (
        <div className="absolute top-4 right-4 transition-transform duration-300 group-hover/tripnode:scale-105">
          <GenerateButton />
        </div>
      )}

      {/* Side Panel - itinerary summary */}
      {showPanel && (
        <div className="absolute right-4 top-16 bottom-4 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 hidden md:block">
          <div className="text-xs font-semibold text-gray-700 mb-2">
            오늘의 일정
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-primary-50 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">
                1
              </div>
              <div className="text-xs text-gray-700">출발지</div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-100">
              <div className="w-5 h-5 rounded-full bg-accent-red text-white text-xs flex items-center justify-center">
                +
              </div>
              <div className="text-xs text-gray-600">추천 장소</div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-primary-50 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">
                2
              </div>
              <div className="text-xs text-gray-700">목적지</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-500">예상 소요시간</div>
            <div className="text-sm font-semibold text-gray-800">약 4시간</div>
          </div>
        </div>
      )}
    </div>
  );
}
