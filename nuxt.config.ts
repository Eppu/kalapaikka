// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      link: [
        {
          rel: 'icon',
          // type: 'image/x-icon',
          href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🎣</text></svg>',
        },
      ],
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt3-leaflet', 'nuxt-mongoose', '@formkit/nuxt', 'nuxt-security', '@nuxt/fonts'],
  security: {
    headers: {
      // Needed for local development
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      // Allow Leaflet map tiles
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https://*.tile.openstreetmap.org', 'https://*.tile.openweathermap.org'],
      },
      xFrameOptions: 'DENY',
    },
  },
  routeRules: {
    '/api/v1/comments/': {
      security: {
        rateLimiter: {
          tokensPerInterval: 5,
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
  fonts: {
    experimental: {
      // processCSSVariables: true,
    },
  },
});
