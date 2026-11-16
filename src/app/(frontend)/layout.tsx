import React from 'react'
import type { Metadata, Viewport } from 'next'

import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getContactInfo, getOpeningHours, getSiteSettings } from '@/utilities/siteData'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { SiteProvider } from '@/providers/Site'
import { body, display, mono } from '@/fonts'

import '../globals.css'

// Pages rendues à la demande : le contenu vient de la base, qui n'est pas
// joignable pendant le build Docker. Le global « Identité » reste en cache.
export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f4436',
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: {
      default: `${settings.name} · ${settings.tagline}`,
      template: `%s · ${settings.name}`,
    },
    description: settings.description,
    metadataBase: new URL(getServerSideURL()),
    openGraph: mergeOpenGraph({ siteName: settings.name, title: settings.name, description: settings.description }),
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.png' }],
      apple: '/favicon.png',
    },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [settings, contact, hours] = await Promise.all([getSiteSettings(), getContactInfo(), getOpeningHours()])

  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SiteProvider value={{ settings, contact, hours }}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SiteProvider>
      </body>
    </html>
  )
}
