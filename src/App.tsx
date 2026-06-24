import PageTitle from './PageTitle'

type Day = {
    initial: string
    name: string
}

type MonthSelection = {
    year: number
    month: number
}

type CalendarDay = {
    dayNumber: number
    outside?: string
}

type Week = {
    weekNumber: number
    days: CalendarDay[]
}

const DAYS: Day[] = [
    {initial: 'M', name: 'Monday'},
    {initial: 'T', name: 'Tuesday'},
    {initial: 'W', name: 'Wednesday'},
    {initial: 'T', name: 'Thursday'},
    {initial: 'F', name: 'Friday'},
    {initial: 'S', name: 'Saturday'},
    {initial: 'S', name: 'Sunday'},
]

const DEFAULT_MONTH: MonthSelection = {year: 2026, month: 1}

function stripBase(pathname: string): string {
    const base = import.meta.env.BASE_URL
    return pathname.startsWith(base)
        ? pathname.slice(base.length)
        : pathname.replace(/^\//, '')
}

function parseMonthFromPath(pathname: string): MonthSelection {
    const [year, month] = stripBase(pathname).split('-')
    const parsedYear = Number(year)
    const parsedMonth = Number(month)
    const isValid =
        Number.isInteger(parsedYear) &&
        Number.isInteger(parsedMonth) &&
        parsedMonth >= 1 &&
        parsedMonth <= 12
    return isValid ? {year: parsedYear, month: parsedMonth} : DEFAULT_MONTH
}

function mondayIndex(date: Date): number {
    return (date.getDay() + 6) % 7
}

function isoWeekNumber(date: Date): number {
    const thursday = new Date(date)
    thursday.setDate(thursday.getDate() - mondayIndex(date) + 3)
    const yearStart = new Date(thursday.getFullYear(), 0, 1)
    const thursdayIndex = Math.round((thursday.getTime() - yearStart.getTime()) / 86400000)
    return Math.ceil((thursdayIndex + 1) / 7)
}

function mondayOf(year: number, month: number, firstDayOfMonth: Date): Date {
    return new Date(year, month - 1, 1 - mondayIndex(firstDayOfMonth));
}

function computeMondayOfFirstWeekToDisplay(year: number, month: number): Date {
    const firstDayOfMonth = new Date(year, month - 1, 1)
    return mondayOf(year, month, firstDayOfMonth);
}

function lastDayOfMonth(year: number, month: number) {
    return new Date(year, month, 0);
}

function isDateInMonth(aDate: Date, month: number): boolean {
    return aDate.getMonth() === month - 1;
}

function addDaysTo(aDate: Date, count: number): Date {
    const newDate = new Date(aDate);
    newDate.setDate(newDate.getDate() + count)
    return newDate;
}

function addOneWeekTo(aDate: Date): Date {
    return addDaysTo(aDate, 7);
}

function addOneDayTo(aDate: Date): Date {
    return addDaysTo(aDate, 1);
}

function daysOfWeekInMonth(startDay: Date, month: number) {
    let cursor = new Date(startDay);
    const days: CalendarDay[] = []
    for (let i = 0; i < 7; i += 1) {
        days.push({
            dayNumber: cursor.getDate(),
            outside: isDateInMonth(cursor, month)
                ? undefined
                : cursor.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                }),
        })
        cursor = addOneDayTo(cursor);
    }
    return days;
}


function buildWeeks(year: number, month: number): Week[] {
    const weeks: Week[] = []
    let cursor = computeMondayOfFirstWeekToDisplay(year, month)
    while (cursor <= lastDayOfMonth(year, month)) {
        weeks.push({
            weekNumber: isoWeekNumber(cursor),
            days: daysOfWeekInMonth(cursor, month)
        })
        cursor = addOneWeekTo(cursor);
    }
    return weeks
}

export default function App() {
    const {year, month} = parseMonthFromPath(window.location.pathname)
    const weeks = buildWeeks(year, month)

    return (
        <main className="calendar">
            <PageTitle year={year} month={month} />
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
                    <tr key={week.weekNumber}>
                        <th scope="row">{week.weekNumber}</th>
                        {week.days.map((day, i) =>
                            day.outside ? (
                                <td key={i} className="outside-month" aria-label={day.outside}>
                                    {day.dayNumber}
                                </td>
                            ) : (
                                <td key={i}>{day.dayNumber}</td>
                            ),
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    )
}
