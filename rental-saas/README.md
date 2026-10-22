# RentFlow

MVP de SaaS de gestion locative construit avec `Next.js`, `TypeScript`, `Tailwind CSS` et une base d'integration `Supabase`.

## Fonctionnalites incluses

- tableau de bord de pilotage
- gestion des biens et lots
- suivi des locataires et baux
- journal des loyers et paiements
- point d'entree Supabase et schema SQL de depart

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Copie `.env.example` vers `.env.local` puis renseigne les variables :

```bash
cp .env.example .env.local
```

Variables attendues :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Structure utile

- `src/app` : routes App Router
- `src/components` : UI reutilisable du dashboard
- `src/lib/mock-data.ts` : donnees de demonstration du MVP
- `src/lib/supabase.ts` : client Supabase
- `supabase/schema.sql` : premiere base de schema relationnel

## Prochaines evolutions recommandees

- authentification multi-utilisateur
- CRUD complet branche sur Supabase
- generation de quittances PDF
- relances automatiques et notifications email
- permissions par agence / bailleur / gestionnaire
