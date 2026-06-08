'use client'

import { useState } from 'react'

export default function JsonToCsv() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [delimiter, setDelimiter] = useState(',')

  const convert = () => {
    setError('')
    try {
      const data = JSON.parse(input)
      const arr = Array.isArray(data) ? data : [data]
      if (arr.length === 0) {
        setError('JSON 数组为空')
        return
      }

      // 收集所有键
      const keys = new Set<string>()
      arr.forEach((item: any) => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach(k => keys.add(k))
        }
      })
      const headers = Array.from(keys)

      const escapeCsv = (val: any) => {
        const str = val === null || val === undefined ? '' : String(val)
        if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }

      const lines = [headers.map(escapeCsv).join(delimiter)]
      arr.forEach((item: any) => {
        const row = headers.map(h => escapeCsv(item?.[h]))
        lines.push(row.join(delimiter))
      })

      setOutput(lines.join('\n'))
    } catch (e) {
      setError('转换失败: ' + (e as Error).message)
    }
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
  }

  const downloadCsv = () => {
    const blob = new Blob(['\uFEFF' + output], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">JSON 转 CSV</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">输入 JSON（对象或数组）</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder='[{"name": "张三", "age": 25}, {"name": "李四", "age": 30}]'
        />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">分隔符</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          >
            <option value=",">逗号 (,)</option>
            <option value="\t">制表符 (Tab)</option>
            <option value=";">分号 (;)</option>
          </select>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            onClick={convert}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            转换
          </button>
          <button
            onClick={copyOutput}
            disabled={!output}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            复制结果
          </button>
          <button
            onClick={downloadCsv}
            disabled={!output}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            下载 CSV
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">CSV 输出</label>
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
