'use client'

import { useState } from 'react'

export default function JsonFormat() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const format = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
    } catch (e) {
      setError(`格式错误: ${(e as Error).message}`)
      setOutput('')
    }
  }

  const compress = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
    } catch (e) {
      setError(`格式错误: ${(e as Error).message}`)
      setOutput('')
    }
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">JSON 格式化</h1>
      <p className="tool-desc">JSON 压缩、美化、校验，支持错误定位</p>

      <div className="tool-section">
        <label className="tool-label">输入 JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-area h-64"
          placeholder='{"name": "DevKit", "version": "1.0.0"}'
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600 dark:text-slate-300">缩进</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
          >
            <option value={2}>2 空格</option>
            <option value={4}>4 空格</option>
            <option value={1}>1 Tab</option>
          </select>
        </div>
        <button onClick={format} className="btn btn-primary">格式化</button>
        <button onClick={compress} className="btn btn-secondary">压缩</button>
        <button onClick={clear} className="btn btn-secondary">清空</button>
        <button onClick={copyOutput} disabled={!output} className="btn btn-success">复制结果</button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <div className="tool-section">
        <label className="tool-label">输出结果</label>
        <textarea
          value={output}
          readOnly
          className="input-area h-64"
          placeholder="格式化后的 JSON..."
        />
      </div>
    </div>
  )
}
