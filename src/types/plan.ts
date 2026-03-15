// Coordinates
export interface LatLng {
  lat: number;
  lng: number;
}

// Place information (from search or map)
export interface Place {
  placeId: string;
  name: string;
  category: string;
  location: LatLng;
  address: string;
}

// User-placed node on the map
export interface TripNode {
  id: string;
  order: number;
  place: Place;
  stayDuration?: number; // in minutes
  memo?: string;
}

// Route between two nodes
export interface Route {
  fromNodeId: string;
  toNodeId: string;
  distance: number; // in meters
  duration: number; // in minutes
  mode: TransportMode;
}

export type TransportMode = "walking" | "transit" | "driving";

// Recommendation spot
export interface RecommendSpot {
  id: string;
  place: Place;
  reason?: string;
}

// Panel modes
export type PanelMode = "search" | "list" | "detail";

// Plan state
export interface PlanState {
  // Trip info
  tripId: string | null;
  tripName: string;

  // Nodes
  nodes: TripNode[];
  selectedNodeId: string | null;

  // UI state
  panelMode: PanelMode;
  isPanelOpen: boolean;

  // Search
  searchQuery: string;
  searchResults: Place[];
  isSearching: boolean;

  // Routes
  routes: Route[];
  transportMode: TransportMode;

  // Recommendations
  recommendations: RecommendSpot[];
  isRecommendationVisible: boolean;

  // Map
  mapCenter: LatLng;
  mapZoom: number;
}

// Plan actions
export type PlanAction =
  | { type: "SET_TRIP_NAME"; payload: string }
  | { type: "ADD_NODE"; payload: Place }
  | { type: "REMOVE_NODE"; payload: string }
  | { type: "SELECT_NODE"; payload: string | null }
  | { type: "REORDER_NODES"; payload: TripNode[] }
  | { type: "UPDATE_NODE"; payload: { id: string; updates: Partial<TripNode> } }
  | { type: "SET_PANEL_MODE"; payload: PanelMode }
  | { type: "TOGGLE_PANEL"; payload?: boolean }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SEARCH_RESULTS"; payload: Place[] }
  | { type: "SET_SEARCHING"; payload: boolean }
  | { type: "SET_ROUTES"; payload: Route[] }
  | { type: "SET_TRANSPORT_MODE"; payload: TransportMode }
  | { type: "SET_RECOMMENDATIONS"; payload: RecommendSpot[] }
  | { type: "TOGGLE_RECOMMENDATIONS"; payload?: boolean }
  | { type: "SET_MAP_CENTER"; payload: LatLng }
  | { type: "SET_MAP_ZOOM"; payload: number };
