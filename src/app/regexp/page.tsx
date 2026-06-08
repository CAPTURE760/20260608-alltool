'use client'

import { useState } from 'react'

export default function RegExpTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const results = (() => {
    if (!pattern || !text) return []
    try {
      const regex = new RegExp(pattern, flags)
      const matches: { text: string; index: number }[] = []
      let match
      const textToUse = flags.includes('g') ? text : text.slice(0)
      const regexGlobal = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      
      while ((match = regexGlobal.exec(textToUse)) !== null) {
        matches.push({
          text: match[0],
          index: match.index,
        })
        if (!flags.includes('g')) break
      }
      setError('')
      return matches
    } catch (e) {
      setError((e as Error).message)
      return []
    }
  })()

  const highlightedText = (() => {
    if (!pattern || results.length === 0) return text
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      return text.split(regex).map((part, i) => {
        const matchIndex = results.findIndex(r => text.substring(0, r.index + r.text.length).endsWith(part + results.find(m => text.indexOf(m.text) === text.indexOf(part + results.find(() => true)?.text))))
        // 简化高亮逻辑
        return <span key={i}>{part}</span>
      })
    } catch {
      return text
    }
  })()

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">正则表达式测试</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">正则表达式</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 p-3 border rounded-lg font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
              placeholder="输入正则表达式..."
            />
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-20 p-3 border rounded-lg font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
              placeholder="flags"
            />
          </div>
        </div>
        <div className="flex items-end">
          <div className="text-sm text-gray-500">
            常用标志: g (全局), i (忽略大小写), m (多行), s (dotAll)
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">测试文本</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="输入要匹配的文本..."
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium">匹配结果</span>
          <span className="text-sm text-gray-500">{results.length} 个匹配</span>
        </div>
        {results.length > 0 ? (
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex gap-4 text-sm">
                <span className="text-gray-400">[{r.index}]</span>
                <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">{r.text}</code>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">无匹配</div>
        )}
      </div>
    </div>
  )
}
