<template>
  <footer
    class="rounded-lg bg-white p-4 antialiased shadow dark:bg-gray-800 sm:flex sm:items-center sm:justify-between sm:p-6 xl:p-8"
  >
    <p class="mb-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
      &copy; {{ new Date().getFullYear() }} <a href="#" class="hover:underline" target="_blank">Kalapaikka</a>
    </p>
    <div class="flex items-center justify-center space-x-1">
      <a
        href="#"
        data-tooltip-target="tooltip-facebook"
        class="inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          class="h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 8 19"
        >
          <path
            fill-rule="evenodd"
            d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="sr-only">Facebook</span>
      </a>
      <div
        id="tooltip-facebook"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
      >
        Seuraa Facebookissa
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <a
        href="#"
        data-tooltip-target="tooltip-twitter"
        class="inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
          />
        </svg>
        <span class="sr-only">Twitter</span>
      </a>
      <div
        id="tooltip-twitter"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
      >
        Seuraa X:ssä
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <a
        href="#"
        data-tooltip-target="tooltip-github"
        class="inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          class="h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="sr-only">Github</span>
      </a>
      <div
        id="tooltip-github"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
      >
        GitHub
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  </footer>
</template>
