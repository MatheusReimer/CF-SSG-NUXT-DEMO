<template>
  <div class="page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-cpi">CPI</span>
          <span class="logo-divider">|</span>
          <span class="logo-text">Resource Center</span>
        </div>
        <nav class="nav">
          <a href="#" class="nav-link">Products</a>
          <a href="#" class="nav-link">Solutions</a>
          <a href="#" class="nav-link active">Resources</a>
          <a href="#" class="nav-link">Contact</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Data Center Insights</h1>
        <p>Expert guidance on infrastructure, power management, and thermal solutions for modern data centers.</p>
      </div>
      <div class="hero-pattern"></div>
    </section>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <!-- Featured Post -->
        <div v-if="posts && posts.length > 0" class="featured">
          <span class="section-label">Featured Article</span>
          <article class="featured-card">
            <div class="featured-image">
              <div class="image-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <div class="featured-content">
              <span class="category">{{ posts[0].category }}</span>
              <NuxtLink :to="`/posts/${posts[0].slug}`" class="featured-title">
                <h2>{{ posts[0].title }}</h2>
              </NuxtLink>
              <p class="excerpt">{{ posts[0].excerpt }}</p>
              <div class="meta">
                <span class="author">{{ posts[0].author }}</span>
                <span class="date">{{ formatDate(posts[0].publishedAt) }}</span>
              </div>
              <NuxtLink :to="`/posts/${posts[0].slug}`" class="read-more">
                Read Article →
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- Posts Grid -->
        <div class="posts-section">
          <span class="section-label">Latest Articles</span>
          <div class="posts-grid">
            <article 
              v-for="post in posts?.slice(1)" 
              :key="post.slug" 
              class="post-card"
            >
              <div class="post-image">
                <div class="image-placeholder small">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H8v2h4z"/>
                  </svg>
                </div>
              </div>
              <div class="post-content">
                <span class="category">{{ post.category }}</span>
                <NuxtLink :to="`/posts/${post.slug}`" class="post-title">
                  <h3>{{ post.title }}</h3>
                </NuxtLink>
                <p class="excerpt">{{ post.excerpt }}</p>
                <div class="meta">
                  <span class="date">{{ formatDate(post.publishedAt) }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-cpi">CPI</span>
            <span class="logo-text">Chatsworth Products</span>
          </div>
          <p class="footer-tagline">Powering and protecting your technology investment since 1991.</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Products</h4>
            <a href="#">Cabinets & Enclosures</a>
            <a href="#">Thermal Management</a>
            <a href="#">Power Management</a>
            <a href="#">Cable Management</a>
          </div>
          <div class="footer-column">
            <h4>Solutions</h4>
            <a href="#">Data Centers</a>
            <a href="#">Edge Computing</a>
            <a href="#">Industrial</a>
            <a href="#">Enterprise</a>
          </div>
          <div class="footer-column">
            <h4>Resources</h4>
            <a href="#">Blog</a>
            <a href="#">Case Studies</a>
            <a href="#">White Papers</a>
            <a href="#">Training</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 Chatsworth Products. All rights reserved.</p>
        <p class="made-by">
          Built with incremental static generation by 
          <a href="https://thinklogic.com" target="_blank" rel="noopener">Thinklogic</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// CHANGED: Use useAsyncData instead of useFetch
const { data: posts } = await useAsyncData('posts', async () => {
  const config = useRuntimeConfig()
   
  try {
    const response = await $fetch(config.public.cmsApiUrl || config.cmsApiUrl, {
      headers: {
        'X-Master-Key': config.public.cmsApiKey || config.cmsApiKey || ''
      }
    })
    const data = response as any
    return data.record?.posts || data.posts || data
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return []
  }
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
/* Reset & Base */
* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a2e;
  background: #f8f9fa;
}

/* Header */
.header {
  background: #1a1a2e;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-cpi {
  font-size: 1.5rem;
  font-weight: 800;
  color: #00a3e0;
  letter-spacing: -0.5px;
}

.logo-divider {
  color: #4a4a6a;
  font-weight: 300;
}

.logo-text {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #a0a0b0;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #ffffff;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem;
  letter-spacing: -1px;
}

.hero p {
  font-size: 1.25rem;
  color: #a0a0b0;
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
}

.hero-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: radial-gradient(circle at 70% 50%, rgba(0, 163, 224, 0.1) 0%, transparent 50%);
}

/* Main Content */
.main {
  flex: 1;
  padding: 3rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #00a3e0;
  margin-bottom: 1.5rem;
}

/* Featured Card */
.featured {
  margin-bottom: 4rem;
}

.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.featured-image {
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  width: 120px;
  height: 120px;
  background: rgba(0, 163, 224, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder svg {
  width: 60px;
  height: 60px;
  color: #00a3e0;
}

.image-placeholder.small {
  width: 80px;
  height: 80px;
}

.image-placeholder.small svg {
  width: 40px;
  height: 40px;
}

.featured-content {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #00a3e0;
  background: rgba(0, 163, 224, 0.1);
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: fit-content;
}

.featured-title {
  text-decoration: none;
  color: inherit;
}

.featured-title h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1.3;
  transition: color 0.2s;
}

.featured-title:hover h2 {
  color: #00a3e0;
}

.excerpt {
  color: #5a5a7a;
  line-height: 1.7;
  margin: 0 0 1.5rem;
}

.meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: #8a8aa0;
  margin-bottom: 1.5rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: #00a3e0;
  text-decoration: none;
  transition: gap 0.2s;
}

.read-more:hover {
  gap: 0.5rem;
}

/* Posts Grid */
.posts-section {
  margin-top: 2rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

.post-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.post-image {
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-content {
  padding: 1.5rem;
}

.post-title {
  text-decoration: none;
  color: inherit;
}

.post-title h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  line-height: 1.4;
  transition: color 0.2s;
}

.post-title:hover h3 {
  color: #00a3e0;
}

.post-card .excerpt {
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card .meta {
  margin-bottom: 0;
}

/* Footer */
.footer {
  background: #1a1a2e;
  color: #ffffff;
  padding: 4rem 2rem 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #2d2d44;
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.footer-logo .logo-cpi {
  font-size: 1.75rem;
}

.footer-logo .logo-text {
  font-size: 0.9rem;
  color: #a0a0b0;
}

.footer-tagline {
  color: #8a8aa0;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-column h4 {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 1rem;
  color: #ffffff;
}

.footer-column a {
  display: block;
  color: #8a8aa0;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.35rem 0;
  transition: color 0.2s;
}

.footer-column a:hover {
  color: #00a3e0;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.85rem;
  color: #5a5a7a;
}

.made-by a {
  color: #00a3e0;
  text-decoration: none;
  font-weight: 500;
}

.made-by a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 900px) {
  .featured-card {
    grid-template-columns: 1fr;
  }

  .featured-image {
    min-height: 250px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .footer-brand {
    max-width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .nav {
    gap: 1rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>