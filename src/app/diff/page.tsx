'use client'

import { useState, useMemo } from 'react'

export default function DiffTool() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')

  const diff = useMemo(() => {
    const leftLines = left.split('\n')
    const rightLines = right.split('\n')

    const result: Array<{ type: 'same' | 'add' | 'remove'; left?: string; right?: string; leftNum?: number; rightNum?: number }> = []

    const lcs = new Map<string, number>()
    // Simple line-by-line diff
    let i = 0, j = 0
    while (i < leftLines.length || j < rightLines.length) {
      if (i >= leftLines.length) {
        result.push({ type: 'add', right: rightLines[j], rightNum: j + 1 })
        j++
      } else if (j >= rightLines.length) {
        result.push({ type: 'remove', left: leftLines[i], leftNum: i + 1 })
        i++
      } else if (leftLines[i] === rightLines[j]) {
        result.push({ type: 'same', left: leftLines[i], leftNum: i + 1, rightNum: j + 1 })
        i++; j++
      } else {
        // Look ahead
        let foundInRight = rightLines.slice(j + 1).indexOf(leftLines[i])
        let foundInLeft = leftLines.slice(i + 1).indexOf(rightLines[j])

        if (foundInRight === -1 && foundInLeft === -1) {
          result.push({ type: 'remove', left: leftLines[i], leftNum: i + 1 })
          result.push({ type: 'add', right: rightLines[j], rightNum: j + 1 })
          i++; j++
        } else if (foundInRight === -1 || (foundInLeft !== -1 && foundInLeft <= foundInRight)) {
          result.push({ type: 'add', right: rightLines[j], rightNum: j + 1 })
          j++
        } else {
          result.push({ type: 'remove', left: leftLines[i], leftNum: i + 1 })
          i++
        }
      }
    }

    return result
  }, [left, right])

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">代码对比 (Diff)</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">原始文本</label>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 resize-none"
            placeholder="粘贴原始代码..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">修改后文本</label>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 resize-none"
            placeholder="粘贴修改后代码..."
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm font-medium border-b border-gray-200 dark:border-gray-600">
          对比结果
        </div>
        <div className="font-mono text-sm overflow-auto max-h-96">
          {diff.map((line, idx) => (
            <div
              key={idx}
              className={`flex border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                line.type === 'add' ? 'bg-green-50 dark:bg-green-900/20' :
                line.type === 'remove' ? 'bg-red-50 dark:bg-red-900/20' : ''
              }`}
            >
              <div className="w-12 text-right pr-2 text-gray-400 select-none border-r border-gray-200 dark:border-gray-600">
                {line.leftNum || ''}
              </div>
              <div className="w-12 text-right pr-2 text-gray-400 select-none border-r border-gray-200 dark:border-gray-600">
                {line.rightNum || ''}
              </div>
              <div className="flex-1 px-2 whitespace-pre-wrap">
                {line.type === 'remove' && <span className="text-red-600">- {line.left}</span>}
                {line.type === 'add' && <span className="text-green-600">+ {line.right}</span>}
                {line.type === 'same' && <span className="text-gray-700 dark:text-gray-300">  {line.left}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
