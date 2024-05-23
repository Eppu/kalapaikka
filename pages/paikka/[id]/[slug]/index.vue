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
  <div>
    fetch
    <pre>
      {{ data }}
    </pre>
    {{ error }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;
const { slug } = route.params;

// Fetch fishing spot data using /api/v1/fishingspots/:id
// We'll use useFetch for this

const { data, error } = useFetch(`/api/v1/fishingspots/${id}`);
// If there's an error, we'll show it
if (error.value) {
  console.error(error.value);
}
</script>
