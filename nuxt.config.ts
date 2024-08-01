export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  build: {
    transpile: ['moment']
  },
  modules: ['v-wave/nuxt','@pinia/nuxt','@pinia-plugin-persistedstate/nuxt'],
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
        { property: 'og:title', content: 'Wahoot!' },
        { property: 'og:description', content: 'A random Kahoot! client.' },
        { property: 'og:type', content: 'website' },
      ],
    }
  }
})
