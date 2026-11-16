import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight, ArrowUpRight, Plus, Star } from 'lucide-react'

import { getSiteSettings } from '@/utilities/siteData'
import { photos, unsplash } from '@/utilities/photos'
import { mediaUrl } from '@/utilities/mediaUrl'

const services = [
  'Révision complète',
  'Réglage des freins',
  'Dévoilage de roue',
  'Affûtage des carres',
  'Fartage',
  'Changement de chaîne',
  'Montage pneus',
  'Diagnostic offert',
]

const categories = [
  {
    href: '/shop?cat=bikes',
    title: 'Vélos',
    text: 'Route, gravel, VTT, ville, électriques. Révisés et garantis 3 mois.',
    photo: photos.gravelBike,
    tag: 'Printemps → automne',
  },
  {
    href: '/shop?cat=skis',
    title: 'Skis & snowboards',
    text: 'Alpin, rando, freeride. Semelles reprises, carres affûtées, fixations réglées.',
    photo: photos.skiRack,
    tag: 'Décembre → avril',
  },
  {
    href: '/shop?cat=scooters',
    title: 'Trottinettes',
    text: 'Électriques ou à pousser. Batterie testée, freins contrôlés.',
    photo: photos.scooter,
    tag: 'Toute l’année',
  },
]

const steps = [
  { title: 'Diagnostic', text: "On regarde ensemble ce qui cloche. C'est gratuit et ça prend dix minutes." },
  { title: 'Devis clair', text: 'Un prix ferme avant de toucher une vis. Pas de surprise au moment de payer.' },
  { title: 'Réparation', text: "Pièces d'origine ou d'occasion contrôlée, selon votre budget." },
  { title: 'Essai & garantie', text: "On essaie avant de rendre. Chaque intervention est garantie 3 mois." },
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const [settings, reviewsData, faqData] = await Promise.all([
    getSiteSettings(),
    payload.find({ collection: 'reviews', limit: 6, sort: '-createdAt', depth: 1 }),
    payload.find({ collection: 'faq', limit: 8, sort: 'order' }),
  ])
  const reviews = reviewsData.docs
  const faq = faqData.docs
  const years = new Date().getFullYear() - settings.foundedYear

  return (
    <>
      {/* Accueil */}
      <section className="relative overflow-hidden">
        <div className="container grid gap-10 pt-10 pb-16 md:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-24">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="tag text-pine">
              <span className="h-px w-8 bg-pine" />
              Atelier & boutique · {settings.city} · depuis {settings.foundedYear}
            </p>
            <h1 className="display mt-6 text-[clamp(3rem,8vw,6.5rem)] text-ink">{settings.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">{settings.heroText}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-pine-deep"
              >
                Voir les occasions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact#rendez-vous"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 font-semibold text-ink transition-colors hover:border-ink"
              >
                Déposer mon vélo à l&apos;atelier
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/15 pt-6">
              {[
                ['48 h', 'pour une révision'],
                ['3 mois', 'de garantie'],
                [`${years} ans`, "d'atelier"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-3xl font-bold text-ink">{value}</dt>
                  <dd className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-deep">
              <Image
                src={unsplash(photos.heroWorkshop, 1200)}
                alt="Un mécanicien règle un vélo sur le pied d'atelier"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Ticket d'atelier */}
            <div className="absolute -bottom-6 left-4 right-4 sm:left-auto sm:-left-10 sm:right-auto sm:w-72 rotate-[-2deg] rounded-xl bg-signal p-5 text-ink shadow-[0_20px_40px_-20px_rgba(21,32,27,0.6)]">
              <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider">
                <span>Ticket atelier</span>
                <span>N° 0427</span>
              </div>
              <p className="mt-3 font-display text-xl font-bold leading-tight">Gravel acier · révision complète</p>
              <div className="mt-4 flex items-center justify-between border-t border-dashed border-ink/40 pt-3 font-mono text-xs">
                <span>Prêt jeudi 17h</span>
                <span className="rounded-full bg-ink px-2 py-0.5 text-signal">OK ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau des prestations */}
      <section className="overflow-hidden border-y border-ink bg-ink py-4 text-paper" aria-label="Prestations de l'atelier">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 motion-reduce:animate-none">
          {[...services, ...services].map((service, index) => (
            <span key={index} className="flex items-center gap-10 font-display text-2xl font-semibold whitespace-nowrap">
              {service}
              <span className="h-2.5 w-2.5 rotate-45 bg-signal" aria-hidden="true" />
            </span>
          ))}
        </div>
      </section>

      {/* Catégories */}
      <section className="container py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="tag text-pine">La boutique d&apos;occasion</p>
            <h2 className="display mt-4 text-5xl md:text-6xl">Trois saisons, un seul atelier.</h2>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 font-semibold link-underline">
            Tout le stock <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.href} href={category.href} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-paper-deep">
                <Image
                  src={unsplash(category.photo, 900)}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink backdrop-blur">
                  {category.tag}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="mt-2 text-ink/70 leading-relaxed">{category.text}</p>
                </div>
                <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-pine group-hover:bg-pine group-hover:text-paper">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* L'atelier */}
      <section className="bg-pine text-paper contours">
        <div className="container grid gap-14 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="tag text-signal">L&apos;atelier</p>
            <h2 className="display mt-4 text-5xl md:text-6xl">Ce qui passe par l&apos;établi en ressort réglé.</h2>
            <ol className="mt-12 space-y-0">
              {steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-paper/15 py-6">
                  <span className="font-mono text-sm text-signal">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-paper/70 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/prices"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Voir les tarifs de l&apos;atelier
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl">
              <Image src={unsplash(photos.toolWall, 1200)} alt="Le mur d'outils de l'atelier" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image src={unsplash(photos.wheelTruing, 700)} alt="Dévoilage d'une roue" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image src={unsplash(photos.bootWall, 700)} alt="Chaussures de ski rangées à l'atelier" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Promesse seconde main */}
      <section className="relative isolate overflow-hidden">
        <Image src={unsplash(photos.switchbacks, 2000)} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/55 to-transparent" />
        <div className="container py-28 md:py-40 text-paper">
          <p className="tag text-signal">Seconde main, première classe</p>
          <h2 className="display mt-5 max-w-3xl text-5xl md:text-7xl">Une occasion, c&apos;est un vélo neuf qui a déjà fait ses preuves.</h2>
          <p className="mt-6 max-w-xl text-lg text-paper/80 leading-relaxed">
            Tout ce qu&apos;on vend est démonté, nettoyé, révisé et essayé. On vous dit ce qu&apos;on a changé, et on le garantit.
          </p>
        </div>
      </section>

      {/* Avis */}
      {reviews.length > 0 && (
        <section className="container py-20 md:py-28">
          <p className="tag text-pine">Ils en parlent</p>
          <h2 className="display mt-4 max-w-2xl text-5xl md:text-6xl">Ils roulent, et glissent, avec nous.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => {
              const image = mediaUrl(review.image)
              return (
                <figure key={review.id} className="flex flex-col rounded-3xl border border-border bg-card p-7">
                  <div className="flex gap-1 text-signal" aria-label={`${review.rating} sur 5`}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className={`h-4 w-4 ${index < review.rating ? 'fill-current' : 'opacity-25'}`} />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-ink/85">« {review.text} »</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    {image ? (
                      <Image src={image} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-glacier font-display font-bold text-pine">
                        {review.name.charAt(0)}
                      </span>
                    )}
                    <span className="font-semibold">{review.name}</span>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </section>
      )}

      {/* Questions */}
      {faq.length > 0 && (
        <section className={reviews.length > 0 ? 'container pb-20 md:pb-28' : 'container py-20 md:py-28'}>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="tag text-pine">Questions fréquentes</p>
              <h2 className="display mt-4 text-5xl">Avant de passer.</h2>
              <p className="mt-5 text-ink/70 leading-relaxed">
                Pas trouvé votre réponse ?{' '}
                <Link href="/contact" className="font-semibold text-pine underline underline-offset-4">
                  Écrivez-nous
                </Link>
                , on répond dans la journée.
              </p>
            </div>
            <div className="lg:col-span-8 divide-y divide-border border-y border-border">
              {faq.map((item) => (
                <details key={item.id} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-6 pr-10 text-ink/75 leading-relaxed whitespace-pre-line">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Appel final */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2rem] bg-signal px-8 py-14 md:px-14 md:py-20">
          <div className="hazard absolute inset-y-0 right-0 hidden w-24 opacity-90 md:block" aria-hidden="true" />
          <div className="max-w-2xl">
            <h2 className="display text-5xl md:text-6xl text-ink">Un bruit bizarre dans le pédalier ?</h2>
            <p className="mt-5 text-lg text-ink/80">Passez le déposer ou réservez un créneau. Le diagnostic est offert.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact#rendez-vous" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper">
                Prendre rendez-vous
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/prices" className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3.5 font-semibold text-ink">
                Voir les tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const revalidate = 60
