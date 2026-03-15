"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/hooks/usePlanState";

export function PlanHeader() {
  const { state, actions } = usePlan();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(state.tripName);

  const handleSave = () => {
    if (editValue.trim()) {
      actions.setTripName(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(state.tripName);
      setIsEditing(false);
    }
  };

  return (
    <header className="h-14 flex-shrink-0 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
          <span className="font-bold text-lg hidden sm:block">TripNode</span>
        </Link>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-gray-200" />

        {/* Trip Name */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <button
              onClick={() => {
                setEditValue(state.tripName);
                setIsEditing(true);
              }}
              className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors group"
            >
              <span className="max-w-[150px] sm:max-w-[200px] truncate">
                {state.tripName}
              </span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
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
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Node count badge */}
        {state.nodes.length > 0 && (
          <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
            {state.nodes.length}개 장소
          </span>
        )}

        {/* Save button */}
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
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
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          <span className="hidden sm:inline">저장</span>
        </button>
      </div>
    </header>
  );
}
