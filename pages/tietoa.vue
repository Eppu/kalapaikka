<template>
  <main class="container mx-auto max-w-screen-lg justify-center px-4 py-16">
    <div class="mx-auto flex max-w-screen-lg flex-col items-center space-y-6">
      <span class="self-center whitespace-nowrap text-sm font-semibold text-blue-700 dark:text-white">Tietoa</span>
      <h1 class="text-3xl font-semibold text-gray-800 max-sm:text-2xl">Mikä ihmeen Kalakartta?</h1>
      <div class="space-y-8 text-left text-xl text-gray-700 sm:text-center">
        <p>
          Kalakartta on palvelu, joka auttaa sinua löytämään parhaat pilkki- ja kalapaikat lähelläsi. Voit merkitä
          kartalle omia suosikkikalapaikkojasi, jakaa niitä muiden kalastajien kanssa ja lukea heidän kommenttejaan.
        </p>
        <p>Kalakartta on ilmainen ja avoin kaikille.</p>
        <button
          type="button"
          class="mt-6 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="navigateTo('/')"
        >
          Avaa Kalakartta
        </button>
      </div>
      <div class="container mx-auto justify-center"></div>
    </div>

    <div class="mt-36 flex flex-col space-y-6 max-md:mt-20">
      <h2 class="text-2xl font-semibold text-gray-800">Miten Kalakartta toimii?</h2>
      <div class="space-y-6 text-lg text-gray-700">
        <p>
          Kalakartan sisältö perustuu käyttäjien lisäämiin kalapaikkoihin ja niiden tietoihin. Kuka tahansa voi siis
          lisätä palveluun uuden kalapaikan, ja jakaa tietoa muille kalastajille.
        </p>
        <p>Kalakartan avulla voit:</p>
        <ul class="list-inside list-disc font-semibold">
          <li>Löytää uusia kalapaikkoja lähelläsi</li>
          <li>Saada tietoa kalapaikkojen ominaisuuksista, kuten kalalajeista ja parhaista vieheistä</li>
          <li>Lukea muiden kalastajien kokemuksia kalapaikoista</li>
          <li>Jättää omia kommentteja ja vinkkejä muille kalastajille</li>
          <li>Merkitä omia kalapaikkojasi kartalle ja jakaa ne muiden kanssa</li>
        </ul>
        <p>
          Kalakartta pohjautuu avoimeen lähdekoodiin, joten kuka tahansa voi halutessaan osallistua sen kehittämiseen.
          Lähdekoodi löytyy palvelun GitHub-reposta.
        </p>
      </div>
    </div>
  </main>
</template>
