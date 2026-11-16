import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { ShopItem } from '@/app/(frontend)/shop/ShopClient'
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
} from '@/demo/content'
import { mediaUrl } from './mediaUrl'
import { unsplash } from './photos'
import { siteDefaults, type SiteSettingsData } from './siteDefaults'

/*
 * Accès aux données du site. Tant qu'une collection est vide en base, le
 * contenu de démonstration (src/demo/content.ts) est affiché à la place :
 * le site est complet dès le premier déploiement.
 */

export type ContactData = {
  address: string
  postalCode: string
  city: string
  phone: string
  email: string
  socialLinks: { instagram?: string; facebook?: string }
}

export type OpeningHour = { day: string; short: string; hours: string; isClosed: boolean }
export type Review = { id: string; name: string; rating: number; text: string; image: string | null }
export type FaqItem = { id: string; question: string; answer: string }
export type PriceItem = { id: string; label: string; price: number; time: string }
export type TeamMember = { id: string; name: string; role: string; description: string; photo: string | null }

const DAYS: Record<string, [string, string]> = {
  lundi: ['Lundi', 'Lun'],
  mardi: ['Mardi', 'Mar'],
  mercredi: ['Mercredi', 'Mer'],
  jeudi: ['Jeudi', 'Jeu'],
  vendredi: ['Vendredi', 'Ven'],
  samedi: ['Samedi', 'Sam'],
  dimanche: ['Dimanche', 'Dim'],
}

const sizeLabels: Record<string, string> = { xs: 'XS', s: 'S', m: 'M', l: 'L', xl: 'XL' }
const skiTypeLabels: Record<string, string> = {
  alpine: 'Alpin',
  freestyle: 'Freestyle',
  freeride: 'Freeride',
  'cross-country': 'Fond',
  touring: 'Randonnée',
}
const levelLabels: Record<string, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Confirmé',
  expert: 'Expert',
}
const scooterTypeLabels: Record<string, string> = {
  urban: 'Urbaine',
  freestyle: 'Freestyle',
  offroad: 'Tout-terrain',
  kids: 'Enfant',
}

const demoPhoto = (id: string) => unsplash(id, 900, 675)

const formatHour = (day: string, isClosed?: boolean | null, openTime?: string | null, closeTime?: string | null): OpeningHour => {
  const [label, short] = DAYS[day] ?? [day, day.slice(0, 3)]
  return { day: label, short, hours: isClosed ? 'Fermé' : `${openTime || ''} – ${closeTime || ''}`, isClosed: Boolean(isClosed) }
}

const payload = () => getPayload({ config: configPromise })

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsData> => {
    const settings = await (await payload()).findGlobal({ slug: 'site-settings' }).catch(() => null)
    return {
      name: settings?.name || siteDefaults.name,
      tagline: settings?.tagline || siteDefaults.tagline,
      city: settings?.city || siteDefaults.city,
      foundedYear: settings?.foundedYear || siteDefaults.foundedYear,
      heroTitle: settings?.heroTitle || siteDefaults.heroTitle,
      heroText: settings?.heroText || siteDefaults.heroText,
      description: settings?.description || siteDefaults.description,
      demoNotice: settings?.demoNotice ?? siteDefaults.demoNotice,
    }
  },
  ['site-settings'],
  { tags: ['global_site-settings'] },
)

export async function getContactInfo(): Promise<ContactData> {
  const { docs } = await (await payload()).find({ collection: 'contact-info', limit: 1 })
  const doc = docs[0]
  const pick = (value: string | null | undefined, fallback: string) => value || fallback

  return {
    address: pick(doc?.address, demoContact.address),
    postalCode: pick(doc?.postalCode, demoContact.postalCode),
    city: pick(doc?.city, demoContact.city),
    phone: pick(doc?.phone, demoContact.phone),
    email: pick(doc?.email, demoContact.email),
    socialLinks: doc
      ? { instagram: doc.socialLinks?.instagram || undefined, facebook: doc.socialLinks?.facebook || undefined }
      : demoContact.socialLinks,
  }
}

export async function getOpeningHours(): Promise<OpeningHour[]> {
  const { docs } = await (await payload()).find({ collection: 'opening-hours', limit: 7, sort: 'order' })
  if (docs.length === 0) return demoHours.map((h) => formatHour(h.day, h.isClosed, h.openTime, h.closeTime))
  return docs.map((h) => formatHour(h.day, h.isClosed, h.openTime, h.closeTime))
}

export async function getReviews(limit = 6): Promise<Review[]> {
  const { docs } = await (await payload()).find({ collection: 'reviews', limit, sort: '-createdAt', depth: 1 })
  if (docs.length === 0) {
    return demoReviews.slice(0, limit).map((review, index) => ({ id: `demo-${index}`, ...review, image: null }))
  }
  return docs.map((review) => ({
    id: review.id,
    name: review.name,
    rating: review.rating,
    text: review.text,
    image: mediaUrl(review.image, 'thumbnail'),
  }))
}

export async function getFaq(): Promise<FaqItem[]> {
  const { docs } = await (await payload()).find({ collection: 'faq', limit: 50, sort: 'order' })
  if (docs.length === 0) return demoFaq.map((item, index) => ({ id: `demo-${index}`, ...item }))
  return docs.map(({ id, question, answer }) => ({ id, question, answer }))
}

export async function getPrices(): Promise<PriceItem[]> {
  const { docs } = await (await payload()).find({ collection: 'prices', limit: 100, sort: 'order' })
  if (docs.length === 0) return demoPrices.map((item, index) => ({ id: `demo-${index}`, ...item }))
  return docs.map(({ id, label, price, time }) => ({ id, label, price, time }))
}

export async function getTeam(): Promise<TeamMember[]> {
  const { docs } = await (await payload()).find({ collection: 'team', limit: 20, sort: 'order', depth: 1 })
  if (docs.length === 0) {
    return demoTeam.map(({ photo, ...member }, index) => ({ id: `demo-${index}`, ...member, photo: unsplash(photo, 800, 1000) }))
  }
  return docs.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    description: member.description,
    photo: mediaUrl(member.photo, 'medium'),
  }))
}

/** Le stock de la boutique : chaque catégorie vide est remplacée par celle de démonstration */
export async function getCatalog(): Promise<ShopItem[]> {
  const client = await payload()
  const [bikes, skis, scooters] = await Promise.all([
    client.find({ collection: 'bikes', limit: 100, depth: 1, sort: '-createdAt' }),
    client.find({ collection: 'skis', limit: 100, depth: 1, sort: '-createdAt' }),
    client.find({ collection: 'scooters', limit: 100, depth: 1, sort: '-createdAt' }),
  ])

  const bikeItems: ShopItem[] = (
    bikes.docs.length > 0
      ? bikes.docs.map((bike) => ({ ...bike, image: mediaUrl(bike.photo, 'medium') }))
      : demoBikes.map((bike, index) => ({ ...bike, id: `demo-bike-${index}`, image: demoPhoto(bike.photo) }))
  ).map((bike) => ({
    id: bike.id,
    category: 'bikes',
    name: bike.name,
    price: bike.price,
    image: bike.image,
    description: bike.description ?? null,
    specs: [`Taille ${sizeLabels[bike.humanSize] ?? bike.humanSize}`, `${bike.kilometers.toLocaleString('fr-FR')} km`],
  }))

  const skiItems: ShopItem[] = (
    skis.docs.length > 0
      ? skis.docs.map((ski) => ({ ...ski, image: mediaUrl(ski.photo, 'medium') }))
      : demoSkis.map((ski, index) => ({ ...ski, id: `demo-ski-${index}`, image: demoPhoto(ski.photo) }))
  ).map((ski) => ({
    id: ski.id,
    category: 'skis',
    name: ski.name,
    price: ski.price,
    image: ski.image,
    description: ski.description ?? null,
    specs: [
      skiTypeLabels[ski.skiType] ?? ski.skiType,
      `${ski.size} cm`,
      levelLabels[ski.level] ?? ski.level,
      ...(ski.withBindings ? ['Avec fixations'] : []),
    ],
  }))

  const scooterItems: ShopItem[] = (
    scooters.docs.length > 0
      ? scooters.docs.map((scooter) => ({ ...scooter, image: mediaUrl(scooter.photo, 'medium') }))
      : demoScooters.map((scooter, index) => ({ ...scooter, id: `demo-scooter-${index}`, image: demoPhoto(scooter.photo) }))
  ).map((scooter) => ({
    id: scooter.id,
    category: 'scooters',
    name: scooter.name,
    price: scooter.price,
    image: scooter.image,
    description: scooter.description ?? null,
    specs: [
      scooterTypeLabels[scooter.scooterType] ?? scooter.scooterType,
      scooter.isElectric ? 'Électrique' : 'À pousser',
      ...(scooter.isElectric && scooter.maxSpeed ? [`${scooter.maxSpeed} km/h`] : []),
      ...(scooter.isElectric && scooter.range ? [`${scooter.range} km d'autonomie`] : []),
    ],
  }))

  return [...bikeItems, ...skiItems, ...scooterItems]
}
