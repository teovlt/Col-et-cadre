# Col & Cadre

> **Site de démonstration.** Col & Cadre est un commerce fictif : noms, produits, prix, équipe et avis sont inventés. Réalisé par [Téo Villet](https://teovillet.fr). Photos : Unsplash.

Site d'un atelier de réparation et d'une boutique de vélos, skis et trottinettes d'occasion, avec un espace de gestion pour le commerçant.

- **Front** : Next.js 15 (App Router), Tailwind CSS
- **Admin et API** : Payload CMS 3, en français
- **Base** : MongoDB

Le nom du commerce, le slogan, la ville et les textes de l'accueil se changent dans l'admin, onglet **Identité du site**. Produits, équipe, avis, FAQ, tarifs, horaires et coordonnées ont chacun leur section.

## Direction artistique

| | |
| --- | --- |
| Couleurs | Sapin `#1f4436`, crème `#f3eee3`, encre `#15201b`, jaune signalisation `#f2b705`, glacier `#bbd5db` |
| Typos | Barlow Condensed (titres), Barlow (texte), DM Mono (étiquettes, prix) |
| Logo | `src/components/Logo/Logo.tsx` : une roue, deux sommets, la route en lacets ; le nom à côté vient de l'admin |

## En local

```bash
pnpm install
cp .env.example .env   # renseigner DATABASE_URI et PAYLOAD_SECRET
pnpm dev               # http://localhost:3000, admin sur /admin
pnpm seed              # contenu de démonstration (pnpm seed --reset pour repartir de zéro)
```

Sans `BLOB_READ_WRITE_TOKEN`, les médias sont enregistrés dans `public/media` (ou dans `MEDIA_DIR` s'il est défini).

## Déploiement sur Dokploy

L'image est construite à partir du `Dockerfile`. Les pages sont rendues à la demande, donc la base n'a pas besoin d'être joignable pendant le build.

1. **Base de données** : dans le projet Dokploy, *Create Service → Database → MongoDB*. Une fois créée, copier l'**Internal Connection URL**.
2. **Application** : *Create Service → Application*, source GitHub (ce dépôt, branche `main`), *Build Type* : **Dockerfile**.
3. **Environment** :

   ```env
   DATABASE_URI=mongodb://UTILISATEUR:MOT_DE_PASSE@HOTE_INTERNE:27017/col-et-cadre?authSource=admin
   PAYLOAD_SECRET=…        # openssl rand -hex 32
   NEXT_PUBLIC_SERVER_URL=https://votre-domaine.fr
   CRON_SECRET=…           # openssl rand -hex 32
   PREVIEW_SECRET=…        # openssl rand -hex 32
   ```

4. **Build-time arguments** : `NEXT_PUBLIC_SERVER_URL=https://votre-domaine.fr` (la valeur est figée dans le code au build).
5. **Advanced → Volumes** : un *Volume Mount* monté sur **`/app/media`**. Sans lui, les photos envoyées disparaissent à chaque déploiement.
6. **Domains** : le domaine, port du conteneur **3000**, HTTPS avec Let's Encrypt. Côté DNS, un enregistrement A vers l'IP du VPS.
7. **Deploy**, puis ouvrir `/admin`, créer le premier compte et cliquer sur **Remplir avec le contenu de démonstration** dans le tableau de bord.

## Structure

```
src/
  app/(frontend)/   pages du site
  app/(payload)/    admin Payload et son thème (custom.scss)
  collections/      produits, équipe, avis, FAQ, tarifs, horaires, coordonnées, médias
  globals/          Identité du site
  seed/             contenu de démonstration
  utilities/        accès aux données, valeurs par défaut, photos Unsplash
```
