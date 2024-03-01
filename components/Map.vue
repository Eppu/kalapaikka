<template>
  <div style="height: 100vh; width: 100vw">
    <DetailsDrawer ref="detailsDrawer" />
    <Modal ref="myModal" />
    <LMap
      ref="map"
      :zoom="zoom"
      :center="[64.89092, 25.92773]"
      :options="mapOptions"
      className="z-0"
      @click="handleMapClick($event)"
    >
      <LControlZoom position="bottomright" />
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" />
      <LMarker
        v-for="spot in fishingSpots"
        :key="spot._id"
        :lat-lng="spot.coordinates.coordinates"
        @click="() => handleMarkerClick(spot)"
        ref="markers"
      >
        <LTooltip :options="tooltipOptions">
          <div>
            <h3
              className="
            text-md
            font-semibold
            text-gray-800"
            >
              {{ spot.name }}
            </h3>
            <p>{{ spot.createdAt }}</p>
          </div>
        </LTooltip>
      </LMarker>

      <!-- Draw a marker when the user clicks the map -->
      <LMarker v-if="clickedSpot" :lat-lng="clickedSpot.coordinates.coordinates">
        <LIcon iconUrl="/img/marker-icon-red.png" :icon-size="[25, 41]" :icon-anchor="[12.5, 41]" />
        <LTooltip :options="{ permanent: true, direction: 'top', offset: [0, -41] }">
          <div>
            <h3
              className="
            text-md
            font-semibold
            text-gray-800"
            >
              Uusi kalapaikka
            </h3>
          </div>
        </LTooltip>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initFlowbite } from 'flowbite';

const zoom = ref(6);
const mapOptions = {
  zoomControl: false,
  attributionControl: false, // TODO: See if hiding is really necessary or not, especially on desktop
};

const tooltipOptions = {
  direction: 'top',
  // center the offset on the marker
  offset: [-15, -15],
  opacity: 0.95,
};

const fishingSpots = useState('fishingSpots', () => []);
const selectedSpot = useState('selectedSpot', () => null);
const myModal = ref(null);
const clickedSpot = useState('clickedSpot', () => null);
const modalVisible = useState('addModalVisible');

const handleMarkerClick = (spot) => {
  console.log('clicked', spot);
  selectedSpot.value = spot;
};

const handleMapClick = (event) => {
  console.log('map clicked at point', event.latlng);
  myModal.value.show();
  clickedSpot.value = {
    coordinates: {
      coordinates: [event.latlng.lat, event.latlng.lng],
    },
  };
};

// If Add modal is closed, remove the marker from the map
watch(modalVisible, (newVal, oldVal) => {
  if (!newVal) {
    clickedSpot.value = null;
  }
});

onMounted(async () => {
  // Fetch fishing spots from your API endpoint
  try {
    const response = await fetch('/api/v1/fishingspots');
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
