'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import clsx from 'clsx'

import { Logo } from '@/components/Logo/Logo'
import { OpenStatus } from '@/components/OpenStatus'
import { useSite } from '@/providers/Site'

export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/shop', label: 'Boutique' },
  { href: '/prices', label: 'Atelier & tarifs' },
  { href: '/about', label: "L'équipe" },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const { settings, contact } = useSite()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <div className="bg-ink text-paper">
        <div className="container flex h-9 items-center justify-between gap-4 text-xs">
          <OpenStatus />
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hidden sm:inline-flex items-center gap-2 font-mono hover:text-signal transition-colors">
            <Phone className="h-3.5 w-3.5" />
            {contact.phone}
          </a>
        </div>
      </div>

      <header
        className={clsx(
          'sticky top-0 z-40 border-b bg-paper/95 backdrop-blur transition-shadow',
          scrolled ? 'border-border shadow-[0_8px_24px_-18px_rgba(21,32,27,0.45)]' : 'border-transparent',
        )}
      >
        <div className="container flex h-[4.5rem] items-center gap-8">
          <Link href="/" className="text-ink" aria-label={`${settings.name}, accueil`}>
            <Logo name={settings.name} markClassName="h-10 w-10" textClassName="text-[1.45rem] sm:text-[1.6rem]" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 ml-auto" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="link-underline py-1 text-[0.95rem] font-medium text-ink/80 hover:text-ink aria-[current=page]:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact#rendez-vous"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-deep"
          >
            Prendre rendez-vous
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ml-auto lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        className={clsx(
          'fixed inset-0 z-50 flex flex-col bg-pine text-paper contours transition-[opacity,visibility] duration-300 lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="container flex h-[4.5rem] items-center justify-between">
          <Logo name={settings.name} tone="light" markClassName="h-10 w-10" textClassName="text-[1.45rem]" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/25"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="container mt-6 flex flex-col" aria-label="Navigation mobile">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-baseline gap-4 border-b border-paper/15 py-4 font-display text-4xl font-bold tracking-tight"
            >
              <span className="font-mono text-xs text-signal">{String(index + 1).padStart(2, '0')}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="container mt-auto pb-10 flex flex-col gap-3">
          <Link
            href="/contact#rendez-vous"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-4 font-semibold text-ink"
          >
            Prendre rendez-vous
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href={`tel:${contact.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/30 px-6 py-4 font-mono"
          >
            <Phone className="h-4 w-4" />
            {contact.phone}
          </a>
        </div>
      </div>
    </>
  )
}
