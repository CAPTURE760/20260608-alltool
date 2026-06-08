'use client'

import { useState } from 'react'

const examples = [
  { label: '强密码 16位', config: { length: 16, upper: true, lower: true, numbers: true, symbols: true } },
  { label: '数字密码 8位', config: { length: 8, upper: false, lower: false, numbers: true, symbols: false } },
  { label: '字母数字 12位', config: { length: 12, upper: true, lower: true, numbers: true, symbols: false } },
]

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [count, setCount] = useState(5)
  const [passwords, setPasswords] = useState<string[]>([])

  const generate = () => {
    let chars = ''
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (numbers) chars += '0123456789'
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!chars) {
      setPasswords(['请至少选择一种字符类型'])
      return
    }

    const result: string[] = []
    for (let i = 0; i < count; i++) {
      let pwd = ''
      for (let j = 0; j < length; j++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      result.push(pwd)
    }
    setPasswords(result)
  }

  const loadExample = (ex: typeof examples[0]) => {
    setLength(ex.config.length)
    setUpper(ex.config.upper)
    setLower(ex.config.lower)
    setNumbers(ex.config.numbers)
    setSymbols(ex.config.symbols)
    generate()
  }

  const copyPassword = async (pwd: string) => {
    await navigator.clipboard.writeText(pwd)
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">密码生成器</h1>
      <p className="tool-desc">生成随机安全密码，支持自定义规则</p>

      {/* 示例按钮 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {examples.map((ex) => (
          <button key={ex.label} onClick={() => loadExample(ex)} className="btn btn-secondary text-sm">
            {ex.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card p-4">
          <div className="mb-4">
            <label className="tool-label">密码长度: {length}</label>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="tool-label">生成数量: {count}</label>
            <input
              type="range"
              min={1}
              max={20}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <div className="card p-4 space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} className="w-4 h-4" />
            <span>大写字母 A-Z</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} className="w-4 h-4" />
            <span>小写字母 a-z</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="w-4 h-4" />
            <span>数字 0-9</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="w-4 h-4" />
            <span>特殊符号 !@#$%...</span>
          </label>
        </div>
      </div>

      <button onClick={generate} className="btn btn-primary mb-6">生成密码</button>

      {passwords.length > 0 && (
        <div className="space-y-2">
          {passwords.map((pwd, i) => (
            <div key={i} className="card p-3 flex items-center justify-between">
              <code className="text-sm font-mono">{pwd}</code>
              <button onClick={() => copyPassword(pwd)} className="btn btn-secondary text-sm py-1 px-3">复制</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
