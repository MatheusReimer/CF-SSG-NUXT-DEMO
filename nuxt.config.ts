export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  nitro: {
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
        // Full build - get last 10 days of NASA images
        const dates = getLastNDays(10)
        console.log('[Full Build] Generating routes for dates:', dates)
        dates.forEach(date => routes.add(`/apod/${date}`))
      }
    },
  },
})

function getLastNDays(n: number): string[] {
  const dates: string[] = []
  for (let i = 0; i < n; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toISOString().split('T')[0]) // YYYY-MM-DD format
  }
  return dates
}