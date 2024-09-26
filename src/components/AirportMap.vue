<template>
    <div class="container">
        <h1>Airport Map</h1>
        <div id="map" ref="mapContainer"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapContainer = ref(null);

const initMap = () => {
    const map = L.map(mapContainer.value).setView([48.8566, 2.3522], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

};

onMounted(() => {
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
    width: 100%;
    max-width: 100%;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #000;
    border-radius: 8px;
    color: #fff;
}

#map {
    width: 100%;
    height: 500px;
}
</style>
