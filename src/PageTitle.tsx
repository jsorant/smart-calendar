function monthTitle(year: number, month: number): string {
    return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    })
}

type PageTitleProps = {
    year: number
    month: number
}

export default function PageTitle({year, month}: PageTitleProps) {
    return <h1>{monthTitle(year, month)}</h1>
}
