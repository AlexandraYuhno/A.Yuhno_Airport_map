<template>
  <div class="container">
    <h1>Airport Map</h1>
    <div v-if="loading()">Loading...</div>
    <div v-if="error()">{{ error }}</div>
    <div v-else>
      <div id="map-container">
        <div id="map" ref="mapContainer"></div>
        <div class="button-switch">
          <button 
            class="button" 
            :class="{ active: activeButton === 'info' }" 
            @click="setActiveButton('info')"
          >
            Инфо
          </button>
          <button 
            class="button" 
            :class="{ active: activeButton === 'weather' }" 
            @click="setActiveButton('weather')"
          >
            Погода
          </button>
          <button 
            class="button" 
            :class="{ active: activeButton === 'air' }" 
            @click="setActiveButton('air')"
          >
            Воздух
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';

  import { useAirportStore } from '../store/airportModule'; 
  import MapService from '../mapServises'; 
  import { Airport } from '../store/types';

  const airportStore = useAirportStore();

  const airports = () => airportStore.airports;
  const loading = () => airportStore.isLoading;
  const error = () => airportStore.error;

  const mapContainer = ref<HTMLElement | null>(null);
  let mapService: MapService | null = null;

  const activeButton = ref<string>('info');

  const setActiveButton = (button: string) => {
    activeButton.value = button;
    if (button === 'info') {
      mapService?.addMarkers(airports()); 
    } else {
      ///
    }
  };

  const addMarkersToMap = (airportData: Airport[]) => {
    if (mapService && mapService.isMapInitialized) {
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

    if (mapContainer.value) {  
      mapService = new MapService(mapContainer.value);
    }
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
    position: relative;
  }

  #map-container {
    position: relative;
    width: 100%;
    height: 600px;
  }

  #map {
    width: 100%;
    height: 100%;
  }

  .button-switch {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000; 
  }

  .button {
    width: 120px; 
    height: 40px; 
    background-color: #444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .button.active {
    background-color: #007BFF; 
  }

  .button:hover {
    background-color: #555;
  }
</style>
