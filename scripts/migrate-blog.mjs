// One-time migration: push the existing `blog[]` posts (from src/data/site.js)
// into Sanity as `post` documents, uploading each cover/gallery image as a
// Sanity asset.
//
// Idempotent: each post gets a deterministic _id (`post.<slug>`). Posts that
// already exist are skipped, so re-running will not create duplicates.
// Pass --force to overwrite existing posts (re-uploads their images).
//
//   node scripts/migrate-blog.mjs [--force]
//
// Auth: reuses the Sanity CLI login token from ~/.config/sanity/config.json,
// so nothing secret is committed.

import {createClient} from '@sanity/client'
import {readFileSync, existsSync, createReadStream} from 'node:fs'
import {homedir} from 'node:os'
import {join, basename, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {blog} from '../src/data/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC = join(ROOT, 'public')
const FORCE = process.argv.includes('--force')

const PROJECT_ID = 'xy8xfu7q'
const DATASET = 'production'

function cliToken() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN
  const cfgPath = join(homedir(), '.config', 'sanity', 'config.json')
  if (!existsSync(cfgPath)) {
    throw new Error('No Sanity token: log in with `npx sanity login` or set SANITY_WRITE_TOKEN.')
  }
  const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'))
  const token = typeof cfg.authToken === 'string' ? cfg.authToken : cfg.authToken?.token
  if (!token) throw new Error('Could not read authToken from Sanity config.')
  return token
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: cliToken(),
  useCdn: false,
})

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

// "Oct 2021" / "Dec 2025" -> ISO datetime (1st of the month, noon UTC).
function parseDate(str) {
  const m = String(str || '').trim().match(/([A-Za-z]+)\s+(\d{4})/)
  if (!m) return new Date().toISOString()
  const month = MONTHS[m[1].slice(0, 3).toLowerCase()] ?? 0
  return new Date(Date.UTC(Number(m[2]), month, 1, 12)).toISOString()
}

let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36)}`

// Paragraph strings -> Portable Text blocks.
function toPortableText(paragraphs = []) {
  return paragraphs.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  }))
}

// Upload a /public image path as a Sanity image asset -> image reference object.
async function uploadImage(publicPath, alt) {
  if (!publicPath) return undefined
  const abs = join(PUBLIC, publicPath.replace(/^\//, ''))
  if (!existsSync(abs)) {
    console.warn(`   ! missing image, skipping: ${publicPath}`)
    return undefined
  }
  const asset = await client.assets.upload('image', createReadStream(abs), {
    filename: basename(abs),
  })
  return {
    _type: 'image',
    _key: key(),
    asset: {_type: 'reference', _ref: asset._id},
    ...(alt ? {alt} : {}),
  }
}

async function run() {
  console.log(`Migrating ${blog.length} posts to Sanity (${PROJECT_ID}/${DATASET})${FORCE ? ' [force]' : ''}\n`)

  const ids = blog.map((p) => `post.${p.slug}`)
  const existing = new Set(
    await client.fetch('*[_type=="post" && _id in $ids]._id', {ids})
  )

  let created = 0
  let skipped = 0

  for (const p of blog) {
    const _id = `post.${p.slug}`
    if (existing.has(_id) && !FORCE) {
      console.log(`= skip (exists): ${p.slug}`)
      skipped++
      continue
    }

    console.log(`+ ${p.slug}`)
    const cover = await uploadImage(p.cover, p.title)
    const gallery = []
    for (const g of p.gallery || []) {
      const img = await uploadImage(g)
      if (img) gallery.push(img)
    }

    const doc = {
      _id,
      _type: 'post',
      title: p.title,
      slug: {_type: 'slug', current: p.slug},
      publishedAt: parseDate(p.date),
      ...(p.tag ? {tag: p.tag} : {}),
      ...(cover ? {cover} : {}),
      ...(p.excerpt ? {excerpt: p.excerpt} : {}),
      body: toPortableText(p.body),
      ...(gallery.length ? {gallery} : {}),
      ...(p.source ? {source: p.source} : {}),
    }

    await client.createOrReplace(doc)
    created++
  }

  console.log(`\nDone. ${created} written, ${skipped} skipped.`)
}

run().catch((err) => {
  console.error('\nMigration failed:', err.message)
  process.exit(1)
})
