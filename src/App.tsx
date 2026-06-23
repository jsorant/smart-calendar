type Day = {
  initial: string
  name: string
}

type MonthSelection = {
  year: number
  month: number
}

type CalendarDay = {
  n: number
  outside?: string
}

type Week = {
  number: number
  days: CalendarDay[]
}

const DAYS: Day[] = [
  { initial: 'M', name: 'Monday' },
  { initial: 'T', name: 'Tuesday' },
  { initial: 'W', name: 'Wednesday' },
  { initial: 'T', name: 'Thursday' },
  { initial: 'F', name: 'Friday' },
  { initial: 'S', name: 'Saturday' },
  { initial: 'S', name: 'Sunday' },
]

const DEFAULT_MONTH: MonthSelection = { year: 2026, month: 1 }

function parseMonthFromPath(pathname: string): MonthSelection {
  const [year, month] = pathname.replace(/^\//, '').split('-')
  const parsedYear = Number(year)
  const parsedMonth = Number(month)
  const isValid =
    Number.isInteger(parsedYear) &&
    Number.isInteger(parsedMonth) &&
    parsedMonth >= 1 &&
    parsedMonth <= 12
  return isValid ? { year: parsedYear, month: parsedMonth } : DEFAULT_MONTH
}

function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7
}

function monthTitle(year: number, month: number): string {
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

function buildWeeks(year: number, month: number): Week[] {
  const firstOfMonth = new Date(year, month - 1, 1)
  const start = new Date(year, month - 1, 1 - mondayIndex(firstOfMonth))
  const lastOfMonth = new Date(year, month, 0)

  const weeks: Week[] = []
  const cursor = start
  let number = 1
  while (cursor <= lastOfMonth) {
    const days: CalendarDay[] = []
    for (let i = 0; i < 7; i += 1) {
      const inMonth = cursor.getMonth() === month - 1
      days.push({
        n: cursor.getDate(),
        outside: inMonth
          ? undefined
          : cursor.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
      })
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push({ number, days })
    number += 1
  }
  return weeks
}

export default function App() {
  const { year, month } = parseMonthFromPath(window.location.pathname)
  const weeks = buildWeeks(year, month)

  return (
    <main className="calendar">
      <h1>{monthTitle(year, month)}</h1>
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
          {weeks.map((week) => (
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
