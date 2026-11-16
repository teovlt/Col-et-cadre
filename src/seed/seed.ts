/**
 * Contenu fictif du site de démonstration. Les photos sont téléchargées
 * depuis Unsplash puis importées dans les médias.
 * Lancé par `pnpm seed` (src/seed/index.ts) ou par le bouton de l'admin.
 */
import type { CollectionSlug, Payload } from 'payload'

import { siteDefaults } from '../utilities/siteDefaults'
import {
  demoBikes,
  demoContact,
  demoFaq,
  demoHours,
  demoPrices,
  demoReviews,
  demoScooters,
  demoSkis,
  demoTeam,
} from '../demo/content'

const contentCollections: CollectionSlug[] = [
  'bikes',
  'skis',
  'scooters',
  'team',
  'reviews',
  'faq',
  'prices',
  'opening-hours',
  'contact-info',
]

// Collections dont l'affichage suit un champ « order »
const orderedCollections: CollectionSlug[] = ['team', 'faq', 'prices', 'opening-hours']

async function uploadPhoto(payload: Payload, id: string, alt: string) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=jpg&q=80&w=1600`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Téléchargement impossible : ${url} (${response.status})`)
  const data = Buffer.from(await response.arrayBuffer())

  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data, mimetype: 'image/jpeg', name: `unsplash-${id}.jpg`, size: data.length },
  })
  return media.id
}

async function seedCollection<T extends Record<string, unknown>>(
  payload: Payload,
  slug: CollectionSlug,
  items: T[],
  photoField?: 'photo',
) {
  const existing = await payload.count({ collection: slug })
  if (existing.totalDocs > 0) {
    payload.logger.info(`${slug} : déjà rempli, ignoré`)
    return
  }

  for (const [index, item] of items.entries()) {
    const data: Record<string, unknown> = { ...item }
    if (orderedCollections.includes(slug)) data.order = index
    if (photoField && typeof item.photo === 'string') {
      data[photoField] = await uploadPhoto(payload, item.photo, String(item.name ?? ''))
    }
    await payload.create({ collection: slug, data: data as never })
  }
  payload.logger.info(`${slug} : ${items.length} ajouté(s)`)
}

export async function seed(payload: Payload, { reset = false } = {}) {
  if (reset) {
    for (const slug of [...contentCollections, 'media' as CollectionSlug]) {
      await payload.delete({ collection: slug, where: { id: { exists: true } } })
    }
    payload.logger.info('Collections vidées')
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: siteDefaults,
    context: { disableRevalidate: true },
  })

  await seedCollection(payload, 'bikes', demoBikes, 'photo')
  await seedCollection(payload, 'skis', demoSkis, 'photo')
  await seedCollection(payload, 'scooters', demoScooters, 'photo')
  await seedCollection(payload, 'team', demoTeam, 'photo')
  await seedCollection(payload, 'reviews', demoReviews)
  await seedCollection(payload, 'faq', demoFaq)
  await seedCollection(payload, 'prices', demoPrices)
  await seedCollection(payload, 'opening-hours', demoHours)
  await seedCollection(payload, 'contact-info', [demoContact])

  payload.logger.info('Contenu de démonstration prêt')
}
