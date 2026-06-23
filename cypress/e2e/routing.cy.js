describe('Month routing', () => {
  beforeEach(() => {
    cy.viewport(390, 844)
  })

  it('shows the January 2026 page at /2026-01', () => {
    cy.visit('/2026-01')
    cy.findByRole('heading').should('contain.text', 'January 2026')
  })

  it('shows the month matching the URL, not always January', () => {
    cy.visit('/2026-03')
    cy.findByRole('heading').should('contain.text', 'March 2026')
  })
})
