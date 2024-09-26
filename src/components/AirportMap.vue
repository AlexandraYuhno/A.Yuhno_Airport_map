<template>
  <div class="container">
    <h1>Airport Map</h1>

    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div id="map" ref="mapContainer"></div>
      <ul>
        <li 
          v-for="airport in airports" 
          :key="airport.icao">
          {{ airport.name }} ({{ airport.icao }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const store = useStore();
const airports = computed(() => store.state.airports);
const loading = computed(() => store.state.isLoading);
const error = computed(() => store.state.error);

const mapContainer = ref(null);
let map;

const initMap = () => {
  map = L.map(mapContainer.value).setView([48.8566, 2.3522], 4); 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(map);
};

const addMarkersToMap = (airportData) => {
  airportData.forEach(airport => {
    const { lat, lon, name, icao } = airport;
    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindTooltip(`${name} (ICAO: ${icao})`, { permanent: false });
  });
};

watch(airports, (newAirports) => {
  if (map && newAirports.length > 0) {
    addMarkersToMap(newAirports); 
  }
});


onMounted(() => {
  const icaoCodes = ['EGLL', 'LFPG', 'LTBA', 'EDDF', 'EHAM']; 
  store.dispatch('fetchAirportData', icaoCodes); 
  initMap(); 
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #555;
}

.container {
  text-align: center;
  min-width: 800px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #000;
  border-radius: 8px;
  color: #fff;
}

#map {
  min-width: 100%;
  height: 600px;
}
</style>
