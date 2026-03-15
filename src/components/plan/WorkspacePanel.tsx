"use client";

import { usePlan } from "@/hooks/usePlanState";
import { SearchSection } from "./SearchSection";
import { NodeList } from "./NodeList";
import { NodeDetail } from "./NodeDetail";

export function WorkspacePanel() {
  const { state, actions } = usePlan();

  return (
    <div className="h-full flex flex-col">
      {/* Search Section - Always visible */}
      <div className="flex-shrink-0 p-4 border-b border-gray-100">
        <SearchSection />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {state.panelMode === "detail" && state.selectedNodeId ? (
          <NodeDetail
            node={state.nodes.find((n) => n.id === state.selectedNodeId)!}
            onBack={() => actions.setPanelMode("list")}
          />
        ) : (
          <NodeList />
        )}
      </div>

      {/* Footer - Summary & Actions */}
      {state.nodes.length > 0 && (
        <PanelFooter />
      )}
    </div>
  );
}

function PanelFooter() {
  const { state } = usePlan();

  // Mock calculations
  const totalMinutes = state.nodes.length > 1 ? (state.nodes.length - 1) * 15 : 0;
  const stayTime = state.nodes.reduce((acc, n) => acc + (n.stayDuration || 60), 0);
  const totalTime = totalMinutes + stayTime;

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}분`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}시간 ${mins}분` : `${hours}시간`;
  };

  return (
    <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{state.nodes.length}개</span> 장소
        </div>
        <div className="text-sm text-gray-600">
          예상 <span className="font-medium text-gray-900">{formatTime(totalTime)}</span>
        </div>
      </div>

      {/* Recommendation button - shows when 2+ nodes */}
      {state.nodes.length >= 2 && (
        <button className="w-full py-2.5 px-4 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          주변에서 갈 만한 곳 찾기
        </button>
      )}
    </div>
  );
}
