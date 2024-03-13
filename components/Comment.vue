<template>
  <article class="max-w-96 rounded-lg bg-white pb-6 text-base dark:bg-gray-900">
    <footer class="mb-2 flex items-center justify-between">
      <div class="flex items-center">
        <p class="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
          {{ props.comment.createdBy }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <time>{{ format(new Date(props.comment.createdAt), 'd.M.yyyy HH:mm:ss', { locale: fi }) }} </time>
        </p>
      </div>
    </footer>
    <p class="text-gray-500 dark:text-gray-400">
      {{ props.comment.text }}
    </p>
  </article>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
const props = defineProps({
  comment: {
    type: Object as () => { text: string; createdBy: string; createdAt: string },
    required: true,
  },
});
</script>
