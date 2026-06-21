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

## Mobile first

L'application est développée **mobile first** : l'affichage doit être optimisé
en priorité pour téléphone.

- Concevoir et styler d'abord pour les petits écrans (largeur ~360–430 px), puis
  élargir vers tablette/desktop via des media queries `min-width`.
- Cibles tactiles confortables, layout en une colonne par défaut, pas de
  scroll horizontal.
- Tester les features dans Cypress avec un viewport mobile (ex.
  `cy.viewport('iphone-x')` ou `cy.viewport(390, 844)`) afin de valider le rendu
  téléphone.

## Conventions de code

- **Tout en anglais** : l'application est en anglais. Les identifiants
  (variables, fonctions, classes CSS, noms de fichiers), les descriptions de
  tests (`describe`/`it`) **et le contenu affiché à l'utilisateur** (libellés
  visibles, `aria-label`, textes du calendrier comme « January 2026 » ou les
  noms de jours) sont en anglais.
- **Éviter les commentaires** : le code doit être auto-explicatif (noms clairs,
  petites fonctions extraites). N'ajouter un commentaire qu'en dernier recours,
  pour expliquer un *pourquoi* non déductible du code.

## Conventions de commit

- **Messages de commit en anglais** et au format **Conventional Commits** :
  `type(scope): description` (ex. `feat(calendar): display January 2026 grid`).
- Types courants : `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`,
  `ci`, `build`. Le `scope` est optionnel.
- La description est à l'impératif présent et en minuscules
  (ex. `add`, pas `added`/`Adds`).

## Conventions de test

- Récupérer les éléments **par rôle** via `@testing-library/cypress`
  (`cy.findByRole(...)`) plutôt que par sélecteurs CSS ou `data-*`.
- **Éviter les regex** dans les tests : chercher une stratégie plus lisible et
  moins fragile selon le besoin — chaîne exacte, assertion `contain.text` /
  `contains`, comparaison de valeurs (`deep.equal`), etc.
- Les specs vivent dans `cypress/e2e/**/*.cy.{js,jsx,ts,tsx}`.

## Commandes utiles

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de dev Vite sur http://localhost:5173. |
| `npm run dev:tdd` | Démarre le serveur dev **et** ouvre Cypress en mode interactif (workflow TDD e2e). |
| `npm run cy:open` | Cypress en mode interactif (serveur dev requis). |
| `npm run cy:run` | Cypress en headless (serveur dev requis). |
| `npm run test:e2e` | Démarre le serveur dev **et** lance les tests, puis l'arrête. |
