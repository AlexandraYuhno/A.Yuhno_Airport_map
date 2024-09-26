import { Airport, AirportState } from "@/store/types";

export default {
    setAirportRequest(state: AirportState) {
      state.isLoading = true;
      state.error = null;      
    },
    setAirportSuccess(state: AirportState, payload: Airport[]) {
      state.airports = payload;
      state.isLoading = false;
    },
  
    setAirportError(state: AirportState, payload: string) {
      state.error = payload;
      state.isLoading = false;
    },
  };