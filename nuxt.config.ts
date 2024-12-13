export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,

  modules: [
    'v-wave/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
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
      link:[
        {rel: 'stylesheet',href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'}
      ],
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Wahoot!',
      charset: 'utf-8',
      meta: [
        { name: 'description', content: 'A random Kahoot! client.' },
        { name: 'author', content: 'eitaaaar' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Wahoot!' },
        { property: 'og:description', content: 'A third party Kahoot client with extra functions and better user experience.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://wahoot-dev.vercel.app/' },
        { property: 'og:image', content: 'https://wahoot-dev.vercel.app/img/icon.png' },
        { property: 'og:site_name', content: 'Wahoot!' },
        { property: 'og:locale', content: 'en_US' },
      ],
    }
  },

  compatibilityDate: '2024-10-14',
})