describe('Calendrier mensuel — janvier 2026', () => {
  beforeEach(() => {
    cy.viewport(390, 844) // mobile first
    cy.visit('/')
  })

  it('affiche le titre « janvier 2026 »', () => {
    cy.findByRole('heading', { name: /janvier 2026/i }).should('exist')
  })

  it('affiche les colonnes de jours lundi à dimanche', () => {
    ;['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].forEach(
      (jour) =>
        cy
          .findByRole('columnheader', { name: new RegExp(`^${jour}$`, 'i') })
          .should('exist'),
    )
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
