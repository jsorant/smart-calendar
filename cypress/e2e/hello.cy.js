describe('Hello World page', () => {
  it('affiche un élément Hello World', () => {
    cy.visit('/')

    cy.findByRole('heading', { name: /hello world/i }).should('exist')
  })
})
