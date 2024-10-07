import { defineStore } from 'pinia';

import { fetchAirportData } from '../api/apiClient';

import { useAirQualityStore } from './airQualityModule';
import { Airport, AirportState } from '@/store/types';
import { useWeatherStore } from './weatherModule';

export const useAirportStore = defineStore('airportStore', {
  state: (): AirportState => ({
    airports: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchAirportData(icaoCodes: string[]) {
      const airQualityStore = useAirQualityStore();
      const weatherStore = useWeatherStore();
      this.isLoading = true;
      this.error = null;

      try {
        const airportPromises = icaoCodes.map(icao => fetchAirportData(icao));
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

        await airQualityStore.fetchAirQualityDataForAirports(this.airports);
        await weatherStore.fetchWeatherForAirports(this.airports);
      } catch (error: unknown) {
        this.error = (error as Error).message || 'Failed to fetch airport data';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
