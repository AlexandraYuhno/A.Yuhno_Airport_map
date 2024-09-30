export interface AirQualityData {
  CO: { aqi: number; concentration: number };
  NO2: { aqi: number; concentration: number };
  O3: { aqi: number; concentration: number };
  SO2: { aqi: number; concentration: number };
}

export interface Airport {
  icao: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface AirportState {
  airports: Airport[];
  airQualityData?: Record<string, AirQualityData>; 
  isLoading: boolean;
  error: string | null;
}
