'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { ArrowRight, Bike, Mountain, Zap } from 'lucide-react'
import clsx from 'clsx'

import { useSite } from '@/providers/Site'

export type ShopCategory = 'bikes' | 'skis' | 'scooters'

export type ShopItem = {
  id: string
  category: ShopCategory
  name: string
  price: number
  image: string | null
  description: string | null
  specs: string[]
}

const categoryMeta: Record<ShopCategory, { label: string; icon: typeof Bike }> = {
  bikes: { label: 'Vélos', icon: Bike },
  skis: { label: 'Skis & snowboards', icon: Mountain },
  scooters: { label: 'Trottinettes', icon: Zap },
}

type Sort = 'recent' | 'price-asc' | 'price-desc'

const formatPrice = (price: number) =>
  price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export function ShopClient({ items }: { items: ShopItem[] }) {
  const { contact } = useSite()
  const router = useRouter()
  const searchParams = useSearchParams()
  const requested = searchParams.get('cat')
  const active: ShopCategory | 'all' = requested && requested in categoryMeta ? (requested as ShopCategory) : 'all'
  const [sort, setSort] = useState<Sort>('recent')

  const counts = useMemo(
    () =>
      items.reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + 1
        return acc
      }, {}),
    [items],
  )

  const visible = useMemo(() => {
    const filtered = active === 'all' ? items : items.filter((item) => item.category === active)
    if (sort === 'recent') return filtered
    return [...filtered].sort((a, b) => (sort === 'price-asc' ? a.price - b.price : b.price - a.price))
  }, [items, active, sort])

  const selectCategory = (category: ShopCategory | 'all') => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') params.delete('cat')
    else params.set('cat', category)
    router.replace(`/shop${params.size ? `?${params}` : ''}`, { scroll: false })
  }

  return (
    <>
      <section className="container pt-12 pb-10 md:pt-20">
        <p className="tag text-pine">
          <span className="h-px w-8 bg-pine" />
          {items.length} article{items.length > 1 ? 's' : ''} en stock
        </p>
        <h1 className="display mt-5 text-6xl md:text-8xl">La boutique.</h1>
        <p className="mt-5 max-w-xl text-lg text-ink/70 leading-relaxed">
          Tout est passé par l&apos;atelier : démonté, nettoyé, révisé, essayé. Garanti 3 mois, pièces et main-d&apos;œuvre.
        </p>
      </section>

      <div className="sticky top-[4.5rem] z-30 border-y border-border bg-paper/95 backdrop-blur">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Catégories">
            {(['all', 'bikes', 'skis', 'scooters'] as const).map((category) => {
              const selected = active === category
              const label = category === 'all' ? 'Tout' : categoryMeta[category].label
              const count = category === 'all' ? items.length : counts[category] ?? 0
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectCategory(category)}
                  className={clsx(
                    'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                    selected ? 'border-ink bg-ink text-paper' : 'border-ink/15 text-ink hover:border-ink/40',
                  )}
                >
                  {label}
                  <span className={clsx('font-mono text-xs', selected ? 'text-signal' : 'text-muted-foreground')}>{count}</span>
                </button>
              )
            })}
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Trier
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="rounded-full border border-ink/15 bg-transparent px-3 py-2 font-medium text-ink"
            >
              <option value="recent">Arrivages récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </label>
        </div>
      </div>

      <section className="container py-10 md:py-14">
        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-ink/25 px-6 py-20 text-center">
            <h2 className="text-3xl font-bold">Rien en stock pour l&apos;instant.</h2>
            <p className="mt-3 text-ink/70">
              Les arrivages changent chaque semaine. Appelez-nous au{' '}
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="font-mono font-semibold">
                {contact.phone}
              </a>
              , on vous prévient.
            </p>
          </div>
        ) : (
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => {
              const Icon = categoryMeta[item.category].icon
              return (
                <li key={item.id} className="group flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-paper-deep">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-ink/25">
                        <Icon className="h-16 w-16" />
                      </div>
                    )}
                    {/* Étiquette de prix accrochée */}
                    <div className="absolute right-4 top-4 rotate-3 rounded-lg bg-signal px-3 py-2 text-ink shadow-md">
                      <span className="font-display text-xl font-extrabold">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="tag text-pine">
                      <Icon className="h-3.5 w-3.5" />
                      {categoryMeta[item.category].label}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold leading-tight">{item.name}</h2>
                    {item.description && <p className="mt-2 line-clamp-2 text-ink/70 leading-relaxed">{item.description}</p>}
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.specs.map((spec) => (
                        <li key={spec} className="rounded-full border border-ink/15 px-3 py-1 font-mono text-xs text-ink/80">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        <div className="mt-20 grid gap-6 rounded-[2rem] bg-pine p-8 text-paper contours md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <h2 className="display text-4xl md:text-5xl">Un modèle en tête ?</h2>
            <p className="mt-3 max-w-lg text-paper/75">
              Dites-nous ce que vous cherchez, votre taille et votre budget. On vous appelle dès qu&apos;un vélo ou une paire
              de skis correspond.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-4 font-semibold text-ink"
          >
            Lancer une recherche
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
