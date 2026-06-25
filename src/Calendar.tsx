import {Month} from './Month'

type Weekday = {
    initial: string
    name: string
}

const WEEKDAYS: Weekday[] = [
    {initial: 'M', name: 'Monday'},
    {initial: 'T', name: 'Tuesday'},
    {initial: 'W', name: 'Wednesday'},
    {initial: 'T', name: 'Thursday'},
    {initial: 'F', name: 'Friday'},
    {initial: 'S', name: 'Saturday'},
    {initial: 'S', name: 'Sunday'},
]

function outsideLabel(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

type CalendarProps = {
    year: number
    month: number
}

export default function Calendar({year, month}: CalendarProps) {
    const {weeks} = new Month(year, month)

    return (
        <table>
            <thead>
            <tr>
                <th scope="col" aria-label="Week">
                    Wk
                </th>
                {WEEKDAYS.map((day, i) => (
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
                        day.inMonth ? (
                            <td key={i}>{day.dayNumber}</td>
                        ) : (
                            <td key={i} className="outside-month" aria-label={outsideLabel(day.date)}>
                                {day.dayNumber}
                            </td>
                        ),
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
