import { defineStore } from 'pinia';
import { fetchWeather } from '../api/apiClientWeather';
import { Airport, WeatherState, Weather } from './types';

export const useWeatherStore = defineStore('weatherStore', {
  state: (): WeatherState => ({
    weather: {} as Record<string, Weather>,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchWeather(latitude: number, longitude: number) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetchWeather(latitude, longitude);
        const weatherData = response.timelines.minutely[0]?.values;
        
        if (!weatherData) throw new Error("Invalid weather data");

        const weather: Weather = {
          cloudBase: weatherData.cloudBase,
          humidity: weatherData.humidity,
          pressureSurfaceLevel: weatherData.pressureSurfaceLevel,
          temperature: weatherData.temperature,
          visibility: weatherData.visibility,
          windSpeed: weatherData.windSpeed,
        };

        this.weather[`${latitude},${longitude}`] = weather;
        return weather;
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
        const weatherPromises = airports.map(async (airport) => {
          const weatherData = await this.fetchWeather(airport.latitude, airport.longitude);
          if (weatherData) {
            this.weather[airport.icao] = weatherData;
          }
        });

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
