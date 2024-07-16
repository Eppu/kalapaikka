<template>
  <NuxtLink
    :to="to"
    class="block rounded px-3 py-2 font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
    exact-active-class="bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500 hover:bg-blue-600"
    aria-current="page"
  >
    {{ title }}
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
