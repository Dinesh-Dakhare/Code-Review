import { useState } from 'react'
import { Send, FileCode } from 'lucide-react'

const EXAMPLES = {
  clean: {
    filename: 'utils.js',
    code: `function calculateSum(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

function isEven(number) {
  return number % 2 === 0;
}

export { calculateSum, isEven };`
  },
  buggy: {
    filename: 'buggy.js',
    code: `function divide(a, b) {
  return a / b;
}

function getUser(id) {
  const users = null;
  return users.find(u => u.id === id);
}

let counter = 0;
function increment() {
  counter++;
  return counter;
}`
  },
  security: {
    filename: 'api.js',
    code: `const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  const userId = req.query.id;
  const query = "SELECT * FROM users WHERE id = " + userId;
  db.query(query, (err, result) => {
    res.send(result);
  });
});

app.post('/login', (req, res) => {
  eval(req.body.code);
});`
  }
}

function CodeInput({ onSubmit, disabled }) {
  const [filename, setFilename] = useState('example.js')
  const [code, setCode] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (filename.trim() && code.trim()) {
      onSubmit(filename, code)
    }
  }

  const loadExample = (type) => {
    setFilename(EXAMPLES[type].filename)
    setCode(EXAMPLES[type].code)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileCode className="w-5 h-5 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-slate-800">Code Input</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Filename
          </label>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="example.js"
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-input w-full h-64 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Paste your code here..."
            disabled={disabled}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadExample('clean')}
            className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
            disabled={disabled}
          >
            Clean JS
          </button>
          <button
            type="button"
            onClick={() => loadExample('buggy')}
            className="px-3 py-1 text-sm bg-amber-50 text-amber-700 rounded-md hover:bg-amber-100 transition-colors"
            disabled={disabled}
          >
            Buggy JS
          </button>
          <button
            type="button"
            onClick={() => loadExample('security')}
            className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
            disabled={disabled}
          >
            Security Issue Example
          </button>
        </div>

        <button
          type="submit"
          disabled={disabled || !filename.trim() || !code.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <Send className="w-5 h-5" />
          {disabled ? 'Reviewing...' : 'Review Code'}
        </button>
      </form>
    </div>
  )
}

export default CodeInput