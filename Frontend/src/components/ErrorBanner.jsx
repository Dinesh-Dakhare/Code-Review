import { AlertCircle, X } from 'lucide-react'

function ErrorBanner({ message, onClose }) {
  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <p className="text-red-800 flex-1">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-red-100 rounded transition-colors"
      >
        <X className="w-4 h-4 text-red-600" />
      </button>
    </div>
  )
}

export default ErrorBanner