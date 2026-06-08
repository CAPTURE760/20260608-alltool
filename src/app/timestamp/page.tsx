'use client'

import { useState } from 'react'

export default function TimestampTool() {
  const [timestampInput, setTimestampInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [result, setResult] = useState('')

  const now = Math.floor(Date.now() / 1000)

  const timestampToDate = () => {
    const ts = parseInt(timestampInput)
    if (isNaN(ts)) {
      setResult('请输入有效的时间戳')
      return
    }
    const date = new Date(ts * 1000)
    setResult(date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }))
  }

  const dateToTimestamp = () => {
    const date = new Date(dateInput)
    if (isNaN(date.getTime())) {
      setResult('请输入有效的日期')
      return
    }
    setResult(Math.floor(date.getTime() / 1000).toString())
  }

  const useNow = () => {
    setTimestampInput(now.toString())
  }

  const copyResult = async () => {
    await navigator.clipboard.writeText(result)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">时间戳转换</h1>

      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <div className="flex justify-between items-center">
          <span>当前时间戳（秒）</span>
          <code className="text-xl font-mono">{now}</code>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-lg">
          <h2 className="font-medium mb-4">时间戳 → 日期</h2>
          <input
            type="text"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            className="w-full p-3 border rounded-lg font-mono mb-3 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
            placeholder="输入 Unix 时间戳（秒）"
          />
          <div className="flex gap-2">
            <button
              onClick={timestampToDate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              转换
            </button>
            <button
              onClick={useNow}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              使用当前时间
            </button>
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="font-medium mb-4">日期 → 时间戳</h2>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          />
          <button
            onClick={dateToTimestamp}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            转换
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">结果：</span>
              <code className="ml-2 font-mono">{result}</code>
            </div>
            <button
              onClick={copyResult}
              className="text-sm text-blue-600 hover:underline"
            >
              复制
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
