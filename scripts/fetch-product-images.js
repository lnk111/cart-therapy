// Build-time: fetch a real product image for each catalog item from the Naver
// Shopping API and write the URLs into src/data/products.js (the IMAGES map).
//
// At runtime the app just reads those stored URLs — the API keys never ship to
// the client. Re-run whenever the catalog changes:
//
//   NAVER_CLIENT_ID=xxx NAVER_CLIENT_SECRET=yyy node scripts/fetch-product-images.js
//
// Requires Node 18+ (global fetch). Already-stored images are kept unless you
// pass --force, so re-runs only fill in the gaps.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { products } from '../src/data/products.js'

const CLIENT_ID = process.env.NAVER_CLIENT_ID
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET

const FORCE = process.argv.includes('--force')

const __dirname = dirname(fileURLToPath(import.meta.url))
const PRODUCTS_PATH = resolve(__dirname, '../src/data/products.js')

const SEARCH_URL = 'https://openapi.naver.com/v1/search/shop.json'
const DELAY_MS = 120 // be polite; Naver limits ~10 req/s

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    'Missing credentials. Set NAVER_CLIENT_ID and NAVER_CLIENT_SECRET env vars.\n' +
      'Get them at https://developers.naver.com/apps/ (검색 > 쇼핑).'
  )
  process.exit(1)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Naver wraps matched terms in <b> tags and HTML-escapes the title; the image
// URL is clean, but strip just in case future fields are used.
const stripTags = (s) => s.replace(/<\/?b>/g, '').replace(/&amp;/g, '&')

async function searchImage(query) {
  const url = `${SEARCH_URL}?query=${encodeURIComponent(query)}&display=1&sort=sim`
  const res = await fetch(url, {
    headers: {
      'X-Naver-Client-Id': CLIENT_ID,
      'X-Naver-Client-Secret': CLIENT_SECRET,
    },
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${body.slice(0, 200)}`)
  }

  const data = await res.json()
  const first = data.items && data.items[0]
  return first && first.image ? stripTags(first.image) : null
}

// Rewrite the `const IMAGES = {...}` block between the IMAGES:START/END markers.
function renderImagesBlock(map) {
  const entries = Object.keys(map)
    .sort()
    .map((id) => `  ${JSON.stringify(id)}: ${JSON.stringify(map[id])},`)
  return entries.length
    ? `const IMAGES = {\n${entries.join('\n')}\n}`
    : 'const IMAGES = {}'
}

async function readExistingImages() {
  const source = await readFile(PRODUCTS_PATH, 'utf8')
  const match = source.match(/\/\/ IMAGES:START\n([\s\S]*?)\n\/\/ IMAGES:END/)
  if (!match) {
    throw new Error('Could not find IMAGES:START / IMAGES:END markers in products.js')
  }
  // Parse the current map so re-runs preserve previously fetched URLs.
  const existing = {}
  const re = /"([^"]+)":\s*"([^"]+)"/g
  let m
  while ((m = re.exec(match[1])) !== null) existing[m[1]] = m[2]
  return { source, existing }
}

async function writeImages(source, map) {
  const block = renderImagesBlock(map)
  const next = source.replace(
    /\/\/ IMAGES:START\n[\s\S]*?\n\/\/ IMAGES:END/,
    `// IMAGES:START\n${block}\n// IMAGES:END`
  )
  await writeFile(PRODUCTS_PATH, next, 'utf8')
}

async function main() {
  const { source, existing } = await readExistingImages()
  const images = { ...existing }

  const todo = products.filter((p) => FORCE || !images[p.id])
  console.log(
    `${products.length} products, ${todo.length} to fetch` +
      (FORCE ? ' (--force)' : `, ${products.length - todo.length} already stored`)
  )

  let ok = 0
  let miss = 0
  let fail = 0

  for (const [i, product] of todo.entries()) {
    // Brand + name gives the most relevant hit on Naver Shopping.
    const query = `${product.brand} ${product.name}`
    try {
      const image = await searchImage(query)
      if (image) {
        images[product.id] = image
        ok++
        console.log(`✓ [${i + 1}/${todo.length}] ${product.id} ${query}`)
      } else {
        miss++
        console.log(`· [${i + 1}/${todo.length}] no result: ${query}`)
      }
    } catch (err) {
      fail++
      console.warn(`✗ [${i + 1}/${todo.length}] ${query} — ${err.message}`)
    }
    await sleep(DELAY_MS)
  }

  await writeImages(source, images)
  console.log(
    `\nDone. ${ok} fetched, ${miss} no result, ${fail} failed. ` +
      `${Object.keys(images).length}/${products.length} products have images.`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
