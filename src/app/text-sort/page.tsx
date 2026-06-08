'use client'

import { useState } from 'react'

export default function TextSort() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const sortAsc = () => {
    const lines = input.split('\n')
    setOutput([...lines].sort((a, b) => a.localeCompare(b, 'zh-CN')).join('\n'))
  }

  const sortDesc = () => {
    const lines = input.split('\n')
    setOutput([...lines].sort((a, b) => b.localeCompare(a, 'zh-CN')).join('\n'))
  }

  const unique = () => {
    const lines = input.split('\n')
    setOutput([...new Set(lines)].join('\n'))
  }

  const uniqueSort = () => {
    const lines = input.split('\n')
    setOutput([...new Set(lines)].sort((a, b) => a.localeCompare(b, 'zh-CN')).join('\n'))
  }

  const reverse = () => {
    setOutput(input.split('\n').reverse().join('\n'))
  }

  const shuffle = () => {
    const lines = input.split('\n')
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]]
    }
    setOutput(lines.join('\n'))
  }

  const removeEmpty = () => {
    setOutput(input.split('\n').filter(l => l.trim()).join('\n'))
  }

  const trimLines = () => {
    setOutput(input.split('\n').map(l => l.trim()).join('\n'))
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">文本排序去重</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">输入（每行一项）</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-48 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="每行输入一个条目..."
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={sortAsc} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">升序排序</button>
        <button onClick={sortDesc} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">降序排序</button>
        <button onClick={unique} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">去重</button>
        <button onClick={uniqueSort} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">去重+排序</button>
        <button onClick={reverse} className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">反转</button>
        <button onClick={shuffle} className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">随机打乱</button>
        <button onClick={removeEmpty} className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">删除空行</button>
        <button onClick={trimLines} className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">去除首尾空格</button>
        <button onClick={copyOutput} disabled={!output} className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50">复制结果</button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">输出</label>
        <textarea
          value={output}
          readOnly
          className="w-full h-48 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="处理结果..."
        />
      </div>
    </div>
  )
}
