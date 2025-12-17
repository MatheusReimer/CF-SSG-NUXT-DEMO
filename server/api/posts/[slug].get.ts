// server/api/posts/[slug].get.ts
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const config = useRuntimeConfig()

  const response = await fetch(config.cmsApiUrl, {
    headers: {
      'X-Master-Key': config.cmsApiKey || ''
    }
  })
  const data = await response.json()
  const posts = data.record?.posts || data.posts || data

  const post = posts.find((p: any) => p.slug === slug)

  if (!post) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  return post
})