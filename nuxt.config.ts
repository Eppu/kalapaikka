// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt3-leaflet', 'nuxt-mongoose', '@formkit/nuxt', 'nuxt-security'],
  security: {
    headers: {
      // Needed for local development
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      // Allow Leaflet map tiles
      contentSecurityPolicy: {
        'img-src': "'self' data: https://*.tile.openstreetmap.org",
      },
      xFrameOptions: 'DENY',
    },
  },
  routeRules: {
    '/api/v1/comments/': {
      security: {
        rateLimiter: {
          tokensPerInterval: 10,
          interval: '10000',
          throwError: false,
        },
      },
    },
    '/api/v1/fishingspots/': {
      security: {
        rateLimiter: {
          tokensPerInterval: 3,
          interval: '10000',
          throwError: false,
        },
      },
    },
  },
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
