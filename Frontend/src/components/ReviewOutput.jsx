import { useState } from 'react'
import { CheckCircle2, AlertTriangle, Lightbulb, Code, ChevronDown, ChevronUp, Server } from 'lucide-react'
import SectionCard from './SectionCard'

function ReviewOutput({ data }) {
  const [showRaw, setShowRaw] = useState(false)
  const { parsed, raw, usedModel, attempts } = data
console.log("parsed data",parsed);
console.log("raw data",raw);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-slate-800">Review Results</h2>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Server className="w-4 h-4" />
            <span>{usedModel}</span>
            <span className="text-slate-400">•</span>
            <span>{attempts} attempt{attempts !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <SectionCard
          icon={CheckCircle2}
          title="Summary"
          iconColor="text-blue-600"
          content={parsed?.summary}
        />

        {parsed?.issues && parsed?.issues?.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-slate-800">Issues Found</h3>
            </div>
            <div className="space-y-2">
              {parsed?.issues.map((issue, index) => (
                <div
                  key={index}
                  className="p-3 bg-amber-50 border border-amber-200 rounded-md"
                >
                  <p className="text-amber-900">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {parsed?.suggestions && (
          <SectionCard
            icon={Lightbulb}
            title="Suggestions"
            iconColor="text-green-600"
            content={parsed?.suggestions}
            className="mt-4"
          />
        )}

        {parsed?.refactoredCode && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-slate-800">Refactored Code</h3>
            </div>
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-md overflow-x-auto">
              <code>{parsed?.refactoredCode}</code>
            </pre>
          </div>
        )}

        <div className="mt-6 border-t border-slate-200 pt-4">
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            {showRaw ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            <span className="font-medium">Raw Output</span>
          </button>
          {showRaw && (
            <pre className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-md overflow-auto text-sm text-slate-700 text-left leading-relaxed">
              {raw}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewOutput