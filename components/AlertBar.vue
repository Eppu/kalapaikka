<template>
  <div
    class="absolute z-50 mt-14 flex w-full items-center rounded-lg bg-gray-50 p-4 text-sm text-gray-800 shadow-md dark:bg-gray-800 dark:text-gray-300"
    role="alert"
  >
    <svg
      class="me-3 inline h-4 w-4 flex-shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
      />
    </svg>
    <span class="sr-only">Info</span>
    <div>
      <span class="font-medium">Hupsista! 😱 </span> {{ message }}. Kokeile
      <button
        class="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
        @click="refreshPage"
      >
        ladata sivu uudestaan
      </button>
      .
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string;
  type: 'info' | 'error';
}>(); // Define the props for the component

const refreshPage = () => {
  window.location.reload();
};
</script>
