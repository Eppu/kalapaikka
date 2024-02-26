// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt3-leaflet', 'nuxt-mongoose', '@formkit/nuxt'],
  tailwindcss: {
    config: {},
    viewer: true,
    configPath: 'tailwind.config.js',
  },
  mongoose: {
    uri: process.env.MONGO_URI,
    options: {},
    modelsDir: 'server/models',
    devtools: true,
  },
  formkit: {
    // Experimental support for auto loading
    autoImport: false,
  },
});
