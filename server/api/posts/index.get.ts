// server/api/posts/index.get.ts
export default defineEventHandler(async () => {
  // Fetch from your "CMS" (JSONBin, Gist, or real CMS)
  const config = useRuntimeConfig()
  
  try {
    const response = await fetch(config.cmsApiUrl, {
      headers: {
         'X-Master-Key': config.cmsApiKey || ''
      }
    })
    const data = await response.json()
    return data.record?.posts || data.posts || data
  } catch (error) {
    console.error('Failed to fetch from CMS:', error)
    return []
  }
})