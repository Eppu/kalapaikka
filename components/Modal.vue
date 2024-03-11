<template>
  <div
    id="modalEl"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
  >
    <div class="relative max-h-full w-full max-w-2xl">
      <!-- Modal content -->
      <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl">Lisää uusi kalapaikka</h3>
          <button
            id="modal-close-button"
            type="button"
            class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="hide"
          >
            <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Sulje ikkuna</span>
          </button>
        </div>

        <!-- Modal body -->
        <div class="space-y-6 p-6 pt-4">
          <FormKit type="form" id="addFishingSpotForm" submit-label="Lisää" :actions="false" @submit="addFishingSpot">
            <FormKit
              type="text"
              name="name"
              id="name"
              label="Nimi"
              placeholder="Kalapaikan nimi"
              validation="required"
            />
            <FormKit type="textarea" name="description" id="description" label="Kuvaus" placeholder="Kuvaus" />
          </FormKit>
          <p v-if="errorMessage" class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
        </div>

        <!-- Modal footer -->
        <div
          class="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600 rtl:space-x-reverse"
        >
          <!-- TODO: Set up styling using the classes on the commented buttons below -->
          <!-- <FormKit type="submit">Lisää</FormKit> -->
          <!-- <FormKit type="button" @click="hide">Peruuta</FormKit> -->
          <button
            @click="this.$formkit.submit('addFishingSpotForm')"
            type="button"
            class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lisää
          </button>
          <button
            @click="hide"
            type="button"
            class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Peruuta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Modal } from 'flowbite';

const modalInstance = ref(null);
const clickedSpot = useState('clickedSpot');

watch(clickedSpot, (newValue) => {
  console.log('clickedSpot changed', newValue);
  if (newValue) {
    modalInstance.value.show();
  }
});

const addFishingSpot = async (values) => {
  console.log('Adding fishing spot', values);
  const { name, description } = values;
  const response = await $fetch('/api/v1/fishingspots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      description: description,
      coordinates: {
        type: 'Point',
        coordinates: clickedSpot.value.coordinates.coordinates,
      },
    }),
  });

  console.log('modal response', response);
  if (response.statusCode !== 201) {
    console.error('Failed to add fishing spot', response);
    return;
  }

  const newSpot = response.body;
  const fishingSpots = useState('fishingSpots');
  fishingSpots.value.push(newSpot);
  modalInstance.value.hide();
};

onMounted(() => {
  console.log('Modal mounted');
  const targetEl = document.getElementById('modalEl');
  const modalCloseButton = document.getElementById('modal-close-button');

  const options = {
    placement: 'bottom-center',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      console.log('modal is hidden');
      clickedSpot.value = null;
    },
    onShow: () => {
      console.log('modal is shown');
    },
    onToggle: () => {
      console.log('modal has been toggled');
    },
  };

  if (targetEl) {
    modalInstance.value = new Modal(targetEl, options);

    modalCloseButton.addEventListener('click', () => {
      modalInstance.value.hide();
    });
  }
});
</script>
