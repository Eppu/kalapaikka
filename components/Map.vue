<template>
  <div style="height: 100vh; width: 100vw">
    <LMap ref="map" :zoom="zoom" :center="[64.89092, 25.92773]" :options="mapOptions">
      <LControlZoom position="bottomright" />
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
      />
    </LMap>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const zoom = ref(6);

const mapOptions = {
  zoomControl: false,
  //   attributionControl: false,
};
</script>

<style>
body {
  margin: 0;
}
</style>
