'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div>
    Contenu ajouté ! Vous pouvez{' '}
    <a target="_blank" href="/">
      voir le site
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('Le contenu a déjà été ajouté.')
        return
      }
      if (loading) {
        toast.info('Remplissage déjà en cours.')
        return
      }
      if (error) {
        toast.error('Une erreur est survenue, rechargez la page et réessayez.')
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject('Le remplissage a échoué.')
                  }
                })
                .catch((error) => {
                  reject(error)
                })
            } catch (error) {
              reject(error)
            }
          }),
          {
            loading: 'Téléchargement des photos et ajout du contenu…',
            success: <SuccessMessage />,
            error: 'Le remplissage a échoué.',
          },
        )
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
      }
    },
    [loading, seeded, error],
  )

  let message = ''
  if (loading) message = ' (en cours…)'
  if (seeded) message = ' (terminé)'
  if (error) message = ` (erreur : ${error})`

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        Remplir avec le contenu de démonstration
      </button>
      {message}
    </Fragment>
  )
}
