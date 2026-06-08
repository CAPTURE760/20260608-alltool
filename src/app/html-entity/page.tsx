'use client'

import { useState } from 'react'

const examples = [
  { label: 'HTML 标签', text: '<div class="test">Hello & World</div>' },
  { label: '特殊符号', text: '&lt; &gt; &amp; &quot; &apos;' },
]

const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
}

export default function HtmlEntity() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const loadExample = (ex: typeof examples[0]) => {
    setInput(ex.text)
    setMode('encode')
    process(ex.text, 'encode')
  }

  const encode = (text: string) => {
    return text.replace(/[&<>"']/g, char => htmlEntities[char])
  }

  const decode = (text: string) => {
    const doc = new DOMParser().parseFromString(text, 'text/html')
    return doc.documentElement.textContent || ''
  }

  const process = (text: string, m: 'encode' | 'decode') => {
    setOutput(m === 'encode' ? encode(text) : decode(text))
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">HTML 实体编解码</h1>
      <p className="tool-desc">转换 HTML 实体，如 &lt; ↔ <</p>

      {/* 示例按钮 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {examples.map((ex) => (
          <button key={ex.label} onClick={() => loadExample(ex)} className="btn btn-secondary text-sm">
            {ex.label}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-4">
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
        <label className="tool-label">{mode === 'encode' ? '原始文本' : 'HTML 实体'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-area h-32"
          placeholder={mode === 'encode' ? '输入包含特殊字符的文本...' : '输入 HTML 实体...'}
        />
      </div>

      <button onClick={() => process(input, mode)} className="btn btn-primary mb-6">
        {mode === 'encode' ? '编码' : '解码'}
      </button>

      <div className="tool-section">
        <label className="tool-label">输出结果</label>
        <textarea
          value={output}
          readOnly
          className="input-area h-32"
          placeholder="转换结果..."
        />
      </div>
    </div>
  )
}
