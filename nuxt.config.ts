// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      title: 'Interconnect Exchange',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Open Rate Card Specification - Interconnect Made Easy' 
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  vite: {
    optimizeDeps: {
      include: ['@connexcs/interconnect-made-easy']
    },
    resolve: {
      alias: {
        '../interconnect-made-easy/schema/interconnect-made-easy.schema.json': 
          '/node_modules/@connexcs/interconnect-made-easy/interconnect-made-easy/schema/interconnect-made-easy.schema.json'
      }
    }
  },

  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      routes: [
        '/',
        '/tools',
        '/docs',
        '/docs/readme',
        '/docs/specification',
        '/docs/card-types',
        '/docs/versioning',
        '/docs/glossary',
        '/docs/contributing'
      ]
    }
  },

  ssr: false
})
