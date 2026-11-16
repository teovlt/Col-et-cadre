// Valeurs utilisées tant que rien n'est enregistré dans l'admin
export const siteDefaults = {
  name: 'Col & Cadre',
  tagline: 'Vélos, skis et trottinettes de seconde main',
  city: 'Grenoble',
  foundedYear: 2014,
  heroTitle: 'Du col à la piste, on remet tout en selle.',
  heroText:
    "Atelier de réparation et boutique d'occasion. Chaque vélo, chaque paire de skis passe par l'établi avant de repartir : révisé, réglé, garanti.",
  description:
    "Atelier de réparation et boutique de vélos, skis et trottinettes d'occasion, révisés et garantis.",
  demoNotice: true,
}

export type SiteSettingsData = typeof siteDefaults
