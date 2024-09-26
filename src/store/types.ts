
export interface Airport {
    name: string;
    icao: string;
    lat: number;
    lon: number;
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
  