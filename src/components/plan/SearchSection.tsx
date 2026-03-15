"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { usePlan } from "@/hooks/usePlanState";
import type { Place } from "@/types/plan";

// Mock search results for demo
const MOCK_PLACES: Place[] = [
  {
    placeId: "place_1",
    name: "경복궁",
    category: "역사 유적",
    location: { lat: 37.5796, lng: 126.977 },
    address: "서울 종로구 사직로 161",
  },
  {
    placeId: "place_2",
    name: "북촌 한옥마을",
    category: "관광 명소",
    location: { lat: 37.5826, lng: 126.9831 },
    address: "서울 종로구 계동길 37",
  },
  {
    placeId: "place_3",
    name: "익선동",
    category: "카페 거리",
    location: { lat: 37.5735, lng: 126.9881 },
    address: "서울 종로구 익선동",
  },
  {
    placeId: "place_4",
    name: "광장시장",
    category: "전통 시장",
    location: { lat: 37.57, lng: 126.999 },
    address: "서울 종로구 창경궁로 88",
  },
  {
    placeId: "place_5",
    name: "남산타워",
    category: "전망대",
    location: { lat: 37.5512, lng: 126.9882 },
    address: "서울 용산구 남산공원길 105",
  },
];

export function SearchSection() {
  const { state, actions } = usePlan();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce query input
  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  }, []);

  // Compute results from debounced query
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }
    return MOCK_PLACES.filter((p) =>
      p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  const handleSelect = (place: Place) => {
    // Check if already added
    const exists = state.nodes.some((n) => n.place.placeId === place.placeId);
    if (exists) {
      // Focus on existing node
      const node = state.nodes.find((n) => n.place.placeId === place.placeId);
      if (node) {
        actions.selectNode(node.id);
      }
    } else {
      actions.addNode(place);
    }

    setQuery("");
    setDebouncedQuery("");
    inputRef.current?.blur();
  };

  const handleClear = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, []);

  const showResults = isFocused && query.trim().length > 0;

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="장소 검색..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <ul>
              {results.map((place) => {
                const isAdded = state.nodes.some(
                  (n) => n.place.placeId === place.placeId
                );
                return (
                  <li key={place.placeId}>
                    <button
                      onClick={() => handleSelect(place)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-primary-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 truncate">
                            {place.name}
                          </span>
                          {isAdded && (
                            <span className="flex-shrink-0 text-xs text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded">
                              추가됨
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {place.category} · {place.address}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <p className="text-sm">&quot;{query}&quot;에 대한 결과가 없습니다</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
