import { AirportState } from "@/store/types";

export default {
    state: (): AirportState => ({
      airports: [],
      isLoading: false,
      error: null,
    }),
  };
