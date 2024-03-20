<template>
  <div>
    script
    {{ id }}
    {{ slug }}
  </div>
  <div>
    route params
    {{ $route.params.id }}
    {{ $route.params.slug }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;
const { slug } = route.params;
</script>
