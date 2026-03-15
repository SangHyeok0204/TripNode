"use client";

import { usePlan } from "@/hooks/usePlanState";

// Mock positions matching PlanNodeMarker
const MOCK_POSITIONS = [
  { top: 25, left: 30 },
  { top: 45, left: 55 },
  { top: 60, left: 35 },
  { top: 30, left: 65 },
  { top: 70, left: 60 },
];

export function RouteOverlay() {
  const { state } = usePlan();

  if (state.nodes.length < 2) return null;

  // Generate path data for routes
  const paths: Array<{ from: { top: number; left: number }; to: { top: number; left: number }; index: number }> = [];

  for (let i = 0; i < state.nodes.length - 1; i++) {
    const fromIndex = i % MOCK_POSITIONS.length;
    const toIndex = (i + 1) % MOCK_POSITIONS.length;
    paths.push({
      from: MOCK_POSITIONS[fromIndex],
      to: MOCK_POSITIONS[toIndex],
      index: i,
    });
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="var(--primary-400)"
          />
        </marker>
      </defs>

      {paths.map((path, i) => {
        // Calculate control point for curved line
        const midX = (path.from.left + path.to.left) / 2;
        const midY = (path.from.top + path.to.top) / 2;

        // Offset control point perpendicular to line
        const dx = path.to.left - path.from.left;
        const dy = path.to.top - path.from.top;
        const len = Math.sqrt(dx * dx + dy * dy);
        const offsetX = -dy / len * 5;
        const offsetY = dx / len * 5;

        const ctrlX = midX + offsetX;
        const ctrlY = midY + offsetY;

        return (
          <g key={i}>
            {/* Shadow */}
            <path
              d={`M ${path.from.left}% ${path.from.top}% Q ${ctrlX}% ${ctrlY}%, ${path.to.left}% ${path.to.top}%`}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Main path */}
            <path
              d={`M ${path.from.left}% ${path.from.top}% Q ${ctrlX}% ${ctrlY}%, ${path.to.left}% ${path.to.top}%`}
              stroke="var(--primary-400)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              fill="none"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
              className="animate-dash"
            />
          </g>
        );
      })}

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -28;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>
    </svg>
  );
}
