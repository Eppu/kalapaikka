<template>
  <div class="h-full w-full">
    <div v-if="errorMessage" class="absolute left-0 right-0 top-0">
      <AlertBar :message="errorMessage" type="error" />
    </div>
    <DetailsDrawer />
    <Modal />
    <client-only>
      <LMap
        ref="map"
        :zoom="zoom"
        :center="[64.89092, 25.92773]"
        :options="mapOptions"
        className="z-0"
        @click="handleMapClick($event)"
      >
        <LControlZoom position="bottomright" />
        <!-- TODO: Consider adding these to the tile layer to limit how much of the map is rendered -->
        <!-- :no-wrap="true"
        :bounds="[
          [-90, -180],
          [90, 180],
        ]" -->
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" />
        <LMarker
          v-for="spot in fishingSpots"
          :key="spot._id"
          :lat-lng="[spot.coordinates.coordinates[1], spot.coordinates.coordinates[0]]"
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
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
import { getZoomOffset } from '~/utils/mapUtils';
import AlertBar from './AlertBar.vue';

const zoom = ref(6);
const map = ref(null);
const errorMessage = ref(null);

const mapOptions = {
  zoomControl: false,
  attributionControl: false, // TODO: See if hiding is really necessary or not, especially on desktop
  worldCopyJump: true,
  minZoom: 5,
  maxZoom: 18,
};

const tooltipOptions = {
  direction: 'top',
  // center the offset on the marker
  offset: [-15, -15],
  opacity: 0.95,
};

const fishingSpots = useState('fishingSpots', () => []);
const selectedSpot = useState('selectedSpot', () => null);
const clickedSpot = useState('clickedSpot', () => null);
const modalVisible = useState('addModalVisible');

const handleMarkerClick = (spot) => {
  console.log('clicked', spot);
  selectedSpot.value = spot;
};

const handleMapClick = (event) => {
  console.log('map clicked at point', event.latlng);
  clickedSpot.value = {
    coordinates: {
      coordinates: [event.latlng.lat, event.latlng.lng],
    },
  };

  const zoomLevel = map.value.leafletObject.getZoom();
  const verticalOffset = getZoomOffset(zoomLevel);
  map.value.leafletObject.flyTo([event.latlng.lat - verticalOffset, event.latlng.lng]);
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
    const response = await fetch('/api/v1/fishingspots/all');
    if (!response.ok) {
      errorMessage.value = 'Kalapaikkojen haussa kävi virhe';
      return;
    }
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
