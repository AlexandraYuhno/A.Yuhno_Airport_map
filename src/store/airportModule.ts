import { defineStore } from 'pinia';
import axios from 'axios';

import { Airport, AirportState } from '@/store/types';

const apiKey = '2BejQXyKdb4YRhft3QrXCg==fMdl33Om85YYq4II';

export const useAirportStore = defineStore('airportStore', {
  state: (): AirportState => ({
    airports: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchAirportData(icaoCodes: string[]) {
      this.isLoading = true;
      this.error = null;

      try {
        const airportPromises = icaoCodes.map(icao =>
          axios
            .get(`https://api.api-ninjas.com/v1/airports?icao=${icao}`, {
              headers: { 'X-Api-Key': apiKey },
            })
            .then(response => response.data[0])
        );
        const airportData: Airport[] = await Promise.all(airportPromises)
          .then((data) =>
            data
              .filter(Boolean)
              .map((airport: Airport) => ({
                icao: airport.icao,
                name: airport.name,
                latitude: airport.latitude,
                longitude: airport.longitude,
              }))
          );
        this.airports = airportData;
      } catch (error: unknown) {
        this.error = (error as Error).message || 'Failed to fetch airport data';
      } finally {
        this.isLoading = false;
      }
    }
  },
});
