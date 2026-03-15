"use client";

import { usePlan } from "@/hooks/usePlanState";
import type { TripNode } from "@/types/plan";

interface NodePopoverProps {
  node: TripNode;
  onClose: () => void;
}

// Mock positions matching PlanNodeMarker
const MOCK_POSITIONS = [
  { top: "25%", left: "30%" },
  { top: "45%", left: "55%" },
  { top: "60%", left: "35%" },
  { top: "30%", left: "65%" },
  { top: "70%", left: "60%" },
];

export function NodePopover({ node, onClose }: NodePopoverProps) {
  const { actions } = usePlan();
  const posIndex = (node.order - 1) % MOCK_POSITIONS.length;
  const position = MOCK_POSITIONS[posIndex];

  const handleDetail = () => {
    actions.setPanelMode("detail");
  };

  const handleRemove = () => {
    actions.removeNode(node.id);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-20"
        onClick={onClose}
      />

      {/* Popover */}
      <div
        className="absolute z-30 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -120%)",
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary-600">
                {node.order}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {node.place.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {node.place.category} · {node.place.address.split(" ").slice(0, 2).join(" ")}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-2 flex gap-2">
          <button
            onClick={handleDetail}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            상세 편집
          </button>
          <button
            onClick={handleRemove}
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            삭제
          </button>
        </div>

        {/* Arrow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45" />
      </div>
    </>
  );
}
