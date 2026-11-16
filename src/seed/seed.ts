/**
 * Contenu fictif du site de démonstration. Les photos sont téléchargées
 * depuis Unsplash puis importées dans les médias.
 * Lancé par `pnpm seed` (src/seed/index.ts) ou par le bouton de l'admin.
 */
import type { CollectionSlug, Payload } from 'payload'

import { siteDefaults } from '../utilities/siteDefaults'

const contentCollections: CollectionSlug[] = [
  'bikes',
  'skis',
  'scooters',
  'team',
  'reviews',
  'faq',
  'prices',
  'opening-hours',
  'contact-info',
]

// Collections dont l'affichage suit un champ « order »
const orderedCollections: CollectionSlug[] = ['team', 'faq', 'prices', 'opening-hours']

const bikes = [
  { name: 'Gravel acier Randonneur 700', price: 890, kilometers: 2400, humanSize: 'm', photo: '1576435728678-68d0fbf94e91', description: 'Cadre acier, transmission 1×11 neuve, pneus 40 mm. Le vélo à tout faire, du bitume aux chemins blancs.' },
  { name: 'Route carbone Aero', price: 1450, kilometers: 6200, humanSize: 'l', photo: '1532298229144-0ec0c57515c7', description: 'Groupe 2×11, roues à jantes hautes, freins à disque. Roulements et câbles changés à l’atelier.' },
  { name: 'Single speed blanc', price: 390, kilometers: 1100, humanSize: 'm', photo: '1571068316344-75bc76f77890', description: 'Léger, simple, sans entretien. Selle et cintre en cuir d’origine.' },
  { name: 'VTT bikepacking 29 pouces', price: 1190, kilometers: 3800, humanSize: 'l', photo: '1511994298241-608e28f14fde', description: 'Fourche suspendue révisée, sacoches vendues avec. Prêt pour l’aventure.' },
  { name: 'Vélo de ville vert vintage', price: 260, kilometers: 5400, humanSize: 'm', photo: '1578509557315-37510239a203', description: 'Cadre années 80 repeint, éclairage dynamo et porte-bagages.' },
  { name: 'Hollandais à paniers', price: 320, kilometers: 2900, humanSize: 's', photo: '1625656006822-0f81e8380331', description: 'Position droite, moyeu 3 vitesses, deux paniers en osier.' },
  { name: 'Fat bike électrique', price: 1690, kilometers: 1800, humanSize: 'l', photo: '1624243519828-52a0f2c88af3', description: 'Batterie testée à 92 % de sa capacité, chargeur fourni. Passe partout, même dans la neige.' },
  { name: 'Randonneuse des années 70', price: 450, kilometers: 12000, humanSize: 'm', photo: '1570169043013-de63774bbf97', description: 'Restaurée pièce par pièce, cintre randonneur et garde-boue chromés.' },
  { name: 'Cruiser bordeaux', price: 210, kilometers: 3100, humanSize: 's', photo: '1523740856324-f2ce89135981', description: 'Pour les balades tranquilles. Frein rétropédalage et panier avant.' },
]

const skis = [
  { name: 'Skis de randonnée 168', price: 420, skiType: 'touring', size: 168, level: 'advanced', withBindings: true, photo: '1678815918041-658c2ba8c10c', description: 'Fixations à inserts réglées, peaux vendues avec.' },
  { name: 'Freeride 184', price: 380, skiType: 'freeride', size: 184, level: 'expert', withBindings: true, photo: '1759938049570-dd3f0c2f9c8d', description: 'Large au patin, semelle reprise et carres affûtées.' },
  { name: 'Snowboard all-mountain 156', price: 240, skiType: 'freestyle', size: 156, level: 'intermediate', withBindings: true, photo: '1760373899533-dcfe3baa5be0', description: 'Cambre hybride, fixations taille M.' },
  { name: 'Pack alpin piste 160', price: 190, skiType: 'alpine', size: 160, level: 'intermediate', withBindings: true, photo: '1706363447061-fc8a899b1dbc', description: 'Le pack idéal pour reprendre le ski. Fartage du jour.' },
]

const scooters = [
  { name: 'Trottinette électrique urbaine', price: 290, scooterType: 'urban', isElectric: true, maxSpeed: 25, range: 30, maxWeight: 100, photo: '1597260491619-bab87197869f', description: 'Batterie contrôlée, freins et pneus neufs.' },
  { name: 'Trottinette grandes roues', price: 95, scooterType: 'urban', isElectric: false, maxWeight: 100, photo: '1657008846502-e03a84f49baa', description: 'Roues de 200 mm, pliable, idéale pour le trajet gare-bureau.' },
  { name: 'Trottinette pliable adulte', price: 70, scooterType: 'urban', isElectric: false, maxWeight: 100, photo: '1591122519484-70428711810d', description: 'Légère et robuste, roulements changés.' },
]

const team = [
  { name: 'Michel Arvieux', role: 'Fondateur · mécanicien cycles', photo: '1778077128777-ccb864dc3ec3', description: 'Trente ans de vélo, dont dix à l’établi. Si ça grince, il trouve pourquoi.' },
  { name: 'Bernard Ollier', role: 'Skiman · atelier d’hiver', photo: '1794209166723-c328a59b5ab2', description: 'Ancien moniteur. Affûte, farte et règle les fixations comme personne.' },
  { name: 'Karim Benali', role: 'Mécanicien · roues & transmissions', photo: '1663575127036-ed7eb5c90eeb', description: 'Le spécialiste du dévoilage et des vitesses qui sautent.' },
]

const reviews = [
  { name: 'Léa B.', rating: 5, text: 'Mon vieux vélo de ville roule comme un neuf. Devis clair, prêt en deux jours.' },
  { name: 'Thomas R.', rating: 5, text: 'Acheté un gravel d’occasion : ils m’ont montré tout ce qu’ils avaient changé. Rare.' },
  { name: 'Inès M.', rating: 5, text: 'Skis affûtés et fartés la veille du départ, avec le sourire.' },
  { name: 'Paul D.', rating: 4, text: 'Très bons conseils pour choisir ma taille de cadre. Un peu d’attente le samedi.' },
  { name: 'Sophie L.', rating: 5, text: 'Ils ont sauvé ma trottinette électrique alors qu’on me conseillait d’en racheter une.' },
  { name: 'Hugo F.', rating: 5, text: 'L’atelier de quartier qu’on rêvait d’avoir. Prix honnêtes.' },
]

const faq = [
  { question: 'Faut-il prendre rendez-vous ?', answer: 'Pour une révision, c’est mieux : on vous garantit un créneau. Pour une crevaison ou un réglage rapide, passez directement.' },
  { question: 'Combien de temps garde-t-on mon vélo ?', answer: 'Une révision complète prend 48 h en moyenne. On vous prévient par SMS dès que c’est prêt.' },
  { question: 'Les occasions sont-elles garanties ?', answer: 'Oui, tout ce qu’on vend est garanti 3 mois, pièces et main-d’œuvre.' },
  { question: 'Rachetez-vous le matériel ?', answer: 'Oui, ou on le prend en dépôt-vente. Apportez-le, on fait une estimation sur place.' },
  { question: 'Réparez-vous les vélos électriques ?', answer: 'Toute la partie cycle, oui. Pour les moteurs, on diagnostique et on vous oriente vers le service de la marque si besoin.' },
  { question: 'Quand déposer mes skis pour l’hiver ?', answer: 'Dès novembre, pour éviter la file des premières neiges. Le forfait affûtage + fartage est prêt en 48 h.' },
]

const prices = [
  { label: 'Diagnostic', price: 0, time: '10 min' },
  { label: 'Révision complète vélo', price: 65, time: '2 h' },
  { label: 'Réglage des freins', price: 15, time: '20 min' },
  { label: 'Réglage des vitesses', price: 20, time: '30 min' },
  { label: 'Crevaison (chambre comprise)', price: 15, time: '15 min' },
  { label: 'Dévoilage de roue', price: 20, time: '30 min' },
  { label: 'Changement de chaîne', price: 12, time: '15 min' },
  { label: 'Affûtage + fartage skis', price: 35, time: '48 h' },
  { label: 'Réglage des fixations', price: 15, time: '15 min' },
  { label: 'Révision trottinette électrique', price: 45, time: '1 h' },
]

const hours = [
  { day: 'lundi', isClosed: true },
  { day: 'mardi', openTime: '9h30', closeTime: '19h00' },
  { day: 'mercredi', openTime: '9h30', closeTime: '19h00' },
  { day: 'jeudi', openTime: '9h30', closeTime: '19h00' },
  { day: 'vendredi', openTime: '9h30', closeTime: '19h00' },
  { day: 'samedi', openTime: '9h00', closeTime: '18h00' },
  { day: 'dimanche', isClosed: true },
]

async function uploadPhoto(payload: Payload, id: string, alt: string) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=jpg&q=80&w=1600`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Téléchargement impossible : ${url} (${response.status})`)
  const data = Buffer.from(await response.arrayBuffer())

  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data, mimetype: 'image/jpeg', name: `unsplash-${id}.jpg`, size: data.length },
  })
  return media.id
}

async function seedCollection<T extends Record<string, unknown>>(
  payload: Payload,
  slug: CollectionSlug,
  items: T[],
  photoField?: 'photo',
) {
  const existing = await payload.count({ collection: slug })
  if (existing.totalDocs > 0) {
    payload.logger.info(`${slug} : déjà rempli, ignoré`)
    return
  }

  for (const [index, item] of items.entries()) {
    const data: Record<string, unknown> = { ...item }
    if (orderedCollections.includes(slug)) data.order = index
    if (photoField && typeof item.photo === 'string') {
      data[photoField] = await uploadPhoto(payload, item.photo, String(item.name ?? ''))
    }
    await payload.create({ collection: slug, data: data as never })
  }
  payload.logger.info(`${slug} : ${items.length} ajouté(s)`)
}

export async function seed(payload: Payload, { reset = false } = {}) {
  if (reset) {
    for (const slug of [...contentCollections, 'media' as CollectionSlug]) {
      await payload.delete({ collection: slug, where: { id: { exists: true } } })
    }
    payload.logger.info('Collections vidées')
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: siteDefaults,
    context: { disableRevalidate: true },
  })

  await seedCollection(payload, 'bikes', bikes, 'photo')
  await seedCollection(payload, 'skis', skis, 'photo')
  await seedCollection(payload, 'scooters', scooters, 'photo')
  await seedCollection(payload, 'team', team, 'photo')
  await seedCollection(payload, 'reviews', reviews)
  await seedCollection(payload, 'faq', faq)
  await seedCollection(payload, 'prices', prices)
  await seedCollection(payload, 'opening-hours', hours)
  await seedCollection(payload, 'contact-info', [
    {
      address: '12 passage du Dérailleur',
      postalCode: '38000',
      city: siteDefaults.city,
      country: 'France',
      phone: '04 65 71 38 20',
      email: 'bonjour@col-et-cadre.example',
      socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com' },
    },
  ])

  payload.logger.info('Contenu de démonstration prêt')
}
