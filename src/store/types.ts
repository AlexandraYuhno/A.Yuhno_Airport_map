export interface AirportAirQuality {
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
  isLoading: boolean;
  error: string | null;
}
 
export interface AirQualityState {
  airQualityData: Record<string, AirportAirQuality>;
  error: string | null;
  isLoading: boolean;
}
