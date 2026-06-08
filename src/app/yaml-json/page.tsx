'use client'

import { useState } from 'react'

const examples = [
  { label: '简单对象', yaml: 'name: DevKit\nversion: 1.0.0\ndescription: 开发工具集' },
  { label: '嵌套结构', yaml: 'server:\n  host: localhost\n  port: 3000\ndatabase:\n  type: mysql\n  name: mydb' },
]

export default function YamlJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'yaml-to-json' | 'json-to-yaml'>('yaml-to-json')
  const [error, setError] = useState('')

  const loadExample = (ex: typeof examples[0]) => {
    setInput(ex.yaml)
    setMode('yaml-to-json')
    convert(ex.yaml, 'yaml-to-json')
  }

  const yamlToJson = (yaml: string) => {
    const lines = yaml.split('\n')
    const result: Record<string, any> = {}
    let currentKey = ''
    let currentIndent = 0
    const stack: { obj: Record<string, any>, indent: number }[] = [{ obj: result, indent: -1 }]

    for (const line of lines) {
      if (!line.trim() || line.trim().startsWith('#')) continue

      const indent = line.search(/\S/)
      const [key, ...valueParts] = line.trim().split(':')
      const value = valueParts.join(':').trim()

      while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
        stack.pop()
      }

      const current = stack[stack.length - 1].obj

      if (value) {
        // Parse value
        let parsedValue: any = value
        if (value === 'true') parsedValue = true
        else if (value === 'false') parsedValue = false
        else if (value === 'null') parsedValue = null
        else if (!isNaN(Number(value))) parsedValue = Number(value)
        else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          parsedValue = value.slice(1, -1)
        }
        current[key.trim()] = parsedValue
      } else {
        current[key.trim()] = {}
        stack.push({ obj: current[key.trim()], indent })
      }
    }

    return result
  }

  const jsonToYaml = (json: any, indent: number = 0): string => {
    const spaces = '  '.repeat(indent)
    if (typeof json !== 'object' || json === null) {
      return String(json)
    }

    return Object.entries(json).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return `${spaces}${key}:\n${jsonToYaml(value, indent + 1)}`
      }
      return `${spaces}${key}: ${value}`
    }).join('\n')
  }

  const convert = (text: string, m: 'yaml-to-json' | 'json-to-yaml') => {
    setError('')
    try {
      if (m === 'yaml-to-json') {
        const json = yamlToJson(text)
        setOutput(JSON.stringify(json, null, 2))
      } else {
        const json = JSON.parse(text)
        setOutput(jsonToYaml(json))
      }
    } catch (e) {
      setError('转换失败: ' + (e as Error).message)
      setOutput('')
    }
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">YAML ↔ JSON</h1>
      <p className="tool-desc">YAML 与 JSON 格式互转</p>

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
          <input type="radio" checked={mode === 'yaml-to-json'} onChange={() => setMode('yaml-to-json')} className="w-4 h-4" />
          <span className="text-sm font-medium">YAML → JSON</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={mode === 'json-to-yaml'} onChange={() => setMode('json-to-yaml')} className="w-4 h-4" />
          <span className="text-sm font-medium">JSON → YAML</span>
        </label>
      </div>

      <div className="tool-section">
        <label className="tool-label">{mode === 'yaml-to-json' ? 'YAML' : 'JSON'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-area h-48"
          placeholder={mode === 'yaml-to-json' ? '输入 YAML...' : '输入 JSON...'}
        />
      </div>

      <button onClick={() => convert(input, mode)} className="btn btn-primary mb-6">转换</button>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="tool-section">
        <label className="tool-label">{mode === 'yaml-to-json' ? 'JSON' : 'YAML'}</label>
        <textarea
          value={output}
          readOnly
          className="input-area h-48"
          placeholder="转换结果..."
        />
      </div>
    </div>
  )
}
