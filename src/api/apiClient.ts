import axios, { AxiosInstance } from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const apiKeyWeather = import.meta.env.VITE_API_KEY_WEATHER;

const getWeatherUrl = (latitude: number, longitude: number) => 
  `${import.meta.env.VITE_API_WEATHER_URL}=${latitude},${longitude}&units=metric&apikey=${apiKeyWeather}`;

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.api-ninjas.com/v1",
  headers: {
    "X-Api-Key": apiKey,
  },
});

export const fetchAirportData = (icao: string) => {
  return apiClient
    .get(`/airports?icao=${icao}`)
    .then((response) => response.data[0]);
};

export const fetchWeather = (latitude: number, longitude: number) => {
  return axios
    .get(getWeatherUrl(latitude, longitude))
    .then((response) => {
      const res = response.data;
      return res;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};

export default apiClient;
