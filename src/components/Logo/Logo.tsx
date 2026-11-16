import clsx from 'clsx'
import React, { useId } from 'react'

type Tone = 'color' | 'light'

/**
 * Pictogramme : une roue, deux sommets enneigés et la route en lacets
 * qui monte au col, en jaune signalisation.
 */
export const LogoMark = ({ className, tone = 'color' }: { className?: string; tone?: Tone }) => {
  const clipId = useId()
  const ring = tone === 'light' ? 'var(--paper)' : 'var(--ink)'

  return (
    <svg viewBox="0 0 48 48" className={clsx('shrink-0', className)} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="24" cy="24" r="19.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="48" height="48" fill="var(--glacier)" />
        <path d="M2 36 L17 15 L23 23 L30 14 L46 36 V48 H2 Z" fill="var(--pine)" />
        <path d="M17 15 L21.3 21 L19.2 20 L17 21.8 L15 19.9 L12.9 20.9 Z" fill="var(--paper)" />
        <path d="M30 14 L34.4 20.2 L32.2 19.3 L30 21.2 L27.9 19.5 L25.7 20.3 Z" fill="var(--paper)" />
        <path
          d="M24 46 C33 43 14 40 25 36.5 C33 34 18 32.5 24 29"
          fill="none"
          stroke="var(--signal)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
      <circle cx="24" cy="24" r="21" fill="none" stroke={ring} strokeWidth="3" />
    </svg>
  )
}

/** Le nom du commerce, avec l'esperluette mise en valeur s'il y en a une */
export const Wordmark = ({ name, className }: { name: string; className?: string }) => {
  const parts = name.split(/(\s*&\s*)/)

  return (
    <span className={clsx('font-display font-extrabold uppercase tracking-[0.01em] leading-none', className)}>
      {parts.map((part, index) =>
        part.trim() === '&' ? (
          <span key={index} className="mx-[0.22em] font-semibold italic text-[0.9em] opacity-80">
            &amp;
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </span>
  )
}

export const Logo = ({
  name,
  className,
  tone = 'color',
  markClassName = 'h-9 w-9',
  textClassName = 'text-2xl',
}: {
  name: string
  className?: string
  tone?: Tone
  markClassName?: string
  textClassName?: string
}) => (
  <span className={clsx('inline-flex items-center gap-2.5', className)}>
    <LogoMark tone={tone} className={markClassName} />
    <Wordmark name={name} className={textClassName} />
  </span>
)
