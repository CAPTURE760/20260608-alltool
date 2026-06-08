'use client'

import { useState } from 'react'

const examples = [
  { label: '加密示例', text: 'Hello DevKit!', key: 'my-secret-key-123' },
  { label: '中文示例', text: '开发者工具箱', key: 'devkit-2024' },
]

export default function CryptoTool() {
  const [text, setText] = useState('')
  const [key, setKey] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')

  const loadExample = (ex: typeof examples[0]) => {
    setText(ex.text)
    setKey(ex.key)
    setMode('encrypt')
    process(ex.text, ex.key, 'encrypt')
  }

  const process = async (inputText: string, inputKey: string, inputMode: 'encrypt' | 'decrypt') => {
    if (!inputText || !inputKey) {
      setOutput('')
      return
    }

    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(inputText)
      const keyData = encoder.encode(inputKey)

      // 使用 PBKDF2 派生密钥
      const baseKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        'PBKDF2',
        false,
        ['deriveKey']
      )

      const derivedKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: encoder.encode('devkit-salt'),
          iterations: 100000,
          hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      )

      if (inputMode === 'encrypt') {
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const encrypted = await crypto.subtle.encrypt(
          { name: 'AES-GCM', iv },
          derivedKey,
          data
        )
        const combined = new Uint8Array(iv.length + encrypted.byteLength)
        combined.set(iv, 0)
        combined.set(new Uint8Array(encrypted), iv.length)
        setOutput(btoa(String.fromCharCode(...combined)))
      } else {
        const combined = new Uint8Array(atob(inputText).split('').map(c => c.charCodeAt(0)))
        const iv = combined.slice(0, 12)
        const encrypted = combined.slice(12)
        const decrypted = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          derivedKey,
          encrypted
        )
        setOutput(new TextDecoder().decode(decrypted))
      }
    } catch (e) {
      setOutput('错误: ' + (e as Error).message)
    }
  }

  const handleProcess = () => {
    process(text, key, mode)
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">文本加密解密</h1>
      <p className="tool-desc">使用 AES-256-GCM 算法加密解密文本</p>

      {/* 示例按钮 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {examples.map((ex) => (
          <button key={ex.label} onClick={() => loadExample(ex)} className="btn btn-secondary text-sm">
            {ex.label}
          </button>
        ))}
      </div>

      <div className="tool-section">
        <label className="tool-label">密钥</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="input-area h-10"
          placeholder="输入密钥..."
        />
      </div>

      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={mode === 'encrypt'} onChange={() => setMode('encrypt')} className="w-4 h-4" />
          <span className="text-sm font-medium">加密</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={mode === 'decrypt'} onChange={() => setMode('decrypt')} className="w-4 h-4" />
          <span className="text-sm font-medium">解密</span>
        </label>
      </div>

      <div className="tool-section">
        <label className="tool-label">{mode === 'encrypt' ? '原始文本' : '加密文本'}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-area h-32"
          placeholder={mode === 'encrypt' ? '输入要加密的文本...' : '输入加密后的文本...'}
        />
      </div>

      <button onClick={handleProcess} className="btn btn-primary mb-6">
        {mode === 'encrypt' ? '加密' : '解密'}
      </button>

      <div className="tool-section">
        <label className="tool-label">输出结果</label>
        <textarea
          value={output}
          readOnly
          className="input-area h-32"
          placeholder="结果..."
        />
      </div>
    </div>
  )
}
