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

export interface Compound {
  aqi: number;
  concentration: number;
};

export type AirportAirQuality = Record<string, Compound>;

export interface AirQualityState {
  airQuality: Record<string, AirportAirQuality>;
  error: string | null;
  isLoading: boolean;
}
