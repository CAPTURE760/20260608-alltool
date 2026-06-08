'use client'

import { useState } from 'react'

export default function UrlTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')

  const process = () => {
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch (e) {
      setError('转换失败: ' + (e as Error).message)
    }
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">URL 编解码</h1>

      <div className="mb-4 flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            checked={mode === 'encode'}
            onChange={() => setMode('encode')}
            className="mr-2"
          />
          编码 (encodeURIComponent)
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            checked={mode === 'decode'}
            onChange={() => setMode('decode')}
            className="mr-2"
          />
          解码 (decodeURIComponent)
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">输入</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder={mode === 'encode' ? '输入要编码的 URL 或文本...' : '输入编码后的 URL...'}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={process}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {mode === 'encode' ? '编码' : '解码'}
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
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">输出</label>
        <textarea
          value={output}
          readOnly
          className="w-full h-40 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="输出结果..."
        />
      </div>
    </div>
  )
}
