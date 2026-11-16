import { Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { mediaUrl } from '@/utilities/mediaUrl'
import { ShopClient, type ShopItem } from './ShopClient'

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

export default async function ShopPage() {
  const payload = await getPayload({ config: configPromise })
  const [bikes, skis, scooters] = await Promise.all([
    payload.find({ collection: 'bikes', limit: 100, depth: 1, sort: '-createdAt' }),
    payload.find({ collection: 'skis', limit: 100, depth: 1, sort: '-createdAt' }),
    payload.find({ collection: 'scooters', limit: 100, depth: 1, sort: '-createdAt' }),
  ])

  const items: ShopItem[] = [
    ...bikes.docs.map((bike) => ({
      id: bike.id,
      category: 'bikes' as const,
      name: bike.name,
      price: bike.price,
      image: mediaUrl(bike.photo, 'medium'),
      description: bike.description ?? null,
      specs: [`Taille ${sizeLabels[bike.humanSize] ?? bike.humanSize}`, `${bike.kilometers.toLocaleString('fr-FR')} km`],
    })),
    ...skis.docs.map((ski) => ({
      id: ski.id,
      category: 'skis' as const,
      name: ski.name,
      price: ski.price,
      image: mediaUrl(ski.photo, 'medium'),
      description: ski.description ?? null,
      specs: [
        skiTypeLabels[ski.skiType] ?? ski.skiType,
        `${ski.size} cm`,
        levelLabels[ski.level] ?? ski.level,
        ...(ski.withBindings ? ['Avec fixations'] : []),
      ],
    })),
    ...scooters.docs.map((scooter) => ({
      id: scooter.id,
      category: 'scooters' as const,
      name: scooter.name,
      price: scooter.price,
      image: mediaUrl(scooter.photo, 'medium'),
      description: scooter.description ?? null,
      specs: [
        scooterTypeLabels[scooter.scooterType] ?? scooter.scooterType,
        ...(scooter.isElectric ? ['Électrique'] : ['À pousser']),
        ...(scooter.isElectric && scooter.maxSpeed ? [`${scooter.maxSpeed} km/h`] : []),
        ...(scooter.isElectric && scooter.range ? [`${scooter.range} km d'autonomie`] : []),
      ],
    })),
  ]

  // useSearchParams (filtre par catégorie) demande une frontière Suspense
  return (
    <Suspense>
      <ShopClient items={items} />
    </Suspense>
  )
}

export const metadata = {
  title: 'Boutique',
  description: "Vélos, skis, snowboards et trottinettes d'occasion, révisés à l'atelier et garantis 3 mois.",
}

export const revalidate = 60
