import { useState } from 'react'
import CodeInput from './components/CodeInput'
import ReviewOutput from './components/ReviewOutput'
import ErrorBanner from './components/ErrorBanner'
import LoadingSpinner from './components/LoadingSpinner'
import { reviewCode } from './api/reviewApi'
import { Code2 } from 'lucide-react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
 const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reviewData, setReviewData] = useState(null)

  const handleSubmit = async (filename, code) => {
    setLoading(true)
    setError(null)
    setReviewData(null)

    try {
      const data = await reviewCode(filename, code)
      console.log("👍frontend get data",data)
      setReviewData(data)
    } catch (err) {
      if (err.response?.status === 503) {
        setError('Service is busy. Please try again in a moment.')
      } else {
        setError(err.message || 'Failed to review code. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }
  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 w-full">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Code2 className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-slate-800">AI Code Review</h1>
          </div>
          <p className="text-slate-600 text-lg">
            Get instant AI-powered feedback on your code
          </p>
        </header>

        {error && <ErrorBanner message={error} onClose={() => setError(null)} />}

        {loading && <LoadingSpinner />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CodeInput onSubmit={handleSubmit} disabled={loading} />
          {reviewData && <ReviewOutput data={reviewData} />}
        </div>
      </div>
    </div>
  )
}

export default App
