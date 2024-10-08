<template>
  <div class='container'>
    <h1>Airport Map</h1>
    <div v-if="loading()">Loading...</div>
    <div v-if="error()">{{ error }}</div>
    <div v-else>
      <div id='map-container'>
        <div id='map' ref='mapContainer'></div>
        <div class='button-switch'>
          <button 
            class='button' 
            @click="setSwitchButton('info')"
            :class="{ active: isInfoActive }"
          >
            Инфо
          </button>
          <button 
            class='button' 
            @click="setSwitchButton('weather')"
          >
            Погода
          </button>
          <button 
            class='button' 
            @click="setSwitchButton('air')"
            :class="{ active: isAirActive }"
          >
            Воздух
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import { ref, onMounted, watch } from 'vue';

  import MapService from '../mapServices'; 
  import { useAirportStore } from '../store/airportModule';
  import { useAirQualityStore } from '../store/airQualityModule';

  const airportStore = useAirportStore();
  const airQualityStore = useAirQualityStore();

  const airports = () => airportStore.airports;
  const loading = () => airportStore.isLoading;
  const error = () => airportStore.error;
  const airQuality = () => airQualityStore.airQuality;

  const mapContainer = ref<HTMLElement | null>(null);
  let mapService: MapService | null = null;

  const isInfoActive = ref(true);
  const isAirActive = ref(false);

  const setSwitchButton = (button: string) => {
    if (button === 'info') {
      isInfoActive.value = true;
      isAirActive.value = false;
      mapService?.addMarkers(airports());
    } else if (button === 'air') {
      isInfoActive.value = false;
      isAirActive.value = true;
      mapService?.addAirQualityMarkers(airports(), airQuality());
    }
  };

  watch(airports, (newAirports) => {
    if (!newAirports.length) return;
    if (isInfoActive.value) {
        mapService?.addMarkers(newAirports);
      } else if (isAirActive.value) {
        mapService?.addAirQualityMarkers(newAirports, airQuality());
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

  .button:focus,
  .button.active {
    background-color: #007BFF;
    outline: none;
  }

  .button:hover {
    background-color: #000;
  }
</style>
