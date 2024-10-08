import { defineStore } from "pinia";

import { fetchWeather } from "../api/apiClientWeather";

import { Airport, WeatherState, Weather} from "./types";

export const useWeatherStore = defineStore("weatherStore", {
  state: (): WeatherState => ({
    weather: {} as Weather,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchWeather(latitude: number, longitude: number) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchWeather(latitude, longitude);
        this.weather = response;
      } catch (error) {
        this.error = `Failed to fetch weather data for ${latitude}, ${longitude}`;
        console.error(this.error, error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchWeatherForAirports(airports: Airport[]) {
      this.isLoading = true;
      this.error = null;
      try {
        const weatherPromises = airports.map((airport) =>
          this.fetchWeather(airport.latitude, airport.longitude)
        );
        await Promise.all(weatherPromises);
      } catch (error) {
        this.error = `Failed to fetch weather data for multiple airports.`;
        console.error(this.error, error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
