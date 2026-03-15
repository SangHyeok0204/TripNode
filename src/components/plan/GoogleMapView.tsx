"use client";

import { useCallback } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { usePlan } from "@/hooks/usePlanState";
import type { LatLng } from "@/types/plan";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "";
const DEFAULT_ZOOM = 15;

export function GoogleMapView() {
  const { location, isLoading, isUsingDefault, error, retry } = useCurrentLocation();
  const { state, actions } = usePlan();

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      // Future: Add node on map click
      if (event.latLng) {
        const clickedLocation: LatLng = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        actions.setMapCenter(clickedLocation);
      }
    },
    [actions]
  );

  const handleCenterChanged = useCallback(
    (map: google.maps.Map) => {
      const center = map.getCenter();
      if (center) {
        actions.setMapCenter({
          lat: center.lat(),
          lng: center.lng(),
        });
      }
    },
    [actions]
  );

  const handleZoomChanged = useCallback(
    (map: google.maps.Map) => {
      const zoom = map.getZoom();
      if (zoom !== undefined) {
        actions.setMapZoom(zoom);
      }
    },
    [actions]
  );

  // Show error state if no API key
  if (!API_KEY) {
    return <NoApiKeyMessage />;
  }

  return (
    <div className="relative w-full h-full">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={location}
          defaultZoom={DEFAULT_ZOOM}
          gestureHandling="greedy"
          disableDefaultUI={true}
          mapId={MAP_ID || undefined}
          onClick={handleMapClick}
          onCenterChanged={(event) => handleCenterChanged(event.map)}
          onZoomChanged={(event) => handleZoomChanged(event.map)}
          className="w-full h-full"
        >
          {/* Current location marker */}
          <CurrentLocationMarker position={location} />
        </Map>
      </APIProvider>

      {/* Loading overlay */}
      {isLoading && <LoadingOverlay />}

      {/* Location status badge */}
      {!isLoading && isUsingDefault && (
        <LocationStatusBadge error={error} onRetry={retry} />
      )}

      {/* Map controls */}
      <MapControls onLocate={retry} />

      {/* Empty state */}
      {state.nodes.length === 0 && !isLoading && <EmptyStateOverlay />}
    </div>
  );
}

// Current location marker (blue dot)
function CurrentLocationMarker({ position }: { position: LatLng }) {
  return (
    <Marker
      position={position}
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#3B82F6",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
      }}
    />
  );
}

// Loading overlay
function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-600">현재 위치 확인 중...</p>
      </div>
    </div>
  );
}

// Location status badge (when using default location)
function LocationStatusBadge({
  error,
  onRetry,
}: {
  error: string | null;
  onRetry: () => void;
}) {
  const getMessage = () => {
    switch (error) {
      case "PERMISSION_DENIED":
        return "위치 권한이 거부되었습니다";
      case "POSITION_UNAVAILABLE":
        return "위치를 확인할 수 없습니다";
      case "TIMEOUT":
        return "위치 확인 시간이 초과되었습니다";
      case "NOT_SUPPORTED":
        return "위치 서비스를 지원하지 않습니다";
      default:
        return "기본 위치로 시작합니다";
    }
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
      <div className="bg-white rounded-full shadow-md px-4 py-2 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="text-sm text-gray-700">{getMessage()}</span>
        <button
          onClick={onRetry}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          재시도
        </button>
      </div>
    </div>
  );
}

// Map controls (zoom, locate)
function MapControls({ onLocate }: { onLocate: () => void }) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
      {/* Zoom controls */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors border-b border-gray-200">
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
              d="M12 6v12M6 12h12"
            />
          </svg>
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
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
              d="M20 12H4"
            />
          </svg>
        </button>
      </div>

      {/* Current location button */}
      <button
        onClick={onLocate}
        className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
        title="현재 위치로 이동"
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
            d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06z"
          />
        </svg>
      </button>
    </div>
  );
}

// Empty state overlay
function EmptyStateOverlay() {
  return (
    <div className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-4 max-w-sm text-center">
        <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
          <svg
            className="w-5 h-5 text-primary-500"
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
          <span className="font-medium">첫 장소를 추가해보세요</span>
        </div>
        <p className="text-sm text-gray-500">
          왼쪽 패널에서 검색하거나, 지도를 탭해서 장소를 추가할 수 있어요
        </p>
      </div>
    </div>
  );
}

// No API key message
function NoApiKeyMessage() {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-2xl flex items-center justify-center">
          <svg
            className="w-8 h-8 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Google Maps API 키가 필요합니다
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">
            .env.local
          </code>{" "}
          파일에 API 키를 설정해주세요.
        </p>
        <code className="block bg-gray-800 text-gray-100 text-xs p-3 rounded-lg text-left">
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
        </code>
      </div>
    </div>
  );
}
