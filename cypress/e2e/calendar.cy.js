describe('Calendrier mensuel — janvier 2026', () => {
  beforeEach(() => {
    cy.viewport(390, 844) // mobile first
    cy.visit('/')
  })

  it('affiche le titre « janvier 2026 »', () => {
    cy.findByRole('heading').should('contain.text', 'janvier 2026')
  })

  it('affiche les colonnes de jours de L à D', () => {
    // La première colonne est l'en-tête « Sem. », on la retire avant de
    // comparer aux initiales des jours réellement affichées.
    cy.findAllByRole('columnheader')
      .then(($th) => Cypress._.map($th.slice(1), 'textContent'))
      .should('deep.equal', ['L', 'M', 'M', 'J', 'V', 'S', 'D'])
  })

  it('affiche les numéros de semaine 1 à 5', () => {
    ;[1, 2, 3, 4, 5].forEach((n) =>
      cy.findByRole('rowheader', { name: String(n) }).should('exist'),
    )
  })

  it('affiche tous les jours de janvier (1 à 31)', () => {
    Array.from({ length: 31 }, (_, i) => i + 1).forEach((jour) =>
      cy.findByRole('cell', { name: String(jour) }).should('exist'),
    )
  })

  it('grise tous les jours hors de janvier (déc. 2025 et fév. 2026)', () => {
    const couleurJour = (jour) =>
      cy.findByRole('cell', { name: jour }).invoke('css', 'color')
    const couleurJourNormal = () => couleurJour('15')

    const horsMois = [
      '29 décembre 2025',
      '30 décembre 2025',
      '31 décembre 2025',
      '1 février 2026',
    ]
    // « Grisé » = couleur différente d'un jour normal du mois.
    couleurJourNormal().then((normale) => {
      horsMois.forEach((jour) =>
        couleurJour(jour).should('not.equal', normale),
      )
    })
  })
})
