export default defineEventHandler(() => {
  return [
    {
      slug: "hello-world",
      title: "Hello World",
      content: "This is my first post about static sites.",
      publishedAt: "2025-12-16"
    },
    {
      slug: "nuxt-is-awesome",
      title: "Nuxt is Awesome",
      content: "Learn why Nuxt 3 is great for static sites.",
      publishedAt: "2025-12-15"
    },
    {
      slug: "incremental-builds",
      title: "Incremental Builds Rock",
      content: "Only rebuild what changed. Save time and money.",
      publishedAt: "2025-12-14"
    }
  ]
})