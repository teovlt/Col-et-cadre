/**
 * Remplit la base avec le contenu de démonstration, en local :
 *
 *   pnpm seed          ajoute le contenu (les collections déjà remplies sont ignorées)
 *   pnpm seed --reset  vide d'abord les collections du site
 *
 * En production, utiliser le bouton du tableau de bord de l'admin : les
 * photos sont alors enregistrées sur le serveur.
 */
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { seed } from './seed'

// `payload run` quitte dès que le module est chargé : on attend donc ici la fin du seed
try {
  const payload = await getPayload({ config: configPromise })
  await seed(payload, { reset: process.argv.includes('--reset') })
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
