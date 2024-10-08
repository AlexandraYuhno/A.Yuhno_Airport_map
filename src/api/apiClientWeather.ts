import axios, { AxiosInstance } from 'axios';

const apiKeyWeather = import.meta.env.VITE_API_KEY_WEATHER;

const apiClientWeather: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_WEATHER_URL,
    headers: {
      "X-Api-Key": apiKeyWeather,
    },
  });

export const fetchWeather = (latitude: number, longitude: number) => {
    return apiClientWeather
      .get(`=${latitude},${longitude}&units=metric&apikey=${apiKeyWeather}`)
      .then((response) => {
        const res = response.data;
        return res;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
  
  export default apiClientWeather;
  