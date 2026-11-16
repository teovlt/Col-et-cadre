import type { Media } from '@/payload-types'

/** URL d'un champ upload Payload, ou null s'il n'est pas peuplé */
export const mediaUrl = (media: string | Media | null | undefined, size?: keyof NonNullable<Media['sizes']>) => {
  if (!media || typeof media === 'string') return null
  return (size && media.sizes?.[size]?.url) || media.url || null
}
