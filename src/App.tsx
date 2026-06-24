import Calendar from './Calendar'
import PageTitle from './PageTitle'

type MonthSelection = {
    year: number
    month: number
}

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

export default function App() {
    const {year, month} = parseMonthFromPath(window.location.pathname)

    return (
        <main className="calendar">
            <PageTitle year={year} month={month} />
            <Calendar year={year} month={month} />
        </main>
    )
}
