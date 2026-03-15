"use client";

import { useState } from "react";
import { usePlan } from "@/hooks/usePlanState";
import type { TripNode } from "@/types/plan";

interface NodeDetailProps {
  node: TripNode;
  onBack: () => void;
}

export function NodeDetail({ node, onBack }: NodeDetailProps) {
  const { actions } = usePlan();
  const [stayDuration, setStayDuration] = useState(node.stayDuration || 60);
  const [memo, setMemo] = useState(node.memo || "");

  const handleSave = () => {
    actions.updateNode(node.id, {
      stayDuration,
      memo: memo.trim() || undefined,
    });
    onBack();
  };

  const handleRemove = () => {
    actions.removeNode(node.id);
    onBack();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <button
          onClick={onBack}
          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-sm font-medium text-gray-900">장소 상세</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Place info */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-primary-600">
              {node.order}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{node.place.name}</h3>
            <p className="text-sm text-gray-500">{node.place.category}</p>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            위치
          </label>
          <p className="text-sm text-gray-700">{node.place.address}</p>
        </div>

        {/* Stay duration */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            예상 체류 시간
          </label>
          <div className="flex gap-2">
            {[30, 60, 90, 120].map((min) => (
              <button
                key={min}
                onClick={() => setStayDuration(min)}
                className={`
                  flex-1 py-2 px-3 text-sm rounded-lg transition-colors
                  ${stayDuration === min
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {min < 60 ? `${min}분` : `${min / 60}시간`}
              </button>
            ))}
          </div>
        </div>

        {/* Memo */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            메모 (선택)
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="이 장소에 대한 메모를 남겨보세요"
            rows={3}
            className="w-full px-3 py-2 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all outline-none resize-none"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4 space-y-2">
        <button
          onClick={handleSave}
          className="w-full py-2.5 px-4 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
        >
          저장
        </button>
        <button
          onClick={handleRemove}
          className="w-full py-2.5 px-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          일정에서 삭제
        </button>
      </div>
    </div>
  );
}
