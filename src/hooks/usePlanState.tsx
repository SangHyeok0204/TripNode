"use client";

import React, { useReducer, useCallback, createContext, useContext } from "react";
import type {
  PlanState,
  PlanAction,
  Place,
  TripNode,
  PanelMode,
  TransportMode,
  LatLng,
} from "@/types/plan";

// Default center: Seoul City Hall
const DEFAULT_CENTER: LatLng = { lat: 37.5665, lng: 126.978 };
const DEFAULT_ZOOM = 14;

const initialState: PlanState = {
  tripId: null,
  tripName: "새 여행 일정",

  nodes: [],
  selectedNodeId: null,

  panelMode: "search",
  isPanelOpen: true,

  searchQuery: "",
  searchResults: [],
  isSearching: false,

  routes: [],
  transportMode: "walking",

  recommendations: [],
  isRecommendationVisible: false,

  mapCenter: DEFAULT_CENTER,
  mapZoom: DEFAULT_ZOOM,
};

function generateId(): string {
  return `node_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function planReducer(state: PlanState, action: PlanAction): PlanState {
  switch (action.type) {
    case "SET_TRIP_NAME":
      return { ...state, tripName: action.payload };

    case "ADD_NODE": {
      const newNode: TripNode = {
        id: generateId(),
        order: state.nodes.length + 1,
        place: action.payload,
      };
      return {
        ...state,
        nodes: [...state.nodes, newNode],
        panelMode: "list",
        mapCenter: action.payload.location,
      };
    }

    case "REMOVE_NODE": {
      const filtered = state.nodes.filter((n) => n.id !== action.payload);
      const reordered = filtered.map((n, i) => ({ ...n, order: i + 1 }));
      return {
        ...state,
        nodes: reordered,
        selectedNodeId:
          state.selectedNodeId === action.payload
            ? null
            : state.selectedNodeId,
      };
    }

    case "SELECT_NODE":
      return {
        ...state,
        selectedNodeId: action.payload,
        panelMode: action.payload ? "detail" : "list",
      };

    case "REORDER_NODES": {
      const reordered = action.payload.map((n, i) => ({ ...n, order: i + 1 }));
      return { ...state, nodes: reordered };
    }

    case "UPDATE_NODE": {
      const updated = state.nodes.map((n) =>
        n.id === action.payload.id ? { ...n, ...action.payload.updates } : n
      );
      return { ...state, nodes: updated };
    }

    case "SET_PANEL_MODE":
      return { ...state, panelMode: action.payload };

    case "TOGGLE_PANEL":
      return {
        ...state,
        isPanelOpen: action.payload ?? !state.isPanelOpen,
      };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload, isSearching: false };

    case "SET_SEARCHING":
      return { ...state, isSearching: action.payload };

    case "SET_ROUTES":
      return { ...state, routes: action.payload };

    case "SET_TRANSPORT_MODE":
      return { ...state, transportMode: action.payload };

    case "SET_RECOMMENDATIONS":
      return { ...state, recommendations: action.payload };

    case "TOGGLE_RECOMMENDATIONS":
      return {
        ...state,
        isRecommendationVisible:
          action.payload ?? !state.isRecommendationVisible,
      };

    case "SET_MAP_CENTER":
      return { ...state, mapCenter: action.payload };

    case "SET_MAP_ZOOM":
      return { ...state, mapZoom: action.payload };

    default:
      return state;
  }
}

// Hook return type
interface UsePlanStateReturn {
  state: PlanState;
  actions: {
    setTripName: (name: string) => void;
    addNode: (place: Place) => void;
    removeNode: (nodeId: string) => void;
    selectNode: (nodeId: string | null) => void;
    reorderNodes: (nodes: TripNode[]) => void;
    updateNode: (id: string, updates: Partial<TripNode>) => void;
    setPanelMode: (mode: PanelMode) => void;
    togglePanel: (open?: boolean) => void;
    setSearchQuery: (query: string) => void;
    setSearchResults: (results: Place[]) => void;
    setSearching: (searching: boolean) => void;
    setTransportMode: (mode: TransportMode) => void;
    toggleRecommendations: (visible?: boolean) => void;
    setMapCenter: (center: LatLng) => void;
    setMapZoom: (zoom: number) => void;
  };
}

export function usePlanState(): UsePlanStateReturn {
  const [state, dispatch] = useReducer(planReducer, initialState);

  const actions = {
    setTripName: useCallback(
      (name: string) => dispatch({ type: "SET_TRIP_NAME", payload: name }),
      []
    ),
    addNode: useCallback(
      (place: Place) => dispatch({ type: "ADD_NODE", payload: place }),
      []
    ),
    removeNode: useCallback(
      (nodeId: string) => dispatch({ type: "REMOVE_NODE", payload: nodeId }),
      []
    ),
    selectNode: useCallback(
      (nodeId: string | null) =>
        dispatch({ type: "SELECT_NODE", payload: nodeId }),
      []
    ),
    reorderNodes: useCallback(
      (nodes: TripNode[]) =>
        dispatch({ type: "REORDER_NODES", payload: nodes }),
      []
    ),
    updateNode: useCallback(
      (id: string, updates: Partial<TripNode>) =>
        dispatch({ type: "UPDATE_NODE", payload: { id, updates } }),
      []
    ),
    setPanelMode: useCallback(
      (mode: PanelMode) => dispatch({ type: "SET_PANEL_MODE", payload: mode }),
      []
    ),
    togglePanel: useCallback(
      (open?: boolean) => dispatch({ type: "TOGGLE_PANEL", payload: open }),
      []
    ),
    setSearchQuery: useCallback(
      (query: string) =>
        dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
      []
    ),
    setSearchResults: useCallback(
      (results: Place[]) =>
        dispatch({ type: "SET_SEARCH_RESULTS", payload: results }),
      []
    ),
    setSearching: useCallback(
      (searching: boolean) =>
        dispatch({ type: "SET_SEARCHING", payload: searching }),
      []
    ),
    setTransportMode: useCallback(
      (mode: TransportMode) =>
        dispatch({ type: "SET_TRANSPORT_MODE", payload: mode }),
      []
    ),
    toggleRecommendations: useCallback(
      (visible?: boolean) =>
        dispatch({ type: "TOGGLE_RECOMMENDATIONS", payload: visible }),
      []
    ),
    setMapCenter: useCallback(
      (center: LatLng) => dispatch({ type: "SET_MAP_CENTER", payload: center }),
      []
    ),
    setMapZoom: useCallback(
      (zoom: number) => dispatch({ type: "SET_MAP_ZOOM", payload: zoom }),
      []
    ),
  };

  return { state, actions };
}

// Context for sharing state across components
type PlanContextValue = UsePlanStateReturn;

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const planState = usePlanState();

  return (
    <PlanContext.Provider value={planState}>{children}</PlanContext.Provider>
  );
}

export function usePlan(): PlanContextValue {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
