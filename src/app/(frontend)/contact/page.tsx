import { getContactInfo, getOpeningHours } from '@/utilities/siteData'
import { ContactClient } from './ContactClient'

export default async function ContactPage() {
  const [contact, hours] = await Promise.all([getContactInfo(), getOpeningHours()])

  return (
    <>
      <section className="container pt-12 pb-14 md:pt-20">
        <p className="tag text-pine">
          <span className="h-px w-8 bg-pine" />
          Contact & rendez-vous
        </p>
        <h1 className="display mt-5 max-w-4xl text-6xl md:text-8xl">Passez à l&apos;atelier.</h1>
      </section>

      <section className="container grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-[2rem] bg-ink p-8 text-paper">
            <p className="tag text-signal">Adresse</p>
            <p className="mt-4 font-display text-3xl font-bold leading-tight">
              {contact.address}
              <br />
              {contact.postalCode} {contact.city}
            </p>
            <div className="mt-6 flex flex-col gap-2 border-t border-paper/15 pt-6">
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="font-mono text-lg hover:text-signal">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="break-all hover:text-signal">
                {contact.email}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-8">
            <p className="tag text-pine">Horaires</p>
            <ul className="mt-5 divide-y divide-border">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between py-2.5">
                  <span className="font-medium">{h.day}</span>
                  <span className={`font-mono text-sm ${h.isClosed ? 'text-muted-foreground' : ''}`}>{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border">
            <iframe
              title="Plan d'accès"
              src="https://www.openstreetmap.org/export/embed.html?bbox=5.70%2C45.17%2C5.75%2C45.20&layer=mapnik"
              className="h-72 w-full grayscale-[0.3]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-7" id="rendez-vous">
          <ContactClient />
        </div>
      </section>
    </>
  )
}


export const metadata = {
  title: 'Contact & rendez-vous',
  description: "Adresse, horaires et prise de rendez-vous à l'atelier.",
}
