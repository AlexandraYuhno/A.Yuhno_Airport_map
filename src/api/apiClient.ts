import axios, { AxiosInstance } from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiKeyWeather = import.meta.env.VITE_API_KEY_WEATHER;

const getWeatherUrl = (latitude: number, longitude: number) =>
  `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&units=metric&apikey=${apiKeyWeather}`;

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.api-ninjas.com/v1",
  headers: {
    "X-Api-Key": apiKey,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
  }
);

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
      console.log("res", res);

      return res;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};

export default apiClient;
