import { useEffect, useState } from 'react'
import './App.css'

const PRINCESS_NAMES = [
  'Cinderella', 'Ariel', 'Belle', 'Jasmine', 'Pocahontas',
  'Mulan', 'Tiana', 'Rapunzel', 'Merida', 'Moana', 'Raya', 'Snow White'
]

interface Princess {
  _id: number
  name: string
  imageUrl: string
  films: string[]
  tvShows: string[]
  allies: string[]
  enemies: string[]
}

async function fetchPrincess(name: string): Promise<Princess | null> {
  const res = await fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(name)}`)
  const json = await res.json()
  const data = json.data
  const character = Array.isArray(data) ? data[0] : data
  if (!character || !character.imageUrl) return null
  return character
}

export default function App() {
  const [princesses, setPrincesses] = useState<Princess[]>([])
  const [selected, setSelected] = useState<Princess | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAll() {
      try {
        const results = await Promise.all(PRINCESS_NAMES.map(fetchPrincess))
        setPrincesses(results.filter(Boolean) as Princess[])
      } catch {
        setError('Could not load princess data. Check your connection and try again.')
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [])

  if (loading) return <div className="status">Loading the magic...</div>
  if (error) return <div className="status error">{error}</div>

  return (
    <main>
      <h1>Disney Princesses</h1>
      <p className="subtitle">Click on a princess to see more details</p>

      {selected && (
        <div className="detail-overlay" onClick={() => setSelected(null)}>
          <div className="detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
            <img src={selected.imageUrl} alt={selected.name} />
            <div className="detail-body">
              <h2>{selected.name}</h2>

              {selected.films.length > 0 && (
                <div className="detail-section">
                  <h3>Films</h3>
                  <ul>
                    {selected.films.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              )}

              {selected.tvShows.length > 0 && (
                <div className="detail-section">
                  <h3>TV Shows</h3>
                  <ul>
                    {selected.tvShows.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              )}

              {selected.allies.length > 0 && (
                <div className="detail-section">
                  <h3>Allies</h3>
                  <ul>
                    {selected.allies.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                </div>
              )}

              {selected.enemies.length > 0 && (
                <div className="detail-section">
                  <h3>Enemies</h3>
                  <ul>
                    {selected.enemies.map((e) => <li key={e}>{e}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid">
        {princesses.map((p) => (
          <div
            key={p._id}
            className={`card ${selected?._id === p._id ? 'active' : ''}`}
            onClick={() => setSelected(p)}
          >
            <img src={p.imageUrl} alt={p.name} />
            <div className="card-body">
              <h2>{p.name}</h2>
              {p.films.length > 0 && <p className="film">{p.films[0]}</p>}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}