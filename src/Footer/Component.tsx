'use client'

import Link from 'next/link'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import { Logo, Wordmark } from '@/components/Logo/Logo'
import { navLinks } from '@/Header/Component'
import { useSite } from '@/providers/Site'

export function Footer() {
  const { settings, contact, hours } = useSite()
  const socials = Object.entries(contact.socialLinks).filter(([, url]) => Boolean(url)) as [string, string][]

  return (
    <footer className="mt-24 bg-pine-deep text-paper">
      <div className="hazard h-2" aria-hidden="true" />
      <div className="contours">
        <div className="container py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Logo name={settings.name} tone="light" markClassName="h-12 w-12" textClassName="text-3xl" />
              <p className="mt-5 max-w-sm text-paper/70 leading-relaxed">
                {settings.tagline}. Atelier de réparation et boutique à {settings.city}, depuis {settings.foundedYear}.
              </p>
              <Link
                href="/contact#rendez-vous"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Prendre rendez-vous à l&apos;atelier
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="md:col-span-3">
              <p className="tag text-signal">L&apos;atelier</p>
              <address className="mt-4 not-italic space-y-1.5 text-paper/80">
                <p>{contact.address}</p>
                <p>
                  {contact.postalCode} {contact.city}
                </p>
                <p className="pt-3">
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="font-mono hover:text-signal">
                    {contact.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${contact.email}`} className="hover:text-signal break-all">
                    {contact.email}
                  </a>
                </p>
              </address>
              {socials.length > 0 && (
                <div className="mt-5 flex gap-4 text-sm">
                  {socials.map(([network, url]) => (
                    <a key={network} href={url} target="_blank" rel="noopener noreferrer" className="capitalize link-underline">
                      {network}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <p className="tag text-signal">Horaires</p>
              <ul className="mt-4 space-y-1.5 font-mono text-sm">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-paper/60">{h.short}</span>
                    <span className={h.isClosed ? 'text-paper/40' : ''}>{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <nav className="md:col-span-2" aria-label="Pied de page">
              <p className="tag text-signal">Plan</p>
              <ul className="mt-4 space-y-1.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-paper/80 hover:text-paper link-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/legal" className="text-paper/80 hover:text-paper link-underline">
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div aria-hidden="true" className="mt-16 select-none overflow-hidden text-paper/[0.07]">
            <Wordmark name={settings.name} className="block whitespace-nowrap text-[18vw] md:text-[12.5vw] leading-[0.8]" />
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/55 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {settings.name}
            </p>
            {settings.demoNotice && (
              <p>
                Site de démonstration : {settings.name} est un commerce fictif. Réalisé par{' '}
                <a href="https://teovillet.fr" target="_blank" rel="noopener noreferrer" className="text-paper underline underline-offset-2">
                  Téo Villet
                </a>
                . Photos : Unsplash.
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
