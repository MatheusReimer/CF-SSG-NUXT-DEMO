<template>
  <div class="container">
    <NuxtLink to="/">← Back to Home</NuxtLink>

    <div v-if="apod">
      <h1>{{ apod.title }}</h1>
      <p class="date">{{ apod.date }}</p>
      
      <img 
        v-if="apod.media_type === 'image'" 
        :src="apod.url" 
        :alt="apod.title"
        class="apod-image"
      />
      <iframe
        v-else-if="apod.media_type === 'video'"
        :src="apod.url"
        frameborder="0"
        allowfullscreen
        class="apod-video"
      ></iframe>

      <p class="explanation">{{ apod.explanation }}</p>
      <p class="meta">Generated at: {{ generatedAt }}</p>
    </div>

    <div v-else>
      <h1>Failed to load</h1>
      <p>Could not fetch data for {{ date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const date = route.params.date as string

const generatedAt = useState('generatedAt', () => new Date().toISOString())

// Fetch from NASA API at build time
const { data: apod } = await useFetch<{
  title: string
  date: string
  url: string
  explanation: string
  media_type: string
}>(`https://api.nasa.gov/planetary/apod`, {
  query: {
    api_key: 'DEMO_KEY', // Free demo key, rate limited but works
    date: date,
  },
})

if (apod.value) {
  useHead({ title: apod.value.title })
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}
h1 { color: #0b3d91; margin-top: 1rem; }
a { color: #fc3d21; }
.date { color: #666; }
.apod-image {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  margin: 1rem 0;
}
.apod-video {
  width: 100%;
  height: 400px;
  margin: 1rem 0;
}
.explanation {
  line-height: 1.6;
  margin: 1rem 0;
}
.meta {
  color: #999;
  font-size: 0.85em;
}
</style>