export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: true,

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  hooks: {
    'prerender:routes': async ({ routes }) => {
      const isIncremental = process.env.INCREMENTAL_BUILD === 'true'

      if (isIncremental) {
        const changed = process.env.CHANGED_ROUTES?.split(',') || []
        console.log('[Incremental Build] Generating routes:', changed)
        changed.forEach(r => routes.add(r))
      } else {
        // Use the same data as our API
        const slugs = ['hello-world', 'nuxt-is-awesome', 'incremental-builds']
        console.log('[Full Build] Generating routes:', slugs)
        slugs.forEach(slug => routes.add(`/posts/${slug}`))
      }
    },
  },
})