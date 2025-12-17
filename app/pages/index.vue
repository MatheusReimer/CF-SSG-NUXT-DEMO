<template>
  <div class="container">
    <h1>📝 My Static Blog</h1>
    <p>Built with incremental static generation</p>

    <h2>Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <NuxtLink :to="`/posts/${post.slug}`">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useFetch<any>('/api/posts')
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
</style>