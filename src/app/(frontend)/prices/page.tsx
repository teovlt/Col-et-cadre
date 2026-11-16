import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight, Check } from 'lucide-react'

import { photos, unsplash } from '@/utilities/photos'

const formatPrice = (price: number) =>
  price === 0 ? 'Offert' : price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

const promises = [
  'Diagnostic offert, devis avant toute intervention',
  'Pièces facturées au prix affiché, sans marge cachée',
  'Essai systématique avant de vous rendre le matériel',
  'Garantie 3 mois sur chaque intervention',
]

export default async function PricesPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: prices } = await payload.find({ collection: 'prices', limit: 100, sort: 'order' })

  return (
    <>
      <section className="container grid gap-10 pt-12 pb-16 md:pt-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="tag text-pine">
            <span className="h-px w-8 bg-pine" />
            L&apos;atelier
          </p>
          <h1 className="display mt-5 text-6xl md:text-8xl">Des prix affichés, comme au tableau.</h1>
        </div>
        <p className="lg:col-span-5 text-lg text-ink/70 leading-relaxed">
          Main-d&apos;œuvre comprise, pièces en sus. Vous savez ce que vous payez avant qu&apos;on sorte la première clé.
        </p>
      </section>

      <section className="container grid gap-10 lg:grid-cols-12">
        {/* Le tableau de l'atelier */}
        <div className="lg:col-span-8 overflow-hidden rounded-[2rem] bg-ink text-paper">
          <div className="flex items-center justify-between border-b border-paper/10 px-6 py-5 md:px-10">
            <p className="tag text-signal">Tarifs main-d&apos;œuvre</p>
            <p className="font-mono text-xs text-paper/50">TTC</p>
          </div>
          {prices.length === 0 ? (
            <p className="px-6 py-16 text-center text-paper/60 md:px-10">Les tarifs seront bientôt affichés ici.</p>
          ) : (
            <table className="w-full">
              <thead className="sr-only">
                <tr>
                  <th>Prestation</th>
                  <th>Durée</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((price) => (
                  <tr key={price.id} className="border-b border-paper/10 last:border-0">
                    <td className="py-5 pl-6 pr-4 md:pl-10">
                      <span className="font-display text-lg font-semibold md:text-xl">{price.label}</span>
                    </td>
                    <td className="hidden py-5 pr-4 font-mono text-sm text-paper/55 sm:table-cell whitespace-nowrap">{price.time}</td>
                    <td className="py-5 pr-6 text-right md:pr-10">
                      <span className="font-display text-xl font-extrabold text-signal whitespace-nowrap md:text-2xl">
                        {formatPrice(price.price)}
                      </span>
                      <span className="block font-mono text-xs text-paper/45 sm:hidden">{price.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:aspect-auto lg:flex-1">
            <Image src={unsplash(photos.brakeAdjust, 900)} alt="Réglage des freins sur le pied d'atelier" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
          </div>
          <div className="rounded-[2rem] border border-border bg-card p-7">
            <h2 className="text-2xl font-bold">Nos engagements</h2>
            <ul className="mt-5 space-y-3">
              {promises.map((promise) => (
                <li key={promise} className="flex gap-3 text-ink/80">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="container mt-20">
        <div className="grid gap-8 rounded-[2rem] bg-glacier p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <p className="tag text-pine">Forfait saison</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Vos skis prêts avant la première neige.</h2>
            <p className="mt-3 max-w-xl text-ink/75">
              Déposez-les en novembre : affûtage, fartage et contrôle des fixations, prêts en 48 h.
            </p>
          </div>
          <Link href="/contact#rendez-vous" className="inline-flex items-center justify-center gap-2 rounded-full bg-pine px-6 py-4 font-semibold text-paper">
            Réserver un créneau
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}


export const metadata = {
  title: 'Atelier & tarifs',
  description: "Tarifs de l'atelier : révision, réglages, réparation de vélos, skis et trottinettes. Devis offert.",
}
