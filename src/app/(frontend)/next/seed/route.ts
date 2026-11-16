import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'

import { seed } from '@/seed/seed'

// Le téléchargement des photos Unsplash peut prendre une minute
export const maxDuration = 120

// Appelé par le bouton du tableau de bord : réservé aux utilisateurs connectés
export async function POST(): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    return new Response('Action réservée aux administrateurs.', { status: 403 })
  }

  try {
    await seed(payload)
    revalidatePath('/', 'layout')
    return Response.json({ success: true })
  } catch (error) {
    payload.logger.error({ err: error, message: 'Échec du remplissage de la base' })
    return new Response('Le remplissage a échoué, voir les journaux du serveur.', { status: 500 })
  }
}
