<template>
  <div>
    <Map />

    <!-- <Counter /> -->
    <!-- <NuxtWelcome /> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>
