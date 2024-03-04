// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    },
  },
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
