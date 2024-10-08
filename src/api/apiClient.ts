import axios, { AxiosInstance } from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

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

export default apiClient;
