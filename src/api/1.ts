import axios, { AxiosInstance } from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

const apiClient: AxiosInstance = axios.create({
  baseURL: '/api-ninjas',
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

export const fetchAirportData = (icao: string) => {
  return apiClient
    .get(`/airports?icao=${icao}`)
    .then(response => response.data[0]);
};

export const fetchWeather = (station_id: string) => {
  return axios
    .get(`/aviation/v1/weather/metar?apt=${station_id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};

export default apiClient;
