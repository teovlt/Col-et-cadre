'use client'

import React, { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import clsx from 'clsx'

import { useSite } from '@/providers/Site'

const equipment = ['Vélo', 'Skis / snowboard', 'Trottinette', 'Autre']
const reasons = ['Révision', 'Réparation', 'Achat d’occasion', 'Question']

const fieldClass =
  'w-full rounded-xl border border-ink/15 bg-paper px-4 py-3.5 text-ink placeholder:text-ink/40 focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/20'

export function ContactClient() {
  const { settings } = useSite()
  const [kind, setKind] = useState(equipment[0])
  const [reason, setReason] = useState(reasons[0])
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="flex h-full flex-col justify-center rounded-[2rem] bg-pine p-10 text-paper contours">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal text-ink">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="display mt-8 text-5xl">C&apos;est noté !</h2>
        <p className="mt-4 max-w-md text-lg text-paper/80">
          On vous rappelle dans la journée pour caler le créneau.
          {settings.demoNotice && ' (Site de démonstration : aucune demande n’est réellement envoyée.)'}
        </p>
        <button type="button" onClick={() => setSent(false)} className="mt-8 self-start font-semibold underline underline-offset-4">
          Faire une autre demande
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setSent(true)
      }}
      className="rounded-[2rem] border border-border bg-card p-7 md:p-10"
    >
      <h2 className="display text-4xl md:text-5xl">Réserver un créneau</h2>
      <p className="mt-3 text-ink/70">Diagnostic offert. On confirme le rendez-vous par téléphone.</p>

      <fieldset className="mt-8">
        <legend className="tag text-pine">Votre matériel</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {equipment.map((option) => (
            <Chip key={option} selected={kind === option} onClick={() => setKind(option)}>
              {option}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="tag text-pine">Pour</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {reasons.map((option) => (
            <Chip key={option} selected={reason === option} onClick={() => setReason(option)}>
              {option}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Nom</span>
          <input required name="name" autoComplete="name" className={fieldClass} placeholder="Camille Martin" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Téléphone</span>
          <input required name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="06 12 34 56 78" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold">Jour souhaité</span>
          <input name="date" type="date" className={fieldClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold">Ce qui se passe</span>
          <textarea
            name="message"
            rows={4}
            className={fieldClass}
            placeholder="Ex. : les vitesses sautent à l’arrière, et le frein avant grince."
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pine px-6 py-4 font-semibold text-paper transition-colors hover:bg-pine-deep sm:w-auto"
      >
        Envoyer la demande
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={clsx(
        'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
        selected ? 'border-pine bg-pine text-paper' : 'border-ink/15 hover:border-ink/40',
      )}
    >
      {children}
    </button>
  )
}
