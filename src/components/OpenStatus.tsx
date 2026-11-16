'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import { useSite } from '@/providers/Site'

// Jours dans l'ordre de Date.getDay() (0 = dimanche)
const WEEK = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

const toMinutes = (value: string) => {
  const match = value.match(/(\d{1,2})\s*[h:]\s*(\d{2})?/)
  return match ? Number(match[1]) * 60 + Number(match[2] ?? 0) : null
}

type Status = { open: boolean; label: string }

export function OpenStatus({ className }: { className?: string }) {
  const { hours } = useSite()
  // Calculé côté navigateur uniquement, pour utiliser l'heure du visiteur
  const [status, setStatus] = useState<Status | null>(null)

  useEffect(() => {
    const now = new Date()
    const today = hours.find((h) => h.day === WEEK[now.getDay()])
    const minutes = now.getHours() * 60 + now.getMinutes()

    if (today && !today.isClosed) {
      const [from, to] = today.hours.split(/[–-]/).map((part) => toMinutes(part))
      if (from !== null && to !== null && minutes >= from && minutes < to) {
        setStatus({ open: true, label: `Ouvert maintenant · jusqu'à ${today.hours.split(/[–-]/)[1].trim()}` })
        return
      }
    }

    // Prochain jour ouvert (aujourd'hui si on est avant l'ouverture)
    for (let offset = 0; offset < 7; offset++) {
      const day = hours.find((h) => h.day === WEEK[(now.getDay() + offset) % 7])
      if (!day || day.isClosed) continue
      const opening = day.hours.split(/[–-]/)[0].trim()
      const openingMinutes = toMinutes(opening)
      if (offset === 0 && (openingMinutes === null || minutes >= openingMinutes)) continue
      const when = offset === 0 ? "aujourd'hui" : offset === 1 ? 'demain' : day.day.toLowerCase()
      setStatus({ open: false, label: `Fermé · ouvre ${when} à ${opening}` })
      return
    }
    setStatus(null)
  }, [hours])

  return (
    <span className={clsx('inline-flex items-center gap-2 font-mono', className)} aria-live="polite">
      <span
        className={clsx(
          'h-2 w-2 rounded-full',
          status === null ? 'bg-paper/30' : status.open ? 'bg-[#5ed38b] shadow-[0_0_0_3px_rgba(94,211,139,0.25)]' : 'bg-signal',
        )}
      />
      {status?.label ?? 'Horaires de la semaine'}
    </span>
  )
}
