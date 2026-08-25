import { useEffect, useState } from 'react'
import { addQuestion, deleteQuestion, fetchCategories, fetchQuestions } from '../api'
import { subjectMeta } from '../subjectMeta'

const EMPTY_FORM = {
  text: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  correctAnswer: '',
  category: '',
}

function Admin({ onBack }) {
  const [questions, setQuestions] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState(EMPTY_FORM)
  const [correctPick, setCorrectPick] = useState('A')
  const [message, setMessage] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    Promise.all([fetchQuestions(), fetchCategories()])
      .then(([qs, cats]) => {
        setQuestions(qs)
        setCategories(cats)
      })
      .catch(() => setMessage({ type: 'error', text: 'Could not load questions.' }))
  }

  const visible = filter === 'All' ? questions : questions.filter((q) => q.category === filter)

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMessage(null)
    try {
      await addQuestion({
        ...form,
        correctAnswer: form[`option${correctPick}`],
      })
      setForm(EMPTY_FORM)
      setCorrectPick('A')
      refresh()
      setMessage({ type: 'success', text: '✅ Question added successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to add question.' })
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id)
      setQuestions((prev) => prev.filter((q) => q.id !== id))
      setMessage({ type: 'success', text: '🗑️ Question deleted.' })
    } catch {
      setMessage({ type: 'error', text: 'Delete failed. Is the backend running?' })
    }
  }

  return (
    <div className="admin">
      <div className="quiz-topbar">
        <button className="ghost-btn small" onClick={onBack}>
          ← Back
        </button>
        <h2 className="admin-title">⚙️ Admin Panel</h2>
      </div>

      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <section className="card form-card">
        <h3>Add a new question</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="input"
            rows={2}
            placeholder="Question text *"
            value={form.text}
            onChange={updateField('text')}
            required
          />

          <div className="option-inputs">
            {['A', 'B', 'C', 'D'].map((L) => (
              <label key={L} className={`opt-field${correctPick === L ? ' picked' : ''}`}>
                <input
                  type="radio"
                  name="correct"
                  checked={correctPick === L}
                  onChange={() => setCorrectPick(L)}
                  title="Mark as correct answer"
                />
                <span className="letter">{L}</span>
                <input
                  className="input bare"
                  placeholder={`Option ${L} *`}
                  value={form[`option${L}`]}
                  onChange={updateField(`option${L}`)}
                  required
                />
              </label>
            ))}
          </div>

          <input
            className="input"
            list="category-options"
            placeholder="Category (e.g. DBMS) *"
            value={form.category}
            onChange={updateField('category')}
            required
          />
          <datalist id="category-options">
            {categories.map((c) => (
              <option key={c.category} value={c.category} />
            ))}
          </datalist>

          <button className="action-btn" disabled={busy}>
            {busy ? 'Saving…' : '＋ Add Question'}
          </button>
        </form>
      </section>

      <section className="card list-card">
        <div className="list-head">
          <h3>All questions ({visible.length})</h3>
          <select className="input select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All subjects</option>
            {categories.map((c) => (
              <option key={c.category} value={c.category}>
                {c.category}
              </option>
            ))}
          </select>
        </div>

        <ul className="question-list">
          {visible.map((q) => (
            <li key={q.id} className="question-row">
              <span
                className="mini-chip"
                style={{ '--accent': subjectMeta(q.category).accent }}
              >
                {subjectMeta(q.category).icon} {q.category}
              </span>
              <span className="row-text">{q.text}</span>
              <span className="row-answer">{q.correctAnswer}</span>
              <button className="delete-btn" onClick={() => handleDelete(q.id)} title="Delete">
                🗑
              </button>
            </li>
          ))}
          {visible.length === 0 && <li className="empty-row">No questions in this subject yet.</li>}
        </ul>
      </section>
    </div>
  )
}

export default Admin
