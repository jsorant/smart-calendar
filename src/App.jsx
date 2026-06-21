const DAYS = [
  { initial: 'M', name: 'Monday' },
  { initial: 'T', name: 'Tuesday' },
  { initial: 'W', name: 'Wednesday' },
  { initial: 'T', name: 'Thursday' },
  { initial: 'F', name: 'Friday' },
  { initial: 'S', name: 'Saturday' },
  { initial: 'S', name: 'Sunday' },
]

const WEEKS = [
  {
    number: 1,
    days: [
      { n: 29, outside: 'December 29, 2025' },
      { n: 30, outside: 'December 30, 2025' },
      { n: 31, outside: 'December 31, 2025' },
      { n: 1 },
      { n: 2 },
      { n: 3 },
      { n: 4 },
    ],
  },
  { number: 2, days: [5, 6, 7, 8, 9, 10, 11].map((n) => ({ n })) },
  { number: 3, days: [12, 13, 14, 15, 16, 17, 18].map((n) => ({ n })) },
  { number: 4, days: [19, 20, 21, 22, 23, 24, 25].map((n) => ({ n })) },
  {
    number: 5,
    days: [
      { n: 26 },
      { n: 27 },
      { n: 28 },
      { n: 29 },
      { n: 30 },
      { n: 31 },
      { n: 1, outside: 'February 1, 2026' },
    ],
  },
]

export default function App() {
  return (
    <main className="calendar">
      <h1>January 2026</h1>
      <table>
        <thead>
          <tr>
            <th scope="col" aria-label="Week">
              Wk
            </th>
            {DAYS.map((day, i) => (
              <th key={i} scope="col" aria-label={day.name}>
                {day.initial}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WEEKS.map((week) => (
            <tr key={week.number}>
              <th scope="row">{week.number}</th>
              {week.days.map((day, i) =>
                day.outside ? (
                  <td key={i} className="outside-month" aria-label={day.outside}>
                    {day.n}
                  </td>
                ) : (
                  <td key={i}>{day.n}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
