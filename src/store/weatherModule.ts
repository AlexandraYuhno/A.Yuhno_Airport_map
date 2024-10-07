import { defineStore } from "pinia";

import { fetchWeather } from "../api/apiClient";

import { Airport, WeatherState } from "./types";
import { Weather } from "@/store/types";

export const useWeatherStore = defineStore("weatherStore", {
  state: (): WeatherState => ({
    weather: {} as Weather,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchWeather(station_id: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchWeather(station_id);
        this.weather = response;
      } catch (error) {
        this.error = `Failed to fetch weather data for ${station_id}`;
        console.error(this.error, error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchWeatherForAirports(airports: Airport[]) {
      this.isLoading = true; 
      this.error = null; 
      try {
        const weatherPromises = airports.map(airport => this.fetchWeather(airport.icao)); // Используем this, так как обращаемся к текущему экземпляру
        await Promise.all(weatherPromises); 
      } catch (error) {
        this.error = `Failed to fetch weather data for multiple airports.`;
        console.error(this.error, error);
      } finally {
        this.isLoading = false;
      }
    },
  }
});
