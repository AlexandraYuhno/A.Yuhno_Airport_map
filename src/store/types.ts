export interface Airport {
  icao: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface AirportState {
  airports: Airport[];
  isLoading: boolean;
  error: string | null;
}
