import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

function SectionCard({ icon: Icon, title, content, iconColor, className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-slate-100 rounded-md transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-md  text-left leading-relaxed">
        <p className="text-slate-700 whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}

export default SectionCard