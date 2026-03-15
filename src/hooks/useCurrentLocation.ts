"use client";

import { useState, useEffect, useCallback } from "react";
import type { LatLng } from "@/types/plan";

// Default location: Seoul City Hall
const DEFAULT_LOCATION: LatLng = {
  lat: 37.5665,
  lng: 126.978,
};

type GeolocationErrorType =
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "NOT_SUPPORTED"
  | null;

interface UseCurrentLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface UseCurrentLocationReturn {
  location: LatLng;
  error: GeolocationErrorType;
  isLoading: boolean;
  isUsingDefault: boolean;
  retry: () => void;
}

export function useCurrentLocation(
  options: UseCurrentLocationOptions = {}
): UseCurrentLocationReturn {
  const { enableHighAccuracy = true, timeout = 10000, maximumAge = 0 } = options;

  const [location, setLocation] = useState<LatLng>(DEFAULT_LOCATION);
  const [error, setError] = useState<GeolocationErrorType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingDefault, setIsUsingDefault] = useState(true);

  const getCurrentPosition = useCallback(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError("NOT_SUPPORTED");
      setIsLoading(false);
      setIsUsingDefault(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
        setIsLoading(false);
        setIsUsingDefault(false);
      },
      // Error callback
      (err) => {
        let errorType: GeolocationErrorType;

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorType = "PERMISSION_DENIED";
            break;
          case err.POSITION_UNAVAILABLE:
            errorType = "POSITION_UNAVAILABLE";
            break;
          case err.TIMEOUT:
            errorType = "TIMEOUT";
            break;
          default:
            errorType = "POSITION_UNAVAILABLE";
        }

        setError(errorType);
        setIsLoading(false);
        setIsUsingDefault(true);
        // Keep using default location on error
      },
      // Options
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      }
    );
  }, [enableHighAccuracy, timeout, maximumAge]);

  // Get location on mount
  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  return {
    location,
    error,
    isLoading,
    isUsingDefault,
    retry: getCurrentPosition,
  };
}
