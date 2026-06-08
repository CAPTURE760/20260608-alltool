'use client'

import { useState } from 'react'

export default function TextCountTool() {
  const [text, setText] = useState('')

  const stats = {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.split('\n').length,
    bytes: new TextEncoder().encode(text).length,
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">字数统计</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">输入文本</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="粘贴或输入要统计的文本..."
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.chars}</div>
          <div className="text-sm text-gray-500">字符数</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.charsNoSpace}</div>
          <div className="text-sm text-gray-500">字符数（不含空格）</div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.words}</div>
          <div className="text-sm text-gray-500">单词数</div>
        </div>
        <div className="p-4 bg-orange-50 dark:bg-orange-900 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.lines}</div>
          <div className="text-sm text-gray-500">行数</div>
        </div>
        <div className="p-4 bg-pink-50 dark:bg-pink-900 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.bytes}</div>
          <div className="text-sm text-gray-500">字节数</div>
        </div>
      </div>
    </div>
  )
}
