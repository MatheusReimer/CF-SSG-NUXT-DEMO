import { existsSync, cpSync, mkdirSync, readdirSync, statSync, rmSync } from 'fs'
import path from 'path'
import { join } from 'path'

const SOURCE_DIR = '.output/public'
const DEPLOY_DIR = 'www'

const isIncremental = process.env.INCREMENTAL_BUILD === 'true'

function copyRecursive(src, dest) {
  if (!existsSync(src)) {
    console.log(`Source not found: ${src}`)
    return
  }

  const stats = statSync(src)
  
  if (stats.isDirectory()) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true })
    }
    
    const items = readdirSync(src)
    for (const item of items) {
      copyRecursive(join(src, item), join(dest, item))
    }
  } else {
    cpSync(src, dest, { force: true })
    console.log(`  Copied: ${dest}`)
  }
}

function main() {
  console.log('\n========================================')
  console.log(isIncremental ? '🔄 Incremental Build - Merging files' : '📦 Full Build - Copying all files')
  console.log('========================================\n')

  // Handle deletions first (can happen with or without incremental build)
  if (process.env.DELETED_ROUTES) {
    const deleted = process.env.DELETED_ROUTES.split(',')
    console.log('🗑️  Deleting routes:', deleted)
    
    deleted.forEach(route => {
      const folderPath = path.join(DEPLOY_DIR, route)
      if (existsSync(folderPath)) {
        rmSync(folderPath, { recursive: true })
        console.log(`  Deleted: ${folderPath}`)
      }
    })
    console.log('')
  }

  if (!existsSync(SOURCE_DIR)) {
    console.error(`Error: ${SOURCE_DIR} does not exist. Did the build complete?`)
    process.exit(1)
  }

  if (isIncremental) {
    if (!existsSync(DEPLOY_DIR)) {
      console.warn(`Warning: ${DEPLOY_DIR} doesn't exist. Run a full build first!`)
    }
    
    console.log(`Merging ${SOURCE_DIR} into ${DEPLOY_DIR}...\n`)
    copyRecursive(SOURCE_DIR, DEPLOY_DIR)
  } else {
    console.log(`Copying ${SOURCE_DIR} to ${DEPLOY_DIR}...\n`)
    cpSync(SOURCE_DIR, DEPLOY_DIR, { recursive: true, force: true })
    console.log('  Full copy complete!')
  }

  console.log('\n✅ Build merge complete!')
  console.log(`Deploy folder: ./${DEPLOY_DIR}`)
  console.log('========================================\n')
}

main()