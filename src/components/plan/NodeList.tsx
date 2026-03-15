"use client";

import { usePlan } from "@/hooks/usePlanState";
import type { TripNode } from "@/types/plan";

export function NodeList() {
  const { state, actions } = usePlan();

  if (state.nodes.length === 0) {
    return <EmptyList />;
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">내 일정</h3>
        <span className="text-xs text-gray-500">{state.nodes.length}개 장소</span>
      </div>

      <ul className="space-y-2">
        {state.nodes.map((node, index) => (
          <NodeListItem
            key={node.id}
            node={node}
            isSelected={state.selectedNodeId === node.id}
            isLast={index === state.nodes.length - 1}
            onClick={() => actions.selectNode(node.id)}
            onRemove={() => actions.removeNode(node.id)}
          />
        ))}
      </ul>
    </div>
  );
}

interface NodeListItemProps {
  node: TripNode;
  isSelected: boolean;
  isLast: boolean;
  onClick: () => void;
  onRemove: () => void;
}

function NodeListItem({
  node,
  isSelected,
  isLast,
  onClick,
  onRemove,
}: NodeListItemProps) {
  return (
    <li className="relative">
      {/* Connection line to next node */}
      {!isLast && (
        <div className="absolute left-[18px] top-[44px] bottom-[-8px] w-0.5 bg-gray-200" />
      )}

      <div
        className={`
          relative flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all
          ${isSelected
            ? "bg-primary-50 ring-2 ring-primary-200"
            : "bg-white hover:bg-gray-50 border border-gray-100"
          }
        `}
        onClick={onClick}
      >
        {/* Order number */}
        <div
          className={`
            flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
            ${isSelected
              ? "bg-primary-500 text-white"
              : "bg-primary-100 text-primary-700"
            }
          `}
        >
          {node.order}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 truncate">
            {node.place.name}
          </div>
          <div className="text-sm text-gray-500 truncate">
            {node.place.category}
          </div>
          {node.stayDuration && (
            <div className="text-xs text-gray-400 mt-1">
              체류 {node.stayDuration}분
            </div>
          )}
        </div>

        {/* Remove button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Route info to next node */}
      {!isLast && (
        <div className="ml-[34px] py-2 flex items-center gap-2 text-xs text-gray-400">
          <span>↓</span>
          <span>도보 약 15분</span>
        </div>
      )}
    </li>
  );
}

function EmptyList() {
  return (
    <div className="p-6 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">
        아직 추가된 장소가 없어요
      </h3>
      <p className="text-sm text-gray-500">
        위 검색창에서 가고 싶은 장소를 검색해보세요
      </p>
    </div>
  );
}
