<script setup lang="ts">
const count = ref(0);
const increment = () => {
  count.value++;
};
</script>

<template>
  <button class="counter" @click="increment">count is: {{ count }}</button>
</template>
