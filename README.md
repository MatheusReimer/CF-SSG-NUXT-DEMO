# Nuxt 3 Incremental Static Generation Demo

This project demonstrates how to do **partial/incremental static builds** with Nuxt 3. Instead of regenerating your entire site when one page changes, you can build just the changed pages and merge them with your existing build.

## Why Use This?

- **Faster builds**: A site with 1000 pages can take minutes to build. With incremental builds, updating one page takes seconds.
- **Cheaper CI/CD**: Less build time = lower costs on platforms like Netlify, Vercel, etc.
- **Better DX**: Quick feedback loop when testing content changes.

## How It Works

1. **Full builds** generate all pages and copy them to the `./www` folder
2. **Incremental builds** generate only specified pages and merge them into `./www`
3. The `./www` folder is what you deploy and cache between builds

## Usage

### Development

```bash
npm run dev
```

### Full Build (generate all pages)

```bash
npm run generate
```

This generates all routes and copies them to `./www`.

### Incremental Build (generate specific pages)

```bash
# On Mac/Linux
INCREMENTAL_BUILD=true CHANGED_ROUTES="/posts/hello-world,/posts/getting-started" npm run generate

# On Windows (PowerShell)
$env:INCREMENTAL_BUILD="true"; $env:CHANGED_ROUTES="/posts/hello-world"; npm run generate

# On Windows (CMD)
set INCREMENTAL_BUILD=true && set CHANGED_ROUTES=/posts/hello-world && npm run generate
```

### Preview the built site

```bash
npm run preview
```

Or serve the `./www` folder with any static server:

```bash
npx serve www
```

## Configuration

### Specifying Routes for Incremental Builds

You can specify which routes to build in several ways:

#### 1. Environment Variable (comma-separated)

```bash
CHANGED_ROUTES="/posts/hello-world,/posts/new-post" npm run generate
```

#### 2. Webhook Payload (for Netlify/CI)

Set `INCOMING_HOOK_BODY` with a JSON payload:

```json
{
  "routes": ["/posts/hello-world", "/posts/new-post"]
}
```

#### 3. Modify the Config

Edit `nuxt.config.ts` and customize the `getChangedRoutes()` function to:
- Read from a file
- Query a CMS for recently updated content
- Use git diff to find changed content files

## CI/CD Integration

### Netlify

1. Cache the `./www` and `.nuxt` folders between builds
2. Use a build plugin or custom script to restore/save cache
3. Trigger incremental builds via webhook with route data

### GitHub Actions

```yaml
- name: Restore cache
  uses: actions/cache@v3
  with:
    path: |
      www
      .nuxt
    key: nuxt-build-${{ github.ref }}
    restore-keys: nuxt-build-

- name: Incremental build
  if: github.event_name == 'repository_dispatch'
  run: |
    INCREMENTAL_BUILD=true CHANGED_ROUTES="${{ github.event.client_payload.routes }}" npm run generate

- name: Full build  
  if: github.event_name != 'repository_dispatch'
  run: npm run generate
```

## Project Structure

```
├── nuxt.config.ts      # Main config with prerender hooks
├── pages/
│   ├── index.vue       # Home page
│   └── posts/
│       └── [slug].vue  # Dynamic post pages
├── scripts/
│   └── merge-builds.js # Merges incremental builds with existing
├── www/                # Deploy this folder (created after first build)
└── .output/public/     # Nuxt's build output (merged into www)
```

## Customization

### Adding Your Data Source

Edit `nuxt.config.ts` and update these functions:

- `getAllRoutes()` - Fetch all dynamic routes from your CMS/API
- `getChangedRoutes()` - Determine which routes need rebuilding

### Example: Fetching from a CMS

```ts
async function getAllRoutes(): Promise<string[]> {
  const posts = await fetch('https://your-cms.com/api/posts')
    .then(r => r.json())
  
  return posts.map(post => `/posts/${post.slug}`)
}

async function getChangedRoutes(): Promise<string[]> {
  // Option: Query CMS for recently updated content
  const recentPosts = await fetch('https://your-cms.com/api/posts?updated_after=' + lastBuildTime)
    .then(r => r.json())
  
  return recentPosts.map(post => `/posts/${post.slug}`)
}
```

## Tips

1. **Always do a full build** when code changes (components, layouts, configs)
2. **Use incremental builds** only for content-only changes
3. **Cache both** `.nuxt` and `www` folders to avoid unnecessary rebuilds
4. **Test locally** before setting up CI/CD:
   ```bash
   npm run generate                    # Full build
   INCREMENTAL_BUILD=true CHANGED_ROUTES="/posts/new" npm run generate  # Incremental
   ```
