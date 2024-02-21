<template>
  <div style="height: 100vh; width: 100vw">
    <div
      id="drawer-example"
      class="fixed left-0 top-0 z-50 h-screen min-w-96 -translate-x-full overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <h5
        id="drawer-label"
        class="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
      >
        <svg
          class="me-2.5 h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        Info
      </h5>
      <button
        type="button"
        data-drawer-hide="drawer-example"
        aria-controls="drawer-example"
        class="absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <!-- Show information about the currently selected spot -->
      <div v-if="selectedSpot" class="mt-4">
        <h2 class="text-lg font-semibold text-gray-800">{{ selectedSpot.name }}</h2>

        <div class="mt-4">
          <h3 class="text-md font-semibold text-gray-800">Coordinates</h3>
          <p class="text-gray-600">{{ selectedSpot.coordinates.coordinates }}</p>

          <h3 class="text-md font-semibold text-gray-800">Created at</h3>
          <p class="text-gray-600">{{ selectedSpot.createdAt }}</p>
        </div>
      </div>
    </div>

    <LMap ref="map" :zoom="zoom" :center="[64.89092, 25.92773]" :options="mapOptions" className="z-0">
      <LControlZoom position="bottomright" />
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" />
      <!-- Loop through markers and create a marker for each spot -->
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

const tooltipOptions = {
  direction: 'top',
  // center the offset on the marker
  offset: [-15, -15],
  opacity: 0.95,
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

    // wait for a tick and add a class to the markers
    // this is a workaround, since Leaflet doesn't support adding data attributes to markers
    // it's ugly, but will work for now.
    nextTick(() => {
      const markers = document.querySelectorAll('.leaflet-marker-icon');
      markers.forEach((marker) => {
        marker.setAttribute('data-drawer-target', 'drawer-example');
        marker.setAttribute('data-drawer-show', 'drawer-example');
      });
    });
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
