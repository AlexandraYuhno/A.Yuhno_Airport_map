import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

const apiKeyWeather = import.meta.env.VITE_API_KEY_WEATHER;

const apiClientWeather: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_WEATHER_URL,
  headers: { 'X-Api-Key': apiKeyWeather },
});

export const fetchWeather = (latitude: number, longitude: number) => {
  const queryParams = qs.stringify({
    units: 'metric',
    apikey: apiKeyWeather,
    lat: latitude,
    lon: longitude,
  });

  return apiClientWeather
    .get(`?${queryParams}`)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching weather data:", error));
};

export default apiClientWeather;
