import { useEffect, useMemo, useState } from 'react'
import { subjectMeta } from '../subjectMeta'

const TIME_PER_QUESTION = 45
const LETTERS = ['A', 'B', 'C', 'D']

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function Quiz({ category, questions, onFinish, onExit }) {
  const deck = useMemo(() => shuffle(questions), [questions])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [answers, setAnswers] = useState([])

  const current = deck[index]
  const isLast = index === deck.length - 1
  const meta = subjectMeta(category)
  const timedOut = answered && selected === null

  useEffect(() => {
    if (answered || timeLeft === 0) return undefined
    const t = setTimeout(() => {
      if (timeLeft <= 1) {
        setTimeLeft(0)
        setAnswered(true)
        setAnswers((prev) => [
          ...prev,
          {
            text: current.text,
            selected: null,
            correct: current.correctAnswer,
            isCorrect: false,
            timedOut: true,
          },
        ])
      } else {
        setTimeLeft(timeLeft - 1)
      }
    }, 1000)
    return () => clearTimeout(t)
  }, [timeLeft, answered, current])

  const handleSelect = (option) => {
    if (!answered) setSelected(option)
  }

  const handleCheck = () => {
    if (!selected || answered) return
    setAnswered(true)
    setAnswers((prev) => [
      ...prev,
      {
        text: current.text,
        selected,
        correct: current.correctAnswer,
        isCorrect: selected === current.correctAnswer,
        timedOut: false,
      },
    ])
  }

  const handleNext = () => {
    if (isLast) {
      onFinish(answers)
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setAnswered(false)
      setTimeLeft(TIME_PER_QUESTION)
    }
  }

  const getOptionClass = (option) => {
    if (!answered) {
      return `option-btn${selected === option ? ' selected' : ''}`
    }
    if (option === current.correctAnswer) return 'option-btn correct'
    if (option === selected) return 'option-btn wrong'
    return 'option-btn dimmed'
  }

  const progressPct = (answers.length / deck.length) * 100
  const score = answers.filter((a) => a.isCorrect).length

  return (
    <div className="quiz">
      <div className="quiz-topbar">
        <button className="ghost-btn small" onClick={onExit}>
          ← Exit
        </button>
        <span className="subject-chip" style={{ '--accent': meta.accent }}>
          {meta.icon} {category}
        </span>
        <span className={`timer-chip${timeLeft <= 10 && !answered ? ' danger' : ''}`}>
          ⏱ {answered ? '—' : `${timeLeft}s`}
        </span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="quiz-meta">
        <span>
          Question <strong>{index + 1}</strong> of <strong>{deck.length}</strong>
        </span>
        <span className="live-score">
          Score: <strong>{score}</strong>
        </span>
      </div>

      <h2 key={current.id} className="question-text">
        {current.text}
      </h2>

      <div className="options-grid">
        {[current.optionA, current.optionB, current.optionC, current.optionD].map(
          (option, i) => (
            <button
              key={LETTERS[i]}
              className={getOptionClass(option)}
              onClick={() => handleSelect(option)}
              disabled={answered}
            >
              <span className="letter">{LETTERS[i]}</span>
              {option}
              {answered && option === current.correctAnswer && <span className="tick">✓</span>}
              {answered && option === selected && option !== current.correctAnswer && (
                <span className="cross">✗</span>
              )}
            </button>
          )
        )}
      </div>

      {timedOut && (
        <p className="timeout-note">⏳ Time&apos;s up! The correct answer is highlighted.</p>
      )}

      {answered ? (
        <button className="action-btn" onClick={handleNext} autoFocus>
          {isLast ? 'See My Results →' : 'Next Question →'}
        </button>
      ) : (
        <button className="action-btn" onClick={handleCheck} disabled={!selected}>
          Check Answer
        </button>
      )}
    </div>
  )
}

export default Quiz
