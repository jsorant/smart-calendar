const JOURS = [
  { initiale: 'L', nom: 'lundi' },
  { initiale: 'M', nom: 'mardi' },
  { initiale: 'M', nom: 'mercredi' },
  { initiale: 'J', nom: 'jeudi' },
  { initiale: 'V', nom: 'vendredi' },
  { initiale: 'S', nom: 'samedi' },
  { initiale: 'D', nom: 'dimanche' },
]

// Janvier 2026 — le 1er est un jeudi. Semaines ISO 1 à 5, lundi → dimanche.
// `hors` = libellé daté complet pour les jours en dehors de janvier (grisés).
const SEMAINES = [
  {
    num: 1,
    jours: [
      { n: 29, hors: '29 décembre 2025' },
      { n: 30, hors: '30 décembre 2025' },
      { n: 31, hors: '31 décembre 2025' },
      { n: 1 },
      { n: 2 },
      { n: 3 },
      { n: 4 },
    ],
  },
  { num: 2, jours: [5, 6, 7, 8, 9, 10, 11].map((n) => ({ n })) },
  { num: 3, jours: [12, 13, 14, 15, 16, 17, 18].map((n) => ({ n })) },
  { num: 4, jours: [19, 20, 21, 22, 23, 24, 25].map((n) => ({ n })) },
  {
    num: 5,
    jours: [
      { n: 26 },
      { n: 27 },
      { n: 28 },
      { n: 29 },
      { n: 30 },
      { n: 31 },
      { n: 1, hors: '1 février 2026' },
    ],
  },
]

export default function App() {
  return (
    <main className="calendrier">
      <h1>janvier 2026</h1>
      <table>
        <thead>
          <tr>
            <th scope="col" aria-label="Semaine">
              Sem.
            </th>
            {JOURS.map((jour, i) => (
              <th key={i} scope="col" aria-label={jour.nom}>
                {jour.initiale}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SEMAINES.map((semaine) => (
            <tr key={semaine.num}>
              <th scope="row">{semaine.num}</th>
              {semaine.jours.map((jour, i) =>
                jour.hors ? (
                  <td key={i} className="hors-mois" aria-label={jour.hors}>
                    {jour.n}
                  </td>
                ) : (
                  <td key={i}>{jour.n}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
