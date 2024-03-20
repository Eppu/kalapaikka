<template>
  <div
    id="spot-details-drawer"
    class="fixed left-0 top-0 z-50 h-screen min-w-full -translate-x-full overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800 sm:min-w-[450px]"
    tabindex="-1"
    aria-labelledby="drawer-label"
  >
    <h5
      id="drawer-label"
      class="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      <svg
        class="me-2.5 h-4 w-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      Info
    </h5>
    <button
      id="drawer-hide-button"
      type="button"
      data-drawer-hide="spot-details-drawer"
      aria-controls="spot-details-drawer"
      class="absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
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
      <span class="sr-only">Close menu</span>
    </button>
    <!-- Show information about the currently selected spot -->
    <div v-if="selectedSpot" class="mt-4">
      <h2 class="text-lg font-semibold text-gray-800">{{ selectedSpot.name }}</h2>

      <div class="mt-4">
        <div v-if="selectedSpot.description" class="mb-4">
          <h3 class="text-md font-semibold text-gray-800">Kuvaus</h3>
          <p class="text-gray-600">{{ selectedSpot.description }}</p>
        </div>

        <h3 class="text-md mt-2 font-semibold text-gray-800">Maakunta</h3>
        <p class="text-gray-600">{{ selectedSpot.province }}</p>

        <h3 class="text-md mt-2 font-semibold text-gray-800">Sijainti</h3>
        <div class="flex items-center space-x-2">
          <p class="text-gray-600">{{ selectedSpot.coordinates.coordinates[1] }}</p>
          ,
          <p class="text-gray-600">{{ selectedSpot.coordinates.coordinates[0] }}</p>
        </div>
        <a
          :href="
            'https://www.google.com/maps/dir/?api=1&destination=' +
            selectedSpot.coordinates.coordinates[1] +
            '%2C' +
            selectedSpot.coordinates.coordinates[0]
          "
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 underline"
          >Reittiohjeet</a
        >

        <h3 class="text-md mt-2 font-semibold text-gray-800">Lisätty</h3>
        <p class="text-gray-600">{{ format(parseISO(selectedSpot.createdAt), 'd.M.yyyy', { locale: fi }) }}</p>
      </div>

      <h2 class="mt-8 text-lg font-semibold text-gray-800">Kommentit</h2>
      <div class="mt-4">
        <CommentForm />
        <div v-if="isLoading" class="mt-4 flex gap-4">
          <Spinner />
          Ladataan kommentteja...
        </div>
        <p v-else-if="!isLoading && selectedSpot.comments.length === 0" class="text-gray-600">Ei kommentteja</p>
        <Comment v-for="comment in selectedSpot.comments" :key="comment._id" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { format, parseISO } from 'date-fns';
import { fi } from 'date-fns/locale';
import { Drawer } from 'flowbite';

const drawerInstance = ref(null);
const selectedSpot = useState('selectedSpot');
const isLoading = ref(false);

async function fetchSpotComments(spotId) {
  console.log('fetching spot comments...');
  const response = await fetch(`/api/v1/comments/${spotId}`);
  const data = await response.json();
  return data;
}

watch(selectedSpot, (newVal, oldVal) => {
  console.log('selectedSpot changed', newVal, oldVal);
  if (newVal) {
    drawerInstance.value.show();
  }
});

watchEffect(async () => {
  if (selectedSpot.value) {
    console.log('selectedSpot.value changed in watchEffect');
    isLoading.value = true;
    try {
      const comments = await fetchSpotComments(selectedSpot.value._id);
      console.log('comments', comments);
      selectedSpot.value.comments = comments;
      isLoading.value = false;
    } catch (error) {
      console.error('Error fetching comments', error);
      isLoading.value = false;
    }
  }
});

onMounted(() => {
  console.log('DetailsDrawer mounted');
  const targetEl = document.getElementById('spot-details-drawer');
  const drawerHideButton = document.getElementById('drawer-hide-button');

  const options = {
    closeOnClickOutside: true,
    closeOnEsc: true,
    placement: 'left',
    backdrop: true,
    bodyScrolling: false,
    edge: true,
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
    onHide: () => {
      console.log('drawer is hidden');
      selectedSpot.value = null;
    },
    onShow: () => {
      console.log('drawer is shown');
    },
    onToggle: () => {
      console.log('drawer has been toggled');
    },
  };
  if (targetEl) {
    /*
     * targetEl: required
     * options: optional
     */
    drawerInstance.value = new Drawer(targetEl, options);

    drawerHideButton.addEventListener('click', () => {
      drawerInstance.value.hide();
    });
  }
});
</script>
