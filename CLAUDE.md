# Smart Calendar

Application React (Vite) testée de bout en bout avec Cypress et
`@testing-library/cypress`.

## Workflow de développement — TDD e2e d'abord

Pour développer **toute** nouvelle feature, on suit systématiquement cet ordre :

1. **Écrire d'abord un test Cypress e2e** qui décrit le comportement attendu de
   la feature.
2. **Vérifier que ce test échoue — et qu'il échoue pour la bonne raison** :
   l'échec doit porter sur le comportement manquant (ex. l'élément attendu
   n'existe pas encore), pas sur une erreur sans rapport (typo, sélecteur
   invalide, app qui plante, mauvaise URL). On lit le message d'échec pour le
   confirmer.
3. **Implémenter** le minimum nécessaire pour faire passer le test.
4. **Relancer le test** et vérifier qu'il passe au vert.

On n'écrit jamais de code de feature avant d'avoir un test e2e rouge qui le
justifie.

## Conventions de test

- Récupérer les éléments **par rôle** via `@testing-library/cypress`
  (`cy.findByRole(...)`) plutôt que par sélecteurs CSS ou `data-*`.
- Les specs vivent dans `cypress/e2e/**/*.cy.{js,jsx,ts,tsx}`.

## Commandes utiles

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de dev Vite sur http://localhost:5173. |
| `npm run dev:tdd` | Démarre le serveur dev **et** ouvre Cypress en mode interactif (workflow TDD e2e). |
| `npm run cy:open` | Cypress en mode interactif (serveur dev requis). |
| `npm run cy:run` | Cypress en headless (serveur dev requis). |
| `npm run test:e2e` | Démarre le serveur dev **et** lance les tests, puis l'arrête. |
