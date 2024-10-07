import axios, { AxiosInstance } from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

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
  }
);

export const fetchAirportData = (icao: string) => {
  return apiClient
    .get(`/airports?icao=${icao}`)
    .then(response => response.data[0]);
};

export const fetchWeather = (station_id: string) => {
  const url = `https://api.aviationapi.com/v1/weather/metar?apt=${station_id}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};

export default apiClient;
