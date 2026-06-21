describe('Monthly calendar — January 2026', () => {
  beforeEach(() => {
    cy.viewport(390, 844)
    cy.visit('/')
  })

  it('displays the "January 2026" title', () => {
    cy.findByRole('heading').should('contain.text', 'January 2026')
  })

  it('displays the day columns Monday to Sunday', () => {
    cy.findAllByRole('columnheader')
      .then(($th) => Cypress._.map($th.slice(1), 'textContent'))
      .should('deep.equal', ['M', 'T', 'W', 'T', 'F', 'S', 'S'])
  })

  it('displays week numbers 1 to 5', () => {
    ;[1, 2, 3, 4, 5].forEach((n) =>
      cy.findByRole('rowheader', { name: String(n) }).should('exist'),
    )
  })

  it('displays every day of January (1 to 31)', () => {
    Array.from({ length: 31 }, (_, i) => i + 1).forEach((day) =>
      cy.findByRole('cell', { name: String(day) }).should('exist'),
    )
  })

  it('greys out every day outside January (Dec 2025 and Feb 2026)', () => {
    const dayColor = (day) =>
      cy.findByRole('cell', { name: day }).invoke('css', 'color')
    const normalDayColor = () => dayColor('15')

    const outsideMonth = [
      'December 29, 2025',
      'December 30, 2025',
      'December 31, 2025',
      'February 1, 2026',
    ]
    normalDayColor().then((normal) => {
      outsideMonth.forEach((day) => dayColor(day).should('not.equal', normal))
    })
  })
})
