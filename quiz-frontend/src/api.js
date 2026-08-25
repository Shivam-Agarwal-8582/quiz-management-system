const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const message = await res.text()
    throw new Error(message || `Request failed with status ${res.status}`)
  }
  return res.status === 204 ? null : res.json()
}

export const fetchCategories = () => request('/questions/categories')
export const fetchQuestions = () => request('/questions')
export const fetchQuestionsByCategory = (category) =>
  request(`/questions/category/${encodeURIComponent(category)}`)
export const addQuestion = (question) =>
  request('/questions', { method: 'POST', body: JSON.stringify(question) })
export const deleteQuestion = (id) => request(`/questions/${id}`, { method: 'DELETE' })
