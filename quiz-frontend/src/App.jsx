import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAnswered, setIsAnswered] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching questions:', err)
        setLoading(false)
      })
  }, [])

  const handleAnswerSelect = (optionValue) => {
    if (isAnswered) return
    setSelectedAnswer(optionValue)
  }

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentIndex]
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Check answer
    if (isCorrect) {
      setScore(score + 1)
    }

    // Record the user's answer
    setUserAnswers(prev => [...prev, {
      question: currentQuestion.text,
      selected: selectedAnswer,
      correct: currentQuestion.correctAnswer,
      isCorrect: isCorrect
    }])

    // Move to next question or show score
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowScore(true)
    }
  }

  const handleCheckAnswer = () => {
    setIsAnswered(true)
  }

  const restartQuiz = () => {
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowScore(false)
    setIsAnswered(false)
    setUserAnswers([])
  }

  if (loading) {
    return (
      <div className="app-container">
        <div className="quiz-card loader">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="app-container">
        <div className="quiz-card">
          <h2 className="title" style={{ textAlign: 'center' }}>No Questions Found</h2>
          <p className="subtitle" style={{ textAlign: 'center' }}>Please ensure the backend is running and has data.</p>
        </div>
      </div>
    )
  }

  const getOptionClass = (optionValue) => {
    if (!isAnswered) {
      return selectedAnswer === optionValue ? 'option-btn selected' : 'option-btn'
    }

    const currentQuestion = questions[currentIndex]
    if (optionValue === currentQuestion.correctAnswer) {
      return 'option-btn correct'
    }
    if (selectedAnswer === optionValue && selectedAnswer !== currentQuestion.correctAnswer) {
      return 'option-btn wrong'
    }
    return 'option-btn'
  }

  return (
    <div className="app-container">
      <div className="quiz-card">
        {showScore ? (
          <div className="score-container">
            <h2 className="title">Quiz Complete!</h2>
            <div 
              className="score-circle" 
              style={{ '--percentage': `${(score / questions.length) * 100}%` }}
            >
              <div className="score-text">
                {score}/{questions.length}
              </div>
            </div>
            <p className="score-message">
              {score === questions.length ? 'Perfect Score! 🎉' : 
               score >= questions.length / 2 ? 'Great Job! 👏' : 'Keep Practicing! 💪'}
            </p>
            
            <div className="summary-stats" style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <div style={{ padding: '10px 20px', backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: '10px', color: '#4caf50' }}>
                <h3>Correct</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{score}</p>
              </div>
              <div style={{ padding: '10px 20px', backgroundColor: 'rgba(244, 67, 54, 0.1)', borderRadius: '10px', color: '#f44336' }}>
                <h3>Incorrect</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{questions.length - score}</p>
              </div>
            </div>

            {userAnswers.filter(ans => !ans.isCorrect).length > 0 && (
              <div className="incorrect-answers-list" style={{ textAlign: 'left', marginTop: '30px', maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
                <h3 style={{ marginBottom: '15px' }}>Review Incorrect Answers:</h3>
                {userAnswers.filter(ans => !ans.isCorrect).map((ans, idx) => (
                  <div key={idx} className="review-item" style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                    <p style={{ fontWeight: '500', marginBottom: '10px' }}>{ans.question}</p>
                    <p style={{ color: '#ff6b6b', margin: '5px 0' }}>✗ Your answer: {ans.selected}</p>
                    <p style={{ color: '#4ecdc4', margin: '5px 0' }}>✓ Correct answer: {ans.correct}</p>
                  </div>
                ))}
              </div>
            )}

            <button className="action-btn" onClick={restartQuiz}>
              Play Again
            </button>
          </div>
        ) : (
          <div className="question-container">
             <div className="header">
               <h1 className="title">Quiz Master</h1>
               <span className="question-progress">
                 Question {currentIndex + 1} of {questions.length}
               </span>
             </div>
            
            <h2 className="question-text">{questions[currentIndex].text}</h2>
            
            <div className="options-grid">
              {[
                questions[currentIndex].optionA,
                questions[currentIndex].optionB,
                questions[currentIndex].optionC,
                questions[currentIndex].optionD
              ].map((option, index) => (
                <button
                  key={index}
                  className={getOptionClass(option)}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              ))}
            </div>

            {isAnswered ? (
              <button 
                onClick={handleNextQuestion} 
                className="action-btn"
              >
                {currentIndex + 1 === questions.length ? 'Show Results' : 'Next Question'}
              </button>
            ) : (
              <button 
                onClick={handleCheckAnswer} 
                className="action-btn"
                disabled={!selectedAnswer}
              >
                Check Answer
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
