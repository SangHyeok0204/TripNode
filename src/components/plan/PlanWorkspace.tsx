"use client";

import { PlanProvider } from "@/hooks/usePlanState";
import { PlanHeader } from "./PlanHeader";
import { MapCanvas } from "./MapCanvas";
import { WorkspacePanel } from "./WorkspacePanel";

export function PlanWorkspace() {
  return (
    <PlanProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <PlanHeader />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Side Panel - Desktop */}
          <div className="hidden md:block w-80 lg:w-96 flex-shrink-0 border-r border-gray-200 bg-white overflow-hidden">
            <WorkspacePanel />
          </div>

          {/* Map Canvas */}
          <div className="flex-1 relative">
            <MapCanvas />

            {/* Mobile: Bottom summary bar */}
            <MobileBottomBar />
          </div>
        </div>

        {/* Mobile: Bottom Sheet (future) */}
      </div>
    </PlanProvider>
  );
}

function MobileBottomBar() {
  return (
    <div className="md:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 safe-area-bottom">
      <button className="w-full flex items-center justify-between text-left">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">
            0개 장소
          </span>
          <span className="text-sm text-gray-500">·</span>
          <span className="text-sm text-gray-500">탭하여 일정 보기</span>
        </div>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}
