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
        // Full build - fetch slugs from CMS
        try {
          const response = await fetch(process.env.CMS_API_URL!, {
            headers: {
              'X-Master-Key': process.env.CMS_API_KEY || ''
            }
          })
          const data = await response.json()
          const posts = data.record?.posts || data.posts || data
          
          const slugs = posts.map((p: any) => p.slug)
          console.log('[Full Build] Generating routes from CMS:', slugs)
          slugs.forEach((slug: string) => routes.add(`/posts/${slug}`))
        } catch (error) {
          console.error('Failed to fetch posts from CMS:', error)
        }
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