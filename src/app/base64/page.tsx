'use client'

import { useState } from 'react'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')

  const process = () => {
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch (e) {
      setError('转换失败: ' + (e as Error).message)
    }
  }

  const swap = () => {
    setInput(output)
    setOutput(input)
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">Base64 编解码</h1>
      <p className="tool-desc">文本与 Base64 互转，支持中文</p>

      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={mode === 'encode'} onChange={() => setMode('encode')} className="w-4 h-4" />
          <span className="text-sm font-medium">编码</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={mode === 'decode'} onChange={() => setMode('decode')} className="w-4 h-4" />
          <span className="text-sm font-medium">解码</span>
        </label>
      </div>

      <div className="tool-section">
        <label className="tool-label">{mode === 'encode' ? '原始文本' : 'Base64 文本'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-area h-40"
          placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入 Base64 字符串...'}
        />
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={process} className="btn btn-primary">
          {mode === 'encode' ? '编码' : '解码'}
        </button>
        <button onClick={swap} className="btn btn-secondary">互换输入输出</button>
        <button onClick={copyOutput} disabled={!output} className="btn btn-success">复制结果</button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="tool-section">
        <label className="tool-label">输出结果</label>
        <textarea
          value={output}
          readOnly
          className="input-area h-40"
          placeholder="转换结果..."
        />
      </div>
    </div>
  )
}
