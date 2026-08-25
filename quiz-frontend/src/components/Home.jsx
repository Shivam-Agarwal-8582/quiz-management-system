import { useEffect, useState } from 'react'
import { fetchCategories } from '../api'
import { subjectMeta } from '../subjectMeta'

function Home({ onStart, onOpenAdmin }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setError('Could not reach the server. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="home">
      <header className="hero">
        <div className="hero-badge">🎓 Quiz Management System</div>
        <h1 className="hero-title">
          Sharpen your skills,{' '}
          <span className="gradient-text">one quiz at a time</span>
        </h1>
        <p className="hero-subtitle">
          Pick a subject below. You get 45 seconds per question — answer everything,
          see your total marks, and review every mistake at the end.
        </p>
      </header>

      {loading && (
        <div className="loader-wrap">
          <div className="spinner" />
        </div>
      )}

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {!loading && !error && categories.length === 0 && (
        <div className="alert">No subjects found. Add questions from the admin panel.</div>
      )}

      {!loading && categories.length > 0 && (
        <section className="category-grid">
          {categories.map((c, i) => {
            const meta = subjectMeta(c.category)
            return (
              <button
                key={c.category}
                className="category-card"
                style={{ '--accent': meta.accent, animationDelay: `${i * 70}ms` }}
                onClick={() => onStart(c.category)}
              >
                <span className="category-icon">{meta.icon}</span>
                <span className="category-name">{c.category}</span>
                <span className="category-tagline">{meta.tagline}</span>
                <span className="category-footer">
                  <span className="pill">{c.count} questions</span>
                  <span className="start-arrow">Start →</span>
                </span>
              </button>
            )
          })}
        </section>
      )}

      <footer className="home-footer">
        <button className="ghost-btn" onClick={onOpenAdmin}>
          ⚙️ Admin Panel
        </button>
      </footer>
    </div>
  )
}

export default Home
