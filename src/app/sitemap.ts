import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getServerSideURL()
  return ['', '/shop', '/prices', '/about', '/contact', '/legal'].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === '/shop' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))
}
