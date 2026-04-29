import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-04-29',
  devtools: { enabled: false },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@vite-pwa/nuxt',
    '@nuxt/image',
  ],

  googleFonts: {
    families: {
      Inter: { wght: '100..900', ital: '100..900' },
      'Lexend+Zetta': { wght: '100..900' },
    },
    display: 'swap',
    preconnect: true,
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Avestra — IA de Alta Performance',
      short_name: 'Avestra',
      description: 'Segundo Cérebro com IA: contexto permanente, memória infinita, agentes autônomos.',
      theme_color: '#08070F',
      background_color: '#08070F',
      display: 'standalone',
      orientation: 'portrait',
      lang: 'pt-BR',
      icons: [
        { src: '/icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
    },
    client: { installPrompt: true },
    devOptions: { enabled: false },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Avestra — Segundo Cérebro com IA de Alta Performance',
      meta: [
        { name: 'description', content: 'Transforme sua relação com IA. Contexto permanente, memória infinita e agentes autônomos trabalhando por você.' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#08070F' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://avestra.com.br' },
        { property: 'og:title', content: 'Avestra — Segundo Cérebro com IA' },
        { property: 'og:description', content: 'Transforme sua relação com IA. Contexto permanente, memória infinita e agentes autônomos.' },
        { property: 'og:image', content: 'https://avestra.com.br/og-image.jpg' },
        { property: 'og:site_name', content: 'Avestra' },
        { property: 'og:locale', content: 'pt_BR' },
        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Avestra — Segundo Cérebro com IA' },
        { name: 'twitter:description', content: 'Contexto permanente, memória infinita, agentes autônomos.' },
        { name: 'twitter:image', content: 'https://avestra.com.br/og-image.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    optimizeDeps: {
      include: ['three', 'gsap', 'lenis', 'howler'],
    },
  },

  // Theatre.js needs browser-only access
  ssr: false,
})
