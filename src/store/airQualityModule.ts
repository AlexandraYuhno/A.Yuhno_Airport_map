import { defineStore } from 'pinia';
import axios, { AxiosInstance } from 'axios';

import { AirportAirQuality, AirQualityState } from './types';

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

const getAirQualityUrl = (latitude: number, longitude: number) =>
  `/airquality?lat=${latitude}&lon=${longitude}`;

export const useAirQualityStore = defineStore('airQualityStore', {
  state: (): AirQualityState => ({
    airQuality: {} as Record<string, AirportAirQuality>,
    error: null,
    isLoading: false
    }),

  actions: {
    async fetchAirQualityData(latitude: number, longitude: number, icao: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiClient.get(getAirQualityUrl(latitude, longitude));
          this.airQuality[icao] = response.data;
      } catch (error) {
        this.error = `Failed to fetch air quality data for ${icao}`;
        console.error(this.error, error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchAirQualityDataForAirports(airports: { latitude: number; longitude: number; icao: string }[]) {
      const airQualityPromises = airports.map((airport) =>
        this.fetchAirQualityData(airport.latitude, airport.longitude, airport.icao)
      );
      await Promise.all(airQualityPromises);
    },
  },
});
