import { Suspense } from 'react'

import { getCatalog } from '@/utilities/siteData'
import { ShopClient } from './ShopClient'

export default async function ShopPage() {
  const items = await getCatalog()

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
