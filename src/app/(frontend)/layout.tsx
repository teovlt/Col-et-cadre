import React from 'react'
import { Barlow, Barlow_Condensed, DM_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getContactInfo, getOpeningHours, getSiteSettings } from '@/utilities/siteData'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { SiteProvider } from '@/providers/Site'

import '../globals.css'

// Barlow s'inspire des panneaux routiers : la version condensée pour les titres
const display = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

const body = Barlow({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const mono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

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
