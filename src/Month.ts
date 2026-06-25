function addDays(date: Date, count: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + count)
    return result
}

export class Day {
    constructor(
        readonly date: Date,
        private readonly month: number,
    ) {}

    get dayNumber(): number {
        return this.date.getDate()
    }

    get inMonth(): boolean {
        return this.date.getMonth() === this.month - 1
    }
}

export class Week {
    readonly days: Day[]

    constructor(
        private readonly monday: Date,
        month: number,
    ) {
        this.days = Array.from({length: 7}, (_, offset) => new Day(addDays(monday, offset), month))
    }

    get weekNumber(): number {
        const thursday = addDays(this.monday, 3)
        const yearStart = new Date(thursday.getFullYear(), 0, 1)
        const thursdayIndex = Math.round((thursday.getTime() - yearStart.getTime()) / 86400000)
        return Math.ceil((thursdayIndex + 1) / 7)
    }
}

export class Month {
    readonly weeks: Week[]

    constructor(
        readonly year: number,
        readonly month: number,
    ) {
        this.weeks = this.buildWeeks()
    }

    static fromDate(date: Date): Month {
        return new Month(date.getFullYear(), date.getMonth() + 1)
    }

    private buildWeeks(): Week[] {
        const weeks: Week[] = []
        let monday = this.mondayOfFirstWeek()
        while (monday <= this.lastDay()) {
            weeks.push(new Week(monday, this.month))
            monday = addDays(monday, 7)
        }
        return weeks
    }

    private mondayOfFirstWeek(): Date {
        const firstDay = new Date(this.year, this.month - 1, 1)
        return addDays(firstDay, -Month.mondayIndex(firstDay))
    }

    private static mondayIndex(date: Date): number {
        return (date.getDay() + 6) % 7
    }

    private lastDay(): Date {
        return new Date(this.year, this.month, 0)
    }
}
