import Link from 'next/link'
import { Barlow, Barlow_Condensed } from 'next/font/google'

import './globals.css'

const display = Barlow_Condensed({ subsets: ['latin'], variable: '--font-display', weight: ['800'] })
const body = Barlow({ subsets: ['latin'], variable: '--font-body', weight: ['400', '600'] })

// 404 en dehors du site public (admin, API) : pas de header ni de footer
export default function NotFound() {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <main className="container flex min-h-screen flex-col justify-center py-20">
          <p className="tag text-pine">Erreur 404</p>
          <h1 className="display mt-5 text-6xl md:text-8xl">Page introuvable.</h1>
          <Link href="/" className="mt-10 self-start rounded-full bg-pine px-6 py-3.5 font-semibold text-paper">
            Retour à l&apos;accueil
          </Link>
        </main>
      </body>
    </html>
  )
}
