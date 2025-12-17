export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: true,
  runtimeConfig: {
    cmsApiUrl: process.env.CMS_API_URL,
    cmsApiKey: process.env.CMS_API_KEY,
  },
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
        // Full build - all post slugs
        const slugs = [
          'data-center-cooling-solutions',
          'cabinet-selection-guide',
          'power-distribution-best-practices',
          'cable-management-strategies',
          'edge-computing-infrastructure'
        ]
        console.log('[Full Build] Generating routes:', slugs)
        slugs.forEach(slug => routes.add(`/posts/${slug}`))
      }
    },
  },

  app: {
    head: {
      title: 'CPI Resource Center',
      meta: [
        { name: 'description', content: 'Expert guidance on data center infrastructure, power management, and thermal solutions.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }
      ]
    }
  }
})