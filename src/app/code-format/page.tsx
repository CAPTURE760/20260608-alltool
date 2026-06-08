'use client'

import { useState } from 'react'

export default function CodeFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [lang, setLang] = useState<'js' | 'css' | 'sql'>('js')
  const [error, setError] = useState('')

  const format = () => {
    setError('')
    try {
      switch (lang) {
        case 'js':
          setOutput(JSON.stringify(JSON.parse(input), null, 2))
          break
        case 'css':
          // 简单的 CSS 格式化
          const formattedCSS = input
            .replace(/\{/g, ' {\n  ')
            .replace(/;/g, ';\n  ')
            .replace(/\}/g, '\n}\n')
            .replace(/\n\s*\n/g, '\n')
          setOutput(formattedCSS)
          break
        case 'sql':
          // 简单的 SQL 格式化
          const formattedSQL = input
            .replace(/\bSELECT\b/gi, '\nSELECT\n  ')
            .replace(/\bFROM\b/gi, '\nFROM\n  ')
            .replace(/\bWHERE\b/gi, '\nWHERE\n  ')
            .replace(/\bJOIN\b/gi, '\nJOIN\n  ')
            .replace(/\bON\b/gi, '\nON\n  ')
            .replace(/\bGROUP BY\b/gi, '\nGROUP BY\n  ')
            .replace(/\bORDER BY\b/gi, '\nORDER BY\n  ')
          setOutput(formattedSQL.trim())
          break
      }
    } catch (e) {
      setError('格式化失败: ' + (e as Error).message)
    }
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">代码格式化</h1>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setLang('js')}
          className={`px-4 py-2 rounded-lg ${lang === 'js' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          JSON/JS
        </button>
        <button
          onClick={() => setLang('css')}
          className={`px-4 py-2 rounded-lg ${lang === 'css' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          CSS
        </button>
        <button
          onClick={() => setLang('sql')}
          className={`px-4 py-2 rounded-lg ${lang === 'sql' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          SQL
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">输入代码</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
            placeholder="粘贴代码..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">格式化结果</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
            placeholder="输出结果..."
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={format}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          格式化
        </button>
        <button
          onClick={copyOutput}
          disabled={!output}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          复制结果
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}
    </div>
  )
}
