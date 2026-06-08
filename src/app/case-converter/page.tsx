'use client'

import { useState } from 'react'

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [outputs, setOutputs] = useState<Record<string, string>>({})

  const convert = (text: string) => {
    // camelCase
    const camel = text
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, c => c.toLowerCase())

    // PascalCase
    const pascal = camel.replace(/^(.)/, c => c.toUpperCase())

    // snake_case
    const snake = text
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[-\s]+/g, '_')
      .toLowerCase()

    // kebab-case
    const kebab = text
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[_\s]+/g, '-')
      .toLowerCase()

    // UPPER_SNAKE_CASE
    const upperSnake = snake.toUpperCase()

    // lower case
    const lower = text.toLowerCase()

    // UPPER CASE
    const upper = text.toUpperCase()

    setOutputs({
      'camelCase': camel,
      'PascalCase': pascal,
      'snake_case': snake,
      'kebab-case': kebab,
      'UPPER_SNAKE_CASE': upperSnake,
      'lower case': lower,
      'UPPER CASE': upper,
    })
  }

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">大小写转换</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">输入文本</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); convert(e.target.value) }}
          className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="输入任意格式文本，如：helloWorld, hello_world, hello-world..."
        />
      </div>

      <div className="grid gap-3">
        {Object.entries(outputs).map(([name, value]) => (
          <div key={name} className="flex items-center gap-3 p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 w-36 shrink-0">{name}</span>
            <input
              type="text"
              value={value}
              readOnly
              className="flex-1 p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
            />
            <button onClick={() => copyText(value)} className="px-3 py-1 text-sm text-blue-600 hover:underline">复制</button>
          </div>
        ))}
      </div>
    </div>
  )
}
