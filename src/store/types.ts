export interface Airport {
    name: string;
    icao: string;
    latitude: number;
    longitude: number;
  }

  export interface AirportState {
    airports: Airport[];
    isLoading: boolean;
    error: string | null;
  }

  export const state = (): AirportState => ({
    airports: [],
    isLoading: false,
    error: null,
  });
  