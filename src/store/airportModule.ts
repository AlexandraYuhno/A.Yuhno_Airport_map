import { defineStore } from 'pinia';
import axios, { AxiosInstance } from 'axios';

import { useAirQualityStore } from './airQualityModule';
import { Airport, AirportState } from '@/store/types';

const apiKey = '2BejQXyKdb4YRhft3QrXCg==fMdl33Om85YYq4II';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: {
    'X-Api-Key': apiKey,
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const useAirportStore = defineStore('airportStore', {
  state: (): AirportState => ({
    airports: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchAirportData(icaoCodes: string[]) {
      const airQualityStore = useAirQualityStore();
      this.isLoading = true;
      this.error = null;

      try {
        const airportPromises = icaoCodes.map(icao =>
          apiClient
            .get(`/airports?icao=${icao}`)
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

        await airQualityStore.fetchAirQualityDataForAirports(this.airports);
      } catch (error: unknown) {
        this.error = (error as Error).message || 'Failed to fetch airport data';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
