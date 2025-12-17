<template>
  <div class="page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <NuxtLink to="/" class="logo">
          <span class="logo-cpi">CPI</span>
          <span class="logo-divider">|</span>
          <span class="logo-text">Resource Center</span>
        </NuxtLink>
        <nav class="nav">
          <a href="#" class="nav-link">Products</a>
          <a href="#" class="nav-link">Solutions</a>
          <a href="#" class="nav-link active">Resources</a>
          <a href="#" class="nav-link">Contact</a>
        </nav>
      </div>
    </header>

    <!-- Article -->
    <article v-if="post" class="article">
      <!-- Article Header -->
      <div class="article-header">
        <div class="article-header-content">
          <NuxtLink to="/" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Resources
          </NuxtLink>
          <span class="category">{{ post.category }}</span>
          <h1>{{ post.title }}</h1>
          <div class="article-meta">
            <div class="author-info">
              <div class="author-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div>
                <span class="author-name">{{ post.author }}</span>
                <span class="publish-date">{{ formatDate(post.publishedAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Article Content -->
      <div class="article-body">
        <div class="article-content">
          <p class="lead">{{ post.excerpt }}</p>
          <div class="content" v-html="formatContent(post.content)"></div>
        </div>

        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-card">
            <h3>Need Help?</h3>
            <p>Our technical experts can help you find the right solution for your infrastructure needs.</p>
            <a href="#" class="cta-button">Contact Us</a>
          </div>

          <div class="sidebar-card">
            <h3>Related Products</h3>
            <ul class="product-list">
              <li><a href="#">ZetaFrame® Cabinet System</a></li>
              <li><a href="#">eConnect® PDUs</a></li>
              <li><a href="#">Thermal Solutions</a></li>
              <li><a href="#">Cable Management</a></li>
            </ul>
          </div>

          <div class="sidebar-card generated-info">
            <span class="label">Static Generation</span>
            <p>This page was pre-rendered at build time:</p>
            <code>{{ generatedAt }}</code>
          </div>
        </aside>
      </div>
    </article>

    <!-- Not Found -->
    <div v-else class="not-found">
      <h1>Article Not Found</h1>
      <p>The article you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="back-button">Back to Resources</NuxtLink>
    </div>

    <!-- Footer -->
    <footer class="footer">
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
const route = useRoute()
const slug = route.params.slug as string

const generatedAt = useState('generatedAt', () => new Date().toISOString())

const { data: post } = await useFetch<any>(`/api/posts/${slug}`)

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatContent(content: string) {
  // Convert line breaks to paragraphs
  return content
    .split('\n\n')
    .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
    .join('')
}

if (post.value) {
  useHead({
    title: `${post.value.title} | CPI Resource Center`,
    meta: [
      { name: 'description', content: post.value.excerpt }
    ]
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
  text-decoration: none;
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

/* Article Header */
.article-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
  padding: 3rem 2rem 4rem;
}

.article-header-content {
  max-width: 800px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #00a3e0;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: gap 0.2s;
}

.back-link:hover {
  gap: 0.75rem;
}

.back-link svg {
  width: 18px;
  height: 18px;
}

.category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #00a3e0;
  background: rgba(0, 163, 224, 0.15);
  padding: 0.4rem 0.85rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.article-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 48px;
  height: 48px;
  background: rgba(0, 163, 224, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.author-avatar svg {
  width: 24px;
  height: 24px;
  color: #00a3e0;
}

.author-name {
  display: block;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
}

.publish-date {
  display: block;
  color: #8a8aa0;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

/* Article Body */
.article-body {
  max-width: 1200px;
  margin: -2rem auto 0;
  padding: 0 2rem 4rem;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 3rem;
}

.article-content {
  background: #ffffff;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.lead {
  font-size: 1.25rem;
  color: #5a5a7a;
  line-height: 1.7;
  margin: 0 0 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.content :deep(p) {
  color: #3a3a5a;
  line-height: 1.8;
  margin: 0 0 1.5rem;
  font-size: 1.05rem;
}

.content :deep(p:last-child) {
  margin-bottom: 0;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.sidebar-card h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: #1a1a2e;
}

.sidebar-card p {
  font-size: 0.9rem;
  color: #5a5a7a;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.cta-button {
  display: block;
  text-align: center;
  background: #00a3e0;
  color: #ffffff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.cta-button:hover {
  background: #0090c7;
}

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f5;
}

.product-list li:last-child {
  border-bottom: none;
}

.product-list a {
  color: #00a3e0;
  text-decoration: none;
  font-size: 0.9rem;
}

.product-list a:hover {
  text-decoration: underline;
}

.generated-info {
  background: #f8f9fa;
  border: 1px dashed #ddd;
}

.generated-info .label {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #00a3e0;
  background: rgba(0, 163, 224, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.generated-info code {
  display: block;
  font-size: 0.75rem;
  color: #5a5a7a;
  background: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  word-break: break-all;
}

/* Not Found */
.not-found {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.not-found h1 {
  font-size: 2rem;
  margin: 0 0 1rem;
}

.not-found p {
  color: #5a5a7a;
  margin: 0 0 2rem;
}

.back-button {
  display: inline-block;
  background: #00a3e0;
  color: #ffffff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

/* Footer */
.footer {
  background: #1a1a2e;
  color: #ffffff;
  padding: 2rem;
  margin-top: auto;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
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
@media (max-width: 1000px) {
  .article-body {
    grid-template-columns: 1fr;
  }

  .sidebar {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sidebar-card {
    flex: 1;
    min-width: 250px;
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

  .article-header h1 {
    font-size: 1.75rem;
  }

  .article-content {
    padding: 1.5rem;
  }

  .sidebar {
    flex-direction: column;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>