const readCalendar = ($rows: JQuery<HTMLElement>): string => {
  const rows = Cypress._.map($rows, (row) => row as HTMLTableRowElement)
  const columns = rows[0].cells.length
  const border = '+' + Cypress._.fill(Array(columns), '----').join('+') + '+'
  const toLine = (row: HTMLTableRowElement): string =>
    '|' +
    Cypress._.map(
      row.cells,
      (cell) => ' ' + (cell.textContent ?? '').trim().padStart(2) + ' ',
    ).join('|') +
    '|'
  const [header, ...body] = Cypress._.map(rows, toLine)
  return [border, header, border, ...body, border].join('\n')
}

describe('Monthly calendar — January 2026', () => {
  beforeEach(() => {
    cy.viewport(390, 844)
    cy.visit('/2026-01')
  })

  it('displays the "January 2026" title', () => {
    cy.findByRole('heading').should('contain.text', 'January 2026')
  })

  it('renders the full January 2026 calendar at /2026-01', () => {
    const expectedCalendar = [
      '+----+----+----+----+----+----+----+----+',
      '| Wk |  M |  T |  W |  T |  F |  S |  S |',
      '+----+----+----+----+----+----+----+----+',
      '|  1 | 29 | 30 | 31 |  1 |  2 |  3 |  4 |',
      '|  2 |  5 |  6 |  7 |  8 |  9 | 10 | 11 |',
      '|  3 | 12 | 13 | 14 | 15 | 16 | 17 | 18 |',
      '|  4 | 19 | 20 | 21 | 22 | 23 | 24 | 25 |',
      '|  5 | 26 | 27 | 28 | 29 | 30 | 31 |  1 |',
      '+----+----+----+----+----+----+----+----+',
    ].join('\n')

    cy.findAllByRole('row').then(readCalendar).should('contain', expectedCalendar)
  })

  it('greys out every day outside January (Dec 2025 and Feb 2026)', () => {
    const dayColor = (day: string) =>
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

describe('Monthly calendar — March 2026', () => {
  beforeEach(() => {
    cy.viewport(390, 844)
    cy.visit('/2026-03')
  })

  it('displays the "March 2026" title', () => {
    cy.findByRole('heading').should('contain.text', 'March 2026')
  })

  it('renders the full March 2026 calendar at /2026-03', () => {
    const expectedCalendar = [
      '+----+----+----+----+----+----+----+----+',
      '| Wk |  M |  T |  W |  T |  F |  S |  S |',
      '+----+----+----+----+----+----+----+----+',
      '|  9 | 23 | 24 | 25 | 26 | 27 | 28 |  1 |',
      '| 10 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |',
      '| 11 |  9 | 10 | 11 | 12 | 13 | 14 | 15 |',
      '| 12 | 16 | 17 | 18 | 19 | 20 | 21 | 22 |',
      '| 13 | 23 | 24 | 25 | 26 | 27 | 28 | 29 |',
      '| 14 | 30 | 31 |  1 |  2 |  3 |  4 |  5 |',
      '+----+----+----+----+----+----+----+----+',
    ].join('\n')

    cy.findAllByRole('row').then(readCalendar).should('contain', expectedCalendar)
  })

  it('greys out every day outside March (Feb 2026 and Apr 2026)', () => {
    const dayColor = (day: string) =>
      cy.findByRole('cell', { name: day }).invoke('css', 'color')
    const normalDayColor = () => dayColor('15')

    const outsideMonth = [
      'February 23, 2026',
      'February 24, 2026',
      'February 25, 2026',
      'February 26, 2026',
      'February 27, 2026',
      'February 28, 2026',
      'April 1, 2026',
      'April 2, 2026',
      'April 3, 2026',
      'April 4, 2026',
      'April 5, 2026',
    ]
    normalDayColor().then((normal) => {
      outsideMonth.forEach((day) => dayColor(day).should('not.equal', normal))
    })
  })
})
