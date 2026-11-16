import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'
import type { Payload } from 'payload'

import { siteDefaults } from '@/utilities/siteDefaults'
import { SeedButton } from './SeedButton'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard = async ({ payload }: { payload: Payload }) => {
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  const name = settings?.name || siteDefaults.name

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Bienvenue sur l&apos;espace de gestion de {name}</h4>
      </Banner>
      <p style={{ marginTop: '1rem' }}>
        Base vide ? <SeedButton /> ajoute les produits, l&apos;équipe, les avis, la FAQ, les tarifs et les horaires de
        démonstration. Les sections déjà remplies ne sont pas touchées.
      </p>
      <p style={{ marginTop: '1rem' }}>Depuis cet espace, vous pouvez gérer :</p>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Identité du site</strong> - Nom du commerce, slogan, ville et textes de l&apos;accueil
        </li>
        <li>
          <strong>Vélos</strong> - Ajouter, modifier ou supprimer les vélos en vente
        </li>
        <li>
          <strong>Skis</strong> - Gérer les skis disponibles
        </li>
        <li>
          <strong>Trottinettes</strong> - Gérer les trottinettes en stock
        </li>
        <li>
          <strong>Avis clients</strong> - Gérer les témoignages affichés sur le site
        </li>
        <li>
          <strong>FAQ</strong> - Mettre à jour les questions fréquentes
        </li>
        <li>
          <strong>Équipe</strong> - Présenter les membres de votre équipe
        </li>
        <li>
          <strong>Horaires</strong> - Définir vos horaires d'ouverture
        </li>
        <li>
          <strong>Tarifs</strong> - Gérer les tarifs des prestations
        </li>
        <li>
          <strong>Médias</strong> - Gérer toutes les images du site
        </li>
      </ul>
      <p style={{ marginTop: '1rem', color: 'var(--theme-elevation-500)' }}>
        Astuce : le menu de gauche donne accès à toutes les sections.
      </p>
    </div>
  )
}

export default BeforeDashboard
