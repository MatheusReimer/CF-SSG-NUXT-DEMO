<template>
  <div class="container">
    <h1>🚀 NASA Astronomy Picture of the Day</h1>
    <p>Incremental Static Generation Demo</p>

    <h2>Recent Images</h2>
    <ul>
      <li v-for="date in dates" :key="date">
        <NuxtLink :to="`/apod/${date}`">{{ date }}</NuxtLink>
      </li>
    </ul>

    <h2>Test Commands</h2>
    <pre>
# Full build (last 10 days)
npm run generate

# Incremental build (add a specific date)
$env:INCREMENTAL_BUILD="true"; $env:CHANGED_ROUTES="/apod/2024-01-15"; npm run generate
    </pre>
  </div>
</template>

<script setup lang="ts">
// Generate last 10 days for the index
const dates = Array.from({ length: 10 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)
  return date.toISOString().split('T')[0]
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}
h1 { color: #0b3d91; }
a { color: #fc3d21; }
pre {
  background: #f1f1f1;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.85em;
}
</style>