import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

const apiKeyWeather = import.meta.env.VITE_API_KEY_WEATHER;

const apiClientWeather: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_WEATHER_URL,
  headers: { 'X-Api-Key': apiKeyWeather },
});

export const fetchWeather = (latitude: number, longitude: number) => {
  return apiClientWeather
    .get(`https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&units=metric&apikey=${apiKeyWeather}`)
    .then((response) => {
      const weatherData = response.data?.timelines?.minutely?.map((item: any) => item.values);
      return weatherData; 
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error; 
    });
};

export default apiClientWeather;
