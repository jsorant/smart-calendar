# Smart Calendar

Application React (Vite) **en TypeScript** avec des tests end-to-end Cypress
utilisant
[`@testing-library/cypress`](https://testing-library.com/docs/cypress-testing-library/intro).

## En ligne

L'application est déployée sur GitHub Pages :
**https://jsorant.github.io/smart-calendar/**

Chaque push sur `main` redéploie automatiquement le site via le workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Un mois précis
est accessible via l'URL `…/smart-calendar/<année>-<mois>` (ex.
[`…/smart-calendar/2026-03`](https://jsorant.github.io/smart-calendar/2026-03)).

## Prérequis

- Node.js >= 20.19
- npm

## Installation

```bash
npm install
```

## Commandes disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement Vite sur http://localhost:5173. |
| `npm run typecheck` | Vérifie le typage TypeScript (`tsc --build`). |
| `npm run build` | Vérifie le typage puis génère le build de production dans `dist/`. |
| `npm run preview` | Sert localement le build de production pour le prévisualiser. |
| `npm run cy:open` | Ouvre Cypress en mode interactif (le serveur dev doit déjà tourner). |
| `npm run cy:run` | Lance les tests Cypress en headless (le serveur dev doit déjà tourner). |
| `npm run dev:tdd` | Démarre le serveur dev **et** ouvre Cypress en mode interactif (idéal pour le TDD e2e). |
| `npm run test:e2e` | Démarre le serveur dev **et** lance les tests Cypress automatiquement, puis arrête le serveur. |

### Lancer les tests e2e

La façon la plus simple, tout-en-un :

```bash
npm run test:e2e
```

Cette commande utilise [`start-server-and-test`](https://github.com/bahmutov/start-server-and-test)
pour démarrer le serveur dev, attendre que http://localhost:5173 réponde, exécuter
`cy:run`, puis couper le serveur.

Alternative en deux temps (utile pour le mode interactif) :

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run cy:open   # ou npm run cy:run
```

## Structure du projet

```
├── index.html
├── vite.config.ts
├── package.json
├── tsconfig.json         # Références vers les tsconfig app / node / cypress
├── tsconfig.app.json     # Config TS pour le code de l'application (src/)
├── tsconfig.node.json    # Config TS pour vite.config.ts
├── tsconfig.cypress.json # Config TS pour les tests Cypress
├── src/
│   ├── main.tsx          # Point d'entrée React
│   ├── App.tsx           # Calendrier mensuel
│   ├── index.css         # Styles
│   └── vite-env.d.ts     # Types Vite (import.meta.env, imports CSS…)
├── cypress.config.ts
└── cypress/
    ├── support/e2e.ts    # Import des commandes @testing-library/cypress
    └── e2e/calendar.cy.ts # Tests e2e du calendrier
```

## À propos des tests

Les tests (`cypress/e2e/calendar.cy.ts`) récupèrent les éléments **par rôle** via
les commandes de `@testing-library/cypress`, en privilégiant des assertions
lisibles plutôt que des regex :

```ts
cy.findByRole('heading').should('contain.text', 'January 2026')
```
