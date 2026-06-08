'use client'

import { useState } from 'react'

export default function RadixConverter() {
  const [value, setValue] = useState('')
  const [base, setBase] = useState(10)
  const [results, setResults] = useState<Record<string, string>>({})

  const convert = (val: string, fromBase: number) => {
    setValue(val)
    setBase(fromBase)

    if (!val.trim()) {
      setResults({})
      return
    }

    try {
      const decimal = parseInt(val, fromBase)
      if (isNaN(decimal)) throw new Error('无效输入')

      setResults({
        '十进制 (Decimal)': decimal.toString(10),
        '二进制 (Binary)': decimal.toString(2),
        '八进制 (Octal)': decimal.toString(8),
        '十六进制 (Hex)': decimal.toString(16).toUpperCase(),
      })
    } catch {
      setResults({ '错误': '无效输入' })
    }
  }

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  const presets = [
    { label: '十进制', base: 10, placeholder: '如：255' },
    { label: '二进制', base: 2, placeholder: '如：11111111' },
    { label: '八进制', base: 8, placeholder: '如：377' },
    { label: '十六进制', base: 16, placeholder: '如：FF' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">进制转换</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {presets.map(p => (
          <div key={p.base}>
            <label className="block text-sm font-medium mb-1">{p.label}</label>
            <input
              type="text"
              value={base === p.base ? value : ''}
              onChange={(e) => convert(e.target.value, p.base)}
              placeholder={p.placeholder}
              className="w-full p-2 border rounded-lg font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
            />
          </div>
        ))}
      </div>

      <div className="grid gap-3">
        {Object.entries(results).map(([name, val]) => (
          <div key={name} className="flex items-center gap-3 p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 w-40 shrink-0">{name}</span>
            <input
              type="text"
              value={val}
              readOnly
              className="flex-1 p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
            />
            <button onClick={() => copyText(val)} className="px-3 py-1 text-sm text-blue-600 hover:underline">复制</button>
          </div>
        ))}
      </div>
    </div>
  )
}
