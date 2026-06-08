'use client'

import { useState } from 'react'

const morseCode: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
}

const reverseMorse: Record<string, string> = Object.fromEntries(
  Object.entries(morseCode).map(([k, v]) => [v, k])
)

const examples = [
  { label: 'SOS', text: 'SOS' },
  { label: 'Hello', text: 'HELLO WORLD' },
  { label: '摩斯解码', text: '.... . .-.. .-.. --- / .-- --- .-. .-.. -..' },
]

export default function MorseCode() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const loadExample = (ex: typeof examples[0]) => {
    setInput(ex.text)
    if (ex.text.includes('.') || ex.text.includes('-')) {
      setMode('decode')
      process(ex.text, 'decode')
    } else {
      setMode('encode')
      process(ex.text, 'encode')
    }
  }

  const encode = (text: string) => {
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ')
  }

  const decode = (text: string) => {
    return text.split(' ').map(code => reverseMorse[code] || code).join('')
  }

  const process = (text: string, m: 'encode' | 'decode') => {
    setOutput(m === 'encode' ? encode(text) : decode(text))
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">摩斯电码</h1>
      <p className="tool-desc">文本与摩斯电码互转</p>

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
          <span className="text-sm font-medium">文本 → 摩斯</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={mode === 'decode'} onChange={() => setMode('decode')} className="w-4 h-4" />
          <span className="text-sm font-medium">摩斯 → 文本</span>
        </label>
      </div>

      <div className="tool-section">
        <label className="tool-label">{mode === 'encode' ? '文本' : '摩斯电码'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-area h-32"
          placeholder={mode === 'encode' ? '输入文本...' : '输入摩斯电码，用空格分隔...'}
        />
      </div>

      <button onClick={() => process(input, mode)} className="btn btn-primary mb-6">转换</button>

      <div className="tool-section">
        <label className="tool-label">输出结果</label>
        <textarea
          value={output}
          readOnly
          className="input-area h-32"
          placeholder="转换结果..."
        />
      </div>

      {/* 摩斯码表 */}
      <details className="mt-8">
        <summary className="cursor-pointer text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
          查看摩斯码表
        </summary>
        <div className="mt-4 grid grid-cols-6 md:grid-cols-9 gap-2 text-xs">
          {Object.entries(morseCode).slice(0, 26).map(([char, code]) => (
            <div key={char} className="card p-2 text-center">
              <div className="font-bold">{char}</div>
              <div className="text-slate-500 dark:text-slate-400 font-mono">{code}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
