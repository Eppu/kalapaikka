<!-- <template>
  <div>
    <Map />
  </div>
</template> -->
<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Kalakartta',
  ogTitle: 'Kalakartta',
  description: 'Selaa parhaita kalastuspaikkoja ja jaa vinkkejä muiden harrastajien kanssa.',
  ogDescription: 'Selaa parhaita kalastuspaikkoja ja jaa vinkkejä muiden harrastajien kanssa.',
  // ogImage: 'https://example.com/image.png',
  // twitterCard: 'summary_large_image',
});
</script>
