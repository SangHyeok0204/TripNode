"use client";

import type { TripNode } from "@/types/plan";

interface PlanNodeMarkerProps {
  node: TripNode;
  isSelected: boolean;
  onClick: () => void;
}

// Mock positions based on node order
const MOCK_POSITIONS = [
  { top: "25%", left: "30%" },
  { top: "45%", left: "55%" },
  { top: "60%", left: "35%" },
  { top: "30%", left: "65%" },
  { top: "70%", left: "60%" },
];

export function PlanNodeMarker({ node, isSelected, onClick }: PlanNodeMarkerProps) {
  const posIndex = (node.order - 1) % MOCK_POSITIONS.length;
  const position = MOCK_POSITIONS[posIndex];

  return (
    <button
      onClick={onClick}
      className="absolute z-10 group"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Marker container */}
      <div
        className={`
          relative flex flex-col items-center transition-transform duration-200
          ${isSelected ? "scale-110" : "group-hover:scale-105"}
        `}
      >
        {/* Pin */}
        <div
          className={`
            relative w-10 h-10 rounded-full flex items-center justify-center
            shadow-lg transition-all duration-200
            ${isSelected
              ? "bg-primary-600 ring-4 ring-primary-200"
              : "bg-primary-500 group-hover:bg-primary-600"
            }
          `}
        >
          <span className="text-white font-bold text-sm">{node.order}</span>

          {/* Pin tail */}
          <div
            className={`
              absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0
              border-l-[6px] border-r-[6px] border-t-[8px]
              border-l-transparent border-r-transparent
              ${isSelected ? "border-t-primary-600" : "border-t-primary-500 group-hover:border-t-primary-600"}
              transition-colors duration-200
            `}
          />
        </div>

        {/* Label */}
        <div
          className={`
            mt-2 px-2 py-1 bg-white rounded-lg shadow-md text-xs font-medium
            whitespace-nowrap transition-all duration-200
            ${isSelected
              ? "text-primary-700 ring-2 ring-primary-200"
              : "text-gray-700 group-hover:text-primary-600"
            }
          `}
        >
          {node.place.name}
        </div>
      </div>
    </button>
  );
}
