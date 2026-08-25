import { useEffect, useState } from 'react'
import { subjectMeta } from '../subjectMeta'

function ScoreRing({ pct }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const [offset, setOffset] = useState(circumference)

  useEffect(() => {
    const target = circumference * (1 - pct / 100)
    const t = setTimeout(() => setOffset(target), 100)
    return () => clearTimeout(t)
  }, [pct, circumference])

  return (
    <div className="score-ring">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle className="ring-bg" cx="90" cy="90" r={radius} />
        <circle
          className="ring-fg"
          cx="90"
          cy="90"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-ring-text">
        <strong>{Math.round(pct)}%</strong>
        <span>score</span>
      </div>
    </div>
  )
}

function Result({ category, answers, onRestart, onHome }) {
  const meta = subjectMeta(category)
  const total = answers.length
  const score = answers.filter((a) => a.isCorrect).length
  const wrong = total - score
  const pct = total === 0 ? 0 : (score / total) * 100

  const verdict =
    score === total
      ? 'Perfect Score! 🎉'
      : pct >= 60
        ? 'Great Job! 👏'
        : 'Keep Practicing! 💪'

  const mistakes = answers.filter((a) => !a.isCorrect)

  return (
    <div className="result">
      <header className="hero">
        <span className="subject-chip" style={{ '--accent': meta.accent }}>
          {meta.icon} {category} · Results
        </span>
        <h1 className="hero-title">{verdict}</h1>
        <p className="hero-subtitle">
          You scored <strong className="gradient-text">{score}</strong> out of{' '}
          <strong>{total}</strong> marks.
        </p>
      </header>

      <ScoreRing pct={pct} />

      <div className="stat-row">
        <div className="stat-box good">
          <span className="stat-num">{score}</span>
          <span className="stat-label">Correct</span>
        </div>
        <div className="stat-box bad">
          <span className="stat-num">{wrong}</span>
          <span className="stat-label">Incorrect</span>
        </div>
        <div className="stat-box neutral">
          <span className="stat-num">{Math.round(pct)}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
      </div>

      {mistakes.length > 0 && (
        <section className="review">
          <h3>Review your mistakes ({mistakes.length})</h3>
          {mistakes.map((m, i) => (
            <article key={i} className="review-item">
              <p className="review-q">{m.text}</p>
              <p className="line bad-line">✗ Your answer: {m.selected ?? 'Skipped (time out)'}</p>
              <p className="line good-line">✓ Correct answer: {m.correct}</p>
            </article>
          ))}
        </section>
      )}

      <div className="btn-row">
        <button className="action-btn" onClick={onRestart}>
          🔁 Retry {category}
        </button>
        <button className="ghost-btn" onClick={onHome}>
          🏠 Back to Subjects
        </button>
      </div>
    </div>
  )
}

export default Result
