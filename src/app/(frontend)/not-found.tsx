import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col justify-center py-20">
      <p className="tag text-pine">Erreur 404</p>
      <h1 className="display mt-5 max-w-3xl text-6xl md:text-8xl">Crevaison : cette page n&apos;existe pas.</h1>
      <p className="mt-6 max-w-lg text-lg text-ink/70">Elle a peut-être été vendue, ou l&apos;adresse a sauté une vitesse.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3.5 font-semibold text-paper">
          Retour à l&apos;accueil
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 font-semibold">
          Voir la boutique
        </Link>
      </div>
    </section>
  )
}
