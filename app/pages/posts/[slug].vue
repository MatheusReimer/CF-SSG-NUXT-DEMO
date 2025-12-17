<template>
  <div class="container">
    <NuxtLink to="/">← Back</NuxtLink>

    <article v-if="post">
      <h1>{{ post.title }}</h1>
      <p class="date">{{ post.publishedAt }}</p>
      <p>{{ post.content }}</p>
      <p class="meta">Built at: {{ generatedAt }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const generatedAt = useState('generatedAt', () => new Date().toISOString())

const { data: post } = await useFetch<any>(`/api/posts/${slug}`)
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}
h1 { color: #00dc82; }
a { color: #00dc82; }
.date { color: #666; }
.meta { color: #999; font-size: 0.85em; }
</style>