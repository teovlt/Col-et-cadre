import type { GlobalConfig } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import { authenticated } from '../access/authenticated'
import { siteDefaults } from '../utilities/siteDefaults'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Identité du site',
  admin: {
    description:
      "Le nom du commerce et les textes principaux. Une modification s'applique à tout le site : en-tête, pied de page, titres des pages et mentions légales.",
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identité',
          fields: [
            {
              name: 'name',
              label: 'Nom du commerce',
              type: 'text',
              required: true,
              defaultValue: siteDefaults.name,
              admin: {
                description: 'Affiché à côté du logo. Une esperluette (&) est mise en valeur automatiquement.',
              },
            },
            {
              name: 'tagline',
              label: 'Slogan',
              type: 'text',
              required: true,
              defaultValue: siteDefaults.tagline,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  label: 'Ville',
                  type: 'text',
                  required: true,
                  defaultValue: siteDefaults.city,
                },
                {
                  name: 'foundedYear',
                  label: "Année d'ouverture",
                  type: 'number',
                  required: true,
                  defaultValue: siteDefaults.foundedYear,
                  min: 1900,
                  max: 2100,
                },
              ],
            },
          ],
        },
        {
          label: 'Accueil',
          fields: [
            {
              name: 'heroTitle',
              label: "Titre de la page d'accueil",
              type: 'text',
              required: true,
              defaultValue: siteDefaults.heroTitle,
            },
            {
              name: 'heroText',
              label: "Texte d'introduction",
              type: 'textarea',
              required: true,
              defaultValue: siteDefaults.heroText,
            },
          ],
        },
        {
          label: 'Référencement',
          fields: [
            {
              name: 'description',
              label: 'Description pour Google',
              type: 'textarea',
              required: true,
              defaultValue: siteDefaults.description,
              admin: { description: 'Environ 150 caractères. Apparaît sous le titre dans les résultats de recherche.' },
            },
          ],
        },
        {
          label: 'Démonstration',
          fields: [
            {
              name: 'demoNotice',
              label: 'Afficher la mention « site de démonstration »',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description:
                  'À laisser coché tant que le commerce est fictif : la mention apparaît dans le pied de page et les mentions légales.',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (!context.disableRevalidate) {
          revalidateTag('global_site-settings')
          revalidatePath('/', 'layout')
        }
        return doc
      },
    ],
  },
}
