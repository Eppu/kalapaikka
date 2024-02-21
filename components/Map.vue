<template>
  <div style="height: 100vh; width: 100vw">
    <LMap ref="map" :zoom="zoom" :center="[64.89092, 25.92773]" :options="mapOptions">
      <LControlZoom position="bottomright" />
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" />
      <!-- Loop through markers and create a marker for each spot -->
      <LMarker
        v-for="spot in fishingSpots"
        :key="spot._id"
        :lat-lng="spot.coordinates.coordinates"
        @click="() => handleMarkerClick(spot)"
      >
        <LPopup>
          <div>
            <h3>{{ spot.name }}</h3>
            <p>{{ spot.createdAt }}</p>
          </div>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const zoom = ref(6);
const mapOptions = {
  zoomControl: false,
  attributionControl: false, // TODO: See if hiding is really necessary or not, especially on desktop
};

const fishingSpots = ref([]);
const selectedSpot = ref(null);

const handleMarkerClick = (spot) => {
  console.log('clicked', spot);
  selectedSpot.value = spot;
};

onMounted(async () => {
  // Fetch fishing spots from your API endpoint
  try {
    const response = await fetch('http://localhost:3000/api/v1/fishingspots');
    const data = await response.json();
    fishingSpots.value = data;
  } catch (error) {
    console.error('Error fetching fishing spots', error);
  }
});
</script>

<style>
body {
  margin: 0;
}
</style>
