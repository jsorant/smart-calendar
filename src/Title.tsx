function monthTitle(year: number, month: number): string {
    return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    })
}

type TitleProps = {
    year: number
    month: number
}

export default function Title({year, month}: TitleProps) {
    return <h1>{monthTitle(year, month)}</h1>
}
