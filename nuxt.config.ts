export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  modules: [
    'v-wave/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/supabase',
  ],
  runtimeConfig: {
    public: {
      test: process.env.TEST
    }
  },
  supabase: {
    redirect: false,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Wahoot!',
      charset: 'utf-8',
      meta: [
        { name: 'description', content: 'A random Kahoot! client.' },
        { name: 'author', content: 'eitaaaar' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Open Graph meta tags for embedding
        { property: 'og:title', content: 'Wahoot!' },
        { property: 'og:description', content: 'A random Kahoot! client.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://wahoot.netlify.app/pin' },
        { property: 'og:image', content: 'https://wahoot.netlify.app/img/icon.png' },
        { property: 'og:site_name', content: 'Wahoot!' },
        { property: 'og:locale', content: 'en_US' },
      ],
    }
  },
})
