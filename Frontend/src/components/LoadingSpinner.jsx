import { Loader2 } from 'lucide-react'

function LoadingSpinner() {
  return (
    <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-6 flex items-center justify-center gap-3">
      <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
      <p className="text-indigo-800 font-medium">Analyzing your code...</p>
    </div>
  )
}

export default LoadingSpinner