import { useState } from 'react'
import './App.css'
import { fetchQuestionsByCategory } from './api'
import Home from './components/Home'
import Quiz from './components/Quiz'
import Result from './components/Result'
import Admin from './components/Admin'

function App() {
  const [screen, setScreen] = useState('home')
  const [category, setCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [quizError, setQuizError] = useState(null)
  const [quizLoading, setQuizLoading] = useState(false)

  const startQuiz = (cat) => {
    setQuizLoading(true)
    setQuizError(null)
    fetchQuestionsByCategory(cat)
      .then((qs) => {
        if (qs.length === 0) throw new Error('No questions in this subject yet.')
        setQuestions(qs)
        setCategory(cat)
        setScreen('quiz')
      })
      .catch((err) => setQuizError(err.message))
      .finally(() => setQuizLoading(false))
  }

  const finishQuiz = (finalAnswers) => {
    setAnswers(finalAnswers)
    setScreen('result')
  }

  const restart = () => startQuiz(category)

  const goHome = () => {
    setScreen('home')
    setCategory(null)
    setQuestions([])
    setAnswers([])
  }

  return (
    <main className="app-shell">
      {screen === 'home' && <Home onStart={startQuiz} onOpenAdmin={() => setScreen('admin')} />}

      {screen === 'admin' && <Admin onBack={goHome} />}

      {screen === 'quiz' && quizLoading && (
        <div className="card-center">
          <div className="spinner" />
        </div>
      )}

      {screen === 'quiz' && !quizLoading && quizError && (
        <div className="card-center">
          <div className="alert alert-error">{quizError}</div>
          <button className="ghost-btn" onClick={goHome}>
            ← Back to Subjects
          </button>
        </div>
      )}

      {screen === 'quiz' && !quizLoading && !quizError && questions.length > 0 && (
        <Quiz
          key={category}
          category={category}
          questions={questions}
          onFinish={finishQuiz}
          onExit={goHome}
        />
      )}

      {screen === 'result' && (
        <Result category={category} answers={answers} onRestart={restart} onHome={goHome} />
      )}
    </main>
  )
}

export default App
