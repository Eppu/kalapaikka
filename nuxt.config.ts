// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt3-leaflet', 'nuxt-mongoose'],
  tailwindcss: {
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
  mongoose: {
    uri: process.env.MONGO_URI,
    options: {},
    modelsDir: 'server/models',
    devtools: true,
    debug: true,
  },
});
