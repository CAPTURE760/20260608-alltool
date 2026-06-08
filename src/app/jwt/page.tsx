'use client'

import { useState } from 'react'

const examples = [
  { label: '示例 Token', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' },
  { label: '自定义 Payload', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInJvbGUiOiJhZG1pbiIsImV4cCI6MTYzNjY2NjY2Nn0.signature' },
]

export default function JwtParser() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')

  const loadExample = (ex: typeof examples[0]) => {
    setToken(ex.token)
    parseJwt(ex.token)
  }

  const parseJwt = (t: string) => {
    setError('')
    setHeader('')
    setPayload('')
    try {
      const parts = t.split('.')
      if (parts.length !== 3) throw new Error('JWT 格式错误，应为三段以 . 分隔')

      const headerObj = JSON.parse(atob(parts[0]))
      const payloadObj = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))

      setHeader(JSON.stringify(headerObj, null, 2))
      setPayload(JSON.stringify(payloadObj, null, 2))
    } catch (e) {
      setError('解析失败: ' + (e as Error).message)
    }
  }

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">JWT 解析</h1>
      <p className="tool-desc">解码 JSON Web Token，查看 Header 和 Payload</p>

      {/* 示例按钮 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {examples.map((ex) => (
          <button key={ex.label} onClick={() => loadExample(ex)} className="btn btn-secondary text-sm">
            {ex.label}
          </button>
        ))}
      </div>

      <div className="tool-section">
        <label className="tool-label">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => { setToken(e.target.value); parseJwt(e.target.value) }}
          className="input-area h-24"
          placeholder="粘贴 JWT Token..."
        />
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {header && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="tag tag-blue">Header</span>
              <button onClick={() => copyText(header)} className="text-sm text-blue-600 dark:text-blue-400">复制</button>
            </div>
            <pre className="text-sm font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded-lg overflow-auto">{header}</pre>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="tag tag-green">Payload</span>
              <button onClick={() => copyText(payload)} className="text-sm text-blue-600 dark:text-blue-400">复制</button>
            </div>
            <pre className="text-sm font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded-lg overflow-auto">{payload}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
