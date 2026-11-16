import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { siteDefaults, type SiteSettingsData } from './siteDefaults'

export type ContactData = {
  address: string
  postalCode: string
  city: string
  phone: string
  email: string
  socialLinks: { instagram?: string; facebook?: string }
}

export type OpeningHour = { day: string; short: string; hours: string; isClosed: boolean }

const DAYS: Record<string, [string, string]> = {
  lundi: ['Lundi', 'Lun'],
  mardi: ['Mardi', 'Mar'],
  mercredi: ['Mercredi', 'Mer'],
  jeudi: ['Jeudi', 'Jeu'],
  vendredi: ['Vendredi', 'Ven'],
  samedi: ['Samedi', 'Sam'],
  dimanche: ['Dimanche', 'Dim'],
}

// Coordonnées fictives : numéro de la plage réservée aux fictions par l'ARCEP,
// domaine .example réservé
const contactDefaults: ContactData = {
  address: '12 passage du Dérailleur',
  postalCode: '38000',
  city: siteDefaults.city,
  phone: '04 65 71 38 20',
  email: 'bonjour@col-et-cadre.example',
  socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com' },
}

const hoursDefaults: OpeningHour[] = [
  { day: 'Lundi', short: 'Lun', hours: 'Fermé', isClosed: true },
  { day: 'Mardi', short: 'Mar', hours: '9h30 – 19h00', isClosed: false },
  { day: 'Mercredi', short: 'Mer', hours: '9h30 – 19h00', isClosed: false },
  { day: 'Jeudi', short: 'Jeu', hours: '9h30 – 19h00', isClosed: false },
  { day: 'Vendredi', short: 'Ven', hours: '9h30 – 19h00', isClosed: false },
  { day: 'Samedi', short: 'Sam', hours: '9h00 – 18h00', isClosed: false },
  { day: 'Dimanche', short: 'Dim', hours: 'Fermé', isClosed: true },
]

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsData> => {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
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
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'contact-info', limit: 1 })
  const doc = docs[0]
  if (!doc) return contactDefaults

  return {
    address: doc.address || contactDefaults.address,
    postalCode: doc.postalCode || contactDefaults.postalCode,
    city: doc.city || contactDefaults.city,
    phone: doc.phone || contactDefaults.phone,
    email: doc.email || contactDefaults.email,
    socialLinks: {
      instagram: doc.socialLinks?.instagram || undefined,
      facebook: doc.socialLinks?.facebook || undefined,
    },
  }
}

export async function getOpeningHours(): Promise<OpeningHour[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'opening-hours', limit: 7, sort: 'order' })
  if (docs.length === 0) return hoursDefaults

  return docs.map((hour) => {
    const [day, short] = DAYS[hour.day] ?? [hour.day, hour.day.slice(0, 3)]
    return {
      day,
      short,
      hours: hour.isClosed ? 'Fermé' : `${hour.openTime || ''} – ${hour.closeTime || ''}`,
      isClosed: hour.isClosed ?? false,
    }
  })
}
