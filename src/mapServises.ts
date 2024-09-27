import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Airport } from './store/types';

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
    });
  }

  get isMapInitialized(): boolean {
    return this.map !== null;
  }
}
