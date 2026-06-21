# Smart Calendar

Application React (Vite) avec des tests end-to-end Cypress utilisant
[`@testing-library/cypress`](https://testing-library.com/docs/cypress-testing-library/intro).

## Prérequis

- Node.js >= 18
- npm

## Installation

```bash
npm install
```

## Commandes disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement Vite sur http://localhost:5173. |
| `npm run build` | Génère le build de production dans `dist/`. |
| `npm run preview` | Sert localement le build de production pour le prévisualiser. |
| `npm run cy:open` | Ouvre Cypress en mode interactif (le serveur dev doit déjà tourner). |
| `npm run cy:run` | Lance les tests Cypress en headless (le serveur dev doit déjà tourner). |
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
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx          # Point d'entrée React
│   └── App.jsx           # Page « Hello World »
├── cypress.config.js
└── cypress/
    ├── support/e2e.js    # Import des commandes @testing-library/cypress
    └── e2e/hello.cy.js   # Test e2e
```

## À propos des tests

Le test (`cypress/e2e/hello.cy.js`) récupère les éléments **par rôle** via les
commandes de `@testing-library/cypress` :

```js
cy.findByRole('heading', { name: /hello world/i }).should('exist')
```
