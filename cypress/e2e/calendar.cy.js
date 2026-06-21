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

  it('affiche les jours du mois de janvier', () => {
    ;['1', '15', '31'].forEach((jour) =>
      cy.findByRole('cell', { name: jour }).should('exist'),
    )
  })
})
