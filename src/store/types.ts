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
}

export type AirportAirQuality = Record<string, Compound>;

export interface AirQualityState {
  airQuality: Record<string, AirportAirQuality>;
  error: string | null;
  isLoading: boolean;
}

export type Weather = {
  cloudBase: number;
  humidity: number;
  pressureSurfaceLevel: number;
  temperature: number;
  visibility: number;
  windSpeed: number;
}

export interface WeatherState {
  weather: Weather;
  error: string | null;
  isLoading: boolean;
}
