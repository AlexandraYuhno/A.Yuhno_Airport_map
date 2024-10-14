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
    .get(`https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&units=metric&apikey=${apiKeyWeather}`)
    .then((response) => response.data?.timelines?.minutely?.map((item: any) => item.values))
    .catch((error) => console.error("Error fetching weather data:", error));
};

export default apiClientWeather;
