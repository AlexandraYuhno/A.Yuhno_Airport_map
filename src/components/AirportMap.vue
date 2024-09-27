<template>
  <div class="container">
    <h1>Airport Map</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div id="map" ref="mapContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';

  import { useAirportStore } from '../store/airportModule'; 
  import MapService from '../mapServises'; 
  import { Airport } from '../store/types';

  const airportStore = useAirportStore();

  const airports = computed(() => airportStore.airports);
  const loading = computed(() => airportStore.isLoading);
  const error = computed(() => airportStore.error);

  const mapContainer = ref<HTMLElement | null>(null);
  let mapService: MapService | null = null;

  const initMap = () => {
    if (mapContainer.value) {  
      mapService = new MapService(mapContainer.value);
      mapService.initMap();
    }
  };

  const addMarkersToMap = (airportData: Airport[]) => {
    if (mapService && mapService.isMapInitialized()) {
      mapService.addMarkers(airportData);
    }
  };

  watch(airports, (newAirports) => {
    if (newAirports.length > 0) {
      addMarkersToMap(newAirports);
    }
  });

  onMounted(() => {
    const icaoCodes = ['EGLL', 'LFPG', 'LTBA', 'EDDF', 'EHAM'];
    airportStore.fetchAirportData(icaoCodes);
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
