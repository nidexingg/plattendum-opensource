// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@vite-pwa/nuxt',
    'nuxt-icon',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'dayjs-nuxt',
    '@nuxt/eslint',
  ],
  plugins: ['~/plugins/no-ssr.js'],
  i18n: {
    vueI18n: "./i18n.config.ts",
    strategy: "prefix_and_default",
    defaultLocale: "en",
    pages: {
      privacy: false,
      terms: false,
      imprint: false,
      contact: false,
    },
    locales: [
      {
        code: "en",
        iso: "en-US",
        isCatchallLocale: true,
      },
      {
        code: "km",
        iso: "km-KH",
      },
    ],
  },
  pwa: {
    meta: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    },
    manifest: {
      name: 'Plattendum',
      short_name: 'Plattendum',
      theme_color: '#ffffff',
      description: 'Install Plattendum PWA on your homescreen.',
      icons: [
        {
          src: 'https://cloudmariazona.vercel.app/pwaicons/weattend/64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'https://cloudmariazona.vercel.app/pwaicons/weattend/144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'https://cloudmariazona.vercel.app/pwaicons/weattend/192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'https://cloudmariazona.vercel.app/pwaicons/weattend/512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '',
      runtimeCaching: [
        {
          urlPattern: 'http:\\/\\/localhost\\:3000',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
