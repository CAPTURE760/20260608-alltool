'use client'

import { useState } from 'react'

export default function UnicodeConverter() {
  const [text, setText] = useState('')
  const [unicode, setUnicode] = useState('')
  const [mode, setMode] = useState<'text-to-unicode' | 'unicode-to-text'>('text-to-unicode')

  const textToUnicode = (str: string) => {
    return Array.from(str)
      .map(c => '\\u' + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0'))
      .join('')
  }

  const unicodeToText = (str: string) => {
    return str.replace(/\\u([0-9a-fA-F]{4,6})/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
  }

  const convert = () => {
    if (mode === 'text-to-unicode') {
      setUnicode(textToUnicode(text))
    } else {
      setUnicode(unicodeToText(text))
    }
  }

  const swap = () => {
    if (mode === 'text-to-unicode') {
      setText(unicode)
      setUnicode(textToUnicode(unicode))
      setMode('unicode-to-text')
    } else {
      setText(unicode)
      setUnicode(unicodeToText(unicode))
      setMode('text-to-unicode')
    }
  }

  const copyUnicode = async () => {
    await navigator.clipboard.writeText(unicode)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Unicode 转换</h1>

      <div className="mb-4 flex gap-4">
        <label className="flex items-center">
          <input type="radio" checked={mode === 'text-to-unicode'} onChange={() => setMode('text-to-unicode')} className="mr-2" />
          文本 → Unicode
        </label>
        <label className="flex items-center">
          <input type="radio" checked={mode === 'unicode-to-text'} onChange={() => setMode('unicode-to-text')} className="mr-2" />
          Unicode → 文本
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          {mode === 'text-to-unicode' ? '输入文本' : '输入 Unicode (如 \\u4E2D\\u6587)'}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder={mode === 'text-to-unicode' ? '输入中文或任意字符...' : '输入 \\uXXXX 格式...'}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">转换</button>
        <button onClick={swap} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">互换输入输出</button>
        <button onClick={copyUnicode} disabled={!unicode} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">复制结果</button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">输出</label>
        <textarea
          value={unicode}
          readOnly
          className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="转换结果..."
        />
      </div>
    </div>
  )
}
