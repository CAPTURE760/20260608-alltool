'use client'

import { useState } from 'react'

const examples = [
  { label: '两段差异', left: 'Hello World\nLine 2\nLine 3', right: 'Hello DevKit\nLine 2 modified\nLine 3\nLine 4' },
  { label: '代码变更', left: 'function foo() {\n  return 1\n}', right: 'function foo() {\n  return 2\n}' },
]

export default function TextDiff() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [diff, setDiff] = useState<{type: string, content: string, num: number}[]>([])

  const loadExample = (example: typeof examples[0]) => {
    setLeft(example.left)
    setRight(example.right)
    computeDiff(example.left, example.right)
  }

  const computeDiff = (l: string, r: string) => {
    const leftLines = l.split('\n')
    const rightLines = r.split('\n')
    const maxLen = Math.max(leftLines.length, rightLines.length)
    const result: {type: string, content: string, num: number}[] = []

    for (let i = 0; i < maxLen; i++) {
      const lLine = leftLines[i] || ''
      const rLine = rightLines[i] || ''

      if (lLine === rLine) {
        result.push({ type: 'same', content: lLine, num: i + 1 })
      } else {
        if (lLine) result.push({ type: 'remove', content: lLine, num: i + 1 })
        if (rLine) result.push({ type: 'add', content: rLine, num: i + 1 })
      }
    }

    setDiff(result)
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">文本差异对比</h1>
      <p className="tool-desc">对比两段文本，高亮显示差异</p>

      {/* 示例按钮 */}
      <div className="flex gap-2 mb-4">
        {examples.map((ex) => (
          <button key={ex.label} onClick={() => loadExample(ex)} className="btn btn-secondary text-sm">
            {ex.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="tool-label">原文</label>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            className="input-area h-48"
            placeholder="输入原始文本..."
          />
        </div>
        <div>
          <label className="tool-label">修改后</label>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            className="input-area h-48"
            placeholder="输入修改后文本..."
          />
        </div>
      </div>

      <button onClick={() => computeDiff(left, right)} className="btn btn-primary mb-6">对比</button>

      {diff.length > 0 && (
        <div className="card overflow-hidden">
          {diff.map((line, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-2 font-mono text-sm border-b border-slate-100 dark:border-slate-700 last:border-b-0 ${
                line.type === 'add' ? 'bg-emerald-50 dark:bg-emerald-900/20' :
                line.type === 'remove' ? 'bg-red-50 dark:bg-red-900/20' : ''
              }`}
            >
              <span className="diff-line-num">{line.num}</span>
              <span className={line.type === 'remove' ? 'text-red-600 dark:text-red-400' : line.type === 'add' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300'}>
                {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
              </span>
              <span className={line.type === 'remove' ? 'text-red-600 dark:text-red-400' : line.type === 'add' ? 'text-emerald-600 dark:text-emerald-400' : ''}>
                {line.content}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
