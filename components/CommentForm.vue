<template>
  <button
    type="button"
    v-if="!showForm"
    @click="showForm = true"
    class="mb-2 me-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
  >
    Lisää kommentti
  </button>
  <FormKit v-if="showForm" id="addCommentForm" type="form" :actions="false" @submit="addComment">
    <FormKit
      type="text"
      name="createdBy"
      id="createdBy"
      label="Nimimerkki"
      placeholder="Kalle Kalastaja"
      validation="required"
    />
    <FormKit type="textarea" name="text" id="text" label="Kommentti" placeholder="Kommentti" validation="required" />

    <div class="flex items-center space-x-2 rounded-b">
      <button
        @click="this.$formkit.submit('addCommentForm')"
        type="button"
        class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        :disabled="isSubmittingForm"
      >
        Lisää
      </button>
      <button
        @click="showForm = false"
        type="button"
        class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        Peruuta
      </button>
    </div>
    <p v-if="errorMessage" class="mt-2 text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
  </FormKit>
  <div class="mb-4 mt-4 rounded-b border-t border-gray-200 dark:border-gray-600 rtl:space-x-reverse" />
</template>

<script setup>
import { reset } from '@formkit/core';

const selectedSpot = useState('selectedSpot');
const showForm = ref(false);
const isSubmittingForm = ref(false);
const errorMessage = ref('');

const selectedSpotId = computed(() => selectedSpot.value?._id);

const addComment = async (formData) => {
  isSubmittingForm.value = true;
  errorMessage.value = '';
  const comment = {
    ...formData,
    spotId: selectedSpotId.value,
  };
  console.log(comment);

  const response = await $fetch(`/api/v1/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  console.log('COMMENT FORM RESPONSE', response);

  if (response.statusCode !== 201) {
    console.error('Failed to add comment', response);
    isSubmittingForm.value = false;
    response.statusCode === 429
      ? (errorMessage.value = 'Kommentoit liian nopeasti! Yritä hetken päästä uudelleen.')
      : (errorMessage.value = 'Kommentin lisäys epäonnistui. Yritä hetken päästä uudelleen.');

    return;
  }

  const data = response.body;
  // Add the new comment as the first item in the array
  selectedSpot.value.comments = [data, ...selectedSpot.value.comments];
  isSubmittingForm.value = false;
  showForm.value = false;
  reset('addCommentForm');
};
</script>
