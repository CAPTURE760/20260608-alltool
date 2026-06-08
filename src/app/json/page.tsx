'use client'

import { useState } from 'react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError('JSON 格式错误: ' + (e as Error).message)
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError('JSON 格式错误: ' + (e as Error).message)
      setOutput('')
    }
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">JSON 格式化</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">输入 JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder='{"key": "value"}'
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={formatJson}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          格式化
        </button>
        <button
          onClick={minifyJson}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          压缩
        </button>
        <button
          onClick={copyOutput}
          disabled={!output}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          复制结果
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          清空
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">输出结果</label>
        <textarea
          value={output}
          readOnly
          className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="输出结果..."
        />
      </div>
    </div>
  )
}
