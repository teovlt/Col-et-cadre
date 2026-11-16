import { getContactInfo, getSiteSettings } from '@/utilities/siteData'

// Hébergement du site : à adapter selon l'endroit où il est déployé
const hosting = {
  name: 'Serveur privé administré par Téo Villet',
  details: 'Déploiement Docker',
}

export default async function LegalPage() {
  const [settings, contact] = await Promise.all([getSiteSettings(), getContactInfo()])

  const sections = [
    {
      title: 'Éditeur du site',
      body: settings.demoNotice ? (
        <>
          <p>
            Ce site est un <strong>site de démonstration</strong>. {settings.name} est un commerce fictif : les noms,
            adresses, produits, prix, membres de l&apos;équipe et avis présentés sont inventés. Aucune commande ni
            demande envoyée depuis ce site n&apos;est traitée.
          </p>
          <p>
            Éditeur et directeur de la publication : Téo Villet, développeur web indépendant,{' '}
            <a href="https://teovillet.fr" className="font-semibold text-pine underline underline-offset-4">
              teovillet.fr
            </a>
            .
          </p>
        </>
      ) : (
        <p>
          {settings.name}, {contact.address}, {contact.postalCode} {contact.city}. Téléphone : {contact.phone}. E-mail :{' '}
          {contact.email}.
        </p>
      ),
    },
    {
      title: 'Hébergement',
      body: (
        <p>
          {hosting.name}. {hosting.details}.
        </p>
      ),
    },
    {
      title: 'Conception et développement',
      body: (
        <p>
          Téo Villet ·{' '}
          <a href="https://teovillet.fr" className="font-semibold text-pine underline underline-offset-4">
            teovillet.fr
          </a>
          . Next.js, Payload CMS, Tailwind CSS.
        </p>
      ),
    },
    {
      title: 'Crédits photo',
      body: <p>Photographies issues d&apos;Unsplash, utilisées selon la licence Unsplash.</p>,
    },
    {
      title: 'Données personnelles',
      body: (
        <p>
          Le site ne dépose aucun cookie publicitaire ni de mesure d&apos;audience. Les informations saisies dans le
          formulaire de contact ne sont ni enregistrées ni transmises. Conformément au RGPD, vous pouvez exercer vos droits
          d&apos;accès, de rectification et d&apos;effacement en écrivant à l&apos;éditeur, et adresser une réclamation à
          la CNIL.
        </p>
      ),
    },
    {
      title: 'Propriété intellectuelle',
      body: (
        <p>
          Les textes, le logo et la mise en page de ce site appartiennent à leur auteur. Les photographies restent la
          propriété de leurs photographes respectifs.
        </p>
      ),
    },
  ]

  return (
    <section className="container max-w-4xl pt-12 md:pt-20">
      <p className="tag text-pine">
        <span className="h-px w-8 bg-pine" />
        Informations légales
      </p>
      <h1 className="display mt-5 text-6xl md:text-7xl">Mentions légales.</h1>
      <div className="mt-14 divide-y divide-border border-y border-border">
        {sections.map((section) => (
          <div key={section.title} className="grid gap-4 py-8 md:grid-cols-[14rem_1fr]">
            <h2 className="text-xl font-bold">{section.title}</h2>
            <div className="space-y-3 text-ink/80 leading-relaxed">{section.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export const metadata = {
  title: 'Mentions légales',
}
