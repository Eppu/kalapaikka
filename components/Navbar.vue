<template>
  <nav class="border-gray-200 bg-white shadow-sm backdrop-saturate-200 dark:bg-gray-900">
    <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <!-- TODO: Replace with SVG logo once we have a proper one -->
        <span class="self-center text-2xl">🎣</span>
        <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Kalakartta Logo" /> -->
        <span class="font-display self-center whitespace-nowrap text-2xl font-bold dark:text-white">Kalakartta</span>
      </a>
      <button
        id="navbar-trigger"
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Avaa valikko</span>
        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse"
        >
          <li>
            <NavbarLink to="/" title="Kartta" />
          </li>
          <li>
            <NavbarLink to="/tietoa" title="Tietoa" />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { Collapse, type CollapseOptions, type InstanceOptions, type CollapseInterface } from 'flowbite';

const collapseInstance = ref<CollapseInterface | null>(null);

onMounted(() => {
  console.log('Navbar mounted');
  const targetEl = document.getElementById('navbar-default');
  const triggerEl = document.getElementById('navbar-trigger');

  const options: CollapseOptions = {
    onCollapse: () => {},
    onExpand: () => {},
    onToggle: () => {},
  };
  const instanceOptions: InstanceOptions = {
    id: 'navbar-default',
    override: true,
  };

  const collapse: CollapseInterface = new Collapse(targetEl, triggerEl, options, instanceOptions);

  if (collapse && collapseInstance.value !== collapse) {
    collapseInstance.value = collapse;
    // We need to call collapse to make sure the initial state is correct even after navigation
    collapseInstance.value.collapse();
  }
});
</script>
