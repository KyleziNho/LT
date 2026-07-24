// Journal data layer — fetches posts from Sanity and maps them into the shape
// the Journal pages already expect (the old `blog[]` shape from site.js), so the
// page components barely change. Lisa authors these in Sanity Studio.
import {useEffect, useState} from 'react'
import {sanity} from '../lib/sanity'
import {src} from '../lib/sanityImage'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

// ISO -> "Oct 2021", matching the site's original date display.
function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

// Sanity doc -> card shape (index + shared fields).
function mapCard(doc) {
  return {
    slug: doc.slug,
    title: doc.title,
    tag: doc.tag,
    date: fmtDate(doc.publishedAt),
    excerpt: doc.excerpt || '',
    cover: src(doc.cover, 1600),
    gallery: (doc.gallery || []).map((g) => src(g, 1400)).filter(Boolean),
  }
}

// Sanity doc -> full post shape (adds Portable Text body + source).
function mapPost(doc) {
  return {
    ...mapCard(doc),
    body: doc.body || [],
    source: doc.source || '',
  }
}

const LIST_PROJECTION = `{
  "slug": slug.current,
  title,
  tag,
  publishedAt,
  excerpt,
  cover,
  gallery
}`

const LIST_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${LIST_PROJECTION}`

// One round-trip for a post page: the post itself + the ordered list (for the
// "next in the journal" link and neighbour ordering).
const POST_QUERY = `{
  "post": *[_type == "post" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    tag,
    publishedAt,
    excerpt,
    cover,
    gallery,
    body,
    source
  },
  "order": *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    "slug": slug.current,
    title
  }
}`

// Index: { posts, loading, error }
export function useJournalPosts() {
  const [state, setState] = useState({posts: null, loading: true, error: null})
  useEffect(() => {
    let live = true
    sanity
      .fetch(LIST_QUERY)
      .then((rows) => live && setState({posts: rows.map(mapCard), loading: false, error: null}))
      .catch((error) => live && setState({posts: [], loading: false, error}))
    return () => {
      live = false
    }
  }, [])
  return state
}

// Post page: { post, next, loading, notFound, error }
export function useJournalPost(slug) {
  const [state, setState] = useState({post: null, next: null, loading: true, notFound: false, error: null})
  useEffect(() => {
    let live = true
    setState({post: null, next: null, loading: true, notFound: false, error: null})
    sanity
      .fetch(POST_QUERY, {slug})
      .then((res) => {
        if (!live) return
        if (!res?.post) {
          setState({post: null, next: null, loading: false, notFound: true, error: null})
          return
        }
        const order = res.order || []
        const idx = order.findIndex((p) => p.slug === slug)
        const next = order.length ? order[(idx + 1) % order.length] : null
        setState({post: mapPost(res.post), next, loading: false, notFound: false, error: null})
      })
      .catch((error) => live && setState({post: null, next: null, loading: false, notFound: false, error}))
    return () => {
      live = false
    }
  }, [slug])
  return state
}
