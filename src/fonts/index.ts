import localFont from 'next/font/local'

// Polices hébergées dans le dépôt (licence SIL Open Font License) : le build
// n'a pas besoin de joindre Google Fonts, ce qui échoue sur certains serveurs.
// Barlow s'inspire des panneaux routiers : la version condensée pour les titres.

export const display = localFont({
  variable: '--font-display',
  display: 'swap',
  src: [
    { path: './BarlowCondensed-500.woff2', weight: '500', style: 'normal' },
    { path: './BarlowCondensed-600.woff2', weight: '600', style: 'normal' },
    { path: './BarlowCondensed-600-italic.woff2', weight: '600', style: 'italic' },
    { path: './BarlowCondensed-700.woff2', weight: '700', style: 'normal' },
    { path: './BarlowCondensed-800.woff2', weight: '800', style: 'normal' },
  ],
})

export const body = localFont({
  variable: '--font-body',
  display: 'swap',
  src: [
    { path: './Barlow-400.woff2', weight: '400', style: 'normal' },
    { path: './Barlow-500.woff2', weight: '500', style: 'normal' },
    { path: './Barlow-600.woff2', weight: '600', style: 'normal' },
    { path: './Barlow-700.woff2', weight: '700', style: 'normal' },
  ],
})

export const mono = localFont({
  variable: '--font-mono',
  display: 'swap',
  src: [
    { path: './DMMono-400.woff2', weight: '400', style: 'normal' },
    { path: './DMMono-500.woff2', weight: '500', style: 'normal' },
  ],
})
