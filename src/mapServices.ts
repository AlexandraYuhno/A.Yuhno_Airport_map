import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Airport, AirportAirQuality, Weather } from './store/types';

const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  });

export default class MapService {
  private mapContainer: HTMLElement;
  private map: L.Map;

  constructor(
    mapContainer: HTMLElement,
    center: [number, number] = [48.8566, 2.3522],
    zoom: number = 4) {
    this.mapContainer = mapContainer;
    this.map = L.map(this.mapContainer).setView(center, zoom);
    tileLayer.addTo(this.map);
  }

  addMarkers(airports: Airport[]) {
    if (!this.map) return;
    airports.forEach((airport) => {
      const { latitude, longitude, name, icao } = airport;
      const marker = L.marker([latitude, longitude]).addTo(this.map);

      marker.bindTooltip(`${name} (ICAO: ${icao})`, { permanent: false });

      const coordinates = airports.map(airport => [airport.latitude, airport.longitude]);
      L.polyline(coordinates, { color: 'blue' }).addTo(this.map);
    });
  }

  addAirQualityMarkers(airports: Airport[], AirportAirQuality: Record<string, AirportAirQuality>) {
    if (!this.map) return;
    airports.forEach((airport) => {
      const { latitude, longitude, icao } = airport;
      const marker = L.marker([latitude, longitude]).addTo(this.map);
      const airQuality = AirportAirQuality[icao];
      const airQualityInfo = airQuality
        ? `Показатели воздуха: 
        SO2: ${airQuality.SO2.concentration}, 
        NO2: ${airQuality.NO2.concentration}, 
        CO: ${airQuality.CO.concentration}, 
        O3: ${airQuality.O3.concentration}`
        : 'Air Quality Data Not Available';
      marker.bindTooltip(airQualityInfo, { permanent: false })
      ;
    })
  }
  addWeatherMarkers(airports: Airport[], weatherAirport: Record<string, Weather>) {
    if (!this.map) return;
    airports.forEach((airport) => {
      const { latitude, longitude, icao } = airport;
      const marker = L.marker([latitude, longitude]).addTo(this.map);
      const weather = weatherAirport[icao];
      const weatherInfo = weather
        ? `Погода: 
        Температура: ${weather.temperature}°C,
        Влажность: ${weather.humidity}%, 
        Ветер: ${weather.windSpeed} м/с, 
        Видимость: ${weather.visibility} км
        Атмосферное давление: ${weather.pressureSurfaceLevel} мм рт. ст.
        Облачность: ${weather.cloudBase}%`
        : 'Weather Data Not Available';
      
      marker.bindTooltip(weatherInfo, { permanent: false });
    });
  }
  
  get isMapInitialized(): boolean {
    return this.map !== null;
  }
}
