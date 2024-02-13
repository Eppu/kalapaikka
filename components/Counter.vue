<script setup lang="ts">
const count = ref(0);
const increment = () => {
  count.value++;
};
</script>

<template>
  <button @click="increment">count is: {{ count }}</button>
  <MapboxMap
    map-id="{ID}"
    style="position: absolute; top: 0; bottom: 0; left: 250px; width: 500px"
    :options="{
      style: 'mapbox://styles/mapbox/light-v11', // style URL
      center: [-68.137343, 45.137451], // starting position
      zoom: 5, // starting zoom
    }"
  />
</template>
