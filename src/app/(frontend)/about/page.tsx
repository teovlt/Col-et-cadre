import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight } from 'lucide-react'

import { getSiteSettings } from '@/utilities/siteData'
import { mediaUrl } from '@/utilities/mediaUrl'
import { photos, unsplash } from '@/utilities/photos'

const values = [
  {
    title: 'Réparer avant de remplacer',
    text: "Une chaîne se nettoie, une roue se dévoile, une semelle se rebouche. On ne change une pièce que si elle est vraiment finie.",
  },
  {
    title: 'Dire ce qu’on fait',
    text: 'Chaque ticket d’atelier liste ce qui a été contrôlé, réglé ou changé. Vous repartez en sachant tout.',
  },
  {
    title: 'Des prix de quartier',
    text: 'On préfère vous revoir chaque saison que vous facturer une fois trop cher.',
  },
]

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })
  const [settings, { docs: team }] = await Promise.all([
    getSiteSettings(),
    payload.find({ collection: 'team', limit: 20, sort: 'order', depth: 1 }),
  ])

  return (
    <>
      <section className="container pt-12 pb-16 md:pt-20">
        <p className="tag text-pine">
          <span className="h-px w-8 bg-pine" />
          L&apos;équipe · depuis {settings.foundedYear}
        </p>
        <h1 className="display mt-5 max-w-5xl text-6xl md:text-8xl">Des mécanos qui roulent l&apos;été et skient l&apos;hiver.</h1>
      </section>

      <section className="container grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:col-span-7">
          <Image src={unsplash(photos.bikeShop, 1400)} alt="La boutique et ses vélos d'occasion" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-5 space-y-5 text-lg text-ink/80 leading-relaxed">
          <h2 className="display text-4xl text-ink">Notre histoire</h2>
          <p>
            {settings.name} a ouvert en {settings.foundedYear} à {settings.city}, dans un ancien garage. L&apos;idée : un
            atelier où l&apos;on répare ce qui peut l&apos;être, et où le matériel d&apos;occasion repart en meilleur état
            qu&apos;il n&apos;est arrivé.
          </p>
          <p>
            L&apos;été, l&apos;établi est couvert de vélos. Dès les premières neiges, les skis prennent le relais. Les
            trottinettes, elles, passent toute l&apos;année.
          </p>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <div key={value.title} className="rounded-[2rem] border border-border bg-card p-8">
              <span className="font-mono text-sm text-pine">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-2xl font-bold">{value.title}</h3>
              <p className="mt-3 text-ink/70 leading-relaxed">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {team.length > 0 && (
        <section className="bg-pine text-paper contours">
          <div className="container py-20 md:py-28">
            <p className="tag text-signal">À l&apos;établi</p>
            <h2 className="display mt-4 text-5xl md:text-6xl">Ceux qui vont s&apos;occuper de votre matériel.</h2>
            <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => {
                const photo = mediaUrl(member.photo, 'medium')
                return (
                  <li key={member.id}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-pine-deep">
                      {photo && (
                        <Image src={photo} alt={member.name} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                      )}
                    </div>
                    <p className="tag mt-5 text-signal">{member.role}</p>
                    <h3 className="mt-2 text-2xl font-bold">{member.name}</h3>
                    <p className="mt-2 text-paper/70 leading-relaxed">{member.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      <section className="container pt-20 md:pt-28">
        <div className="flex flex-col items-start gap-6 border-t border-ink pt-10 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-2xl text-5xl">Passez nous voir, le café est toujours chaud.</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-pine px-6 py-4 font-semibold text-paper">
            Nous trouver
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}

export const revalidate = 60

export const metadata = {
  title: "L'équipe",
  description: "L'histoire de l'atelier et l'équipe de mécaniciens vélo et ski.",
}
