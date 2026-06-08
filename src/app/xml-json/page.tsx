'use client'

import { useState } from 'react'

const examples = [
  { label: '简单 XML', xml: '<?xml version="1.0"?>\n<root>\n  <name>DevKit</name>\n  <version>1.0.0</version>\n</root>' },
  { label: '嵌套结构', xml: '<?xml version="1.0"?>\n<config>\n  <server host="localhost" port="3000"/>\n  <debug>true</debug>\n</config>' },
]

export default function XmlJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'xml-to-json' | 'json-to-xml'>('xml-to-json')
  const [error, setError] = useState('')

  const loadExample = (ex: typeof examples[0]) => {
    setInput(ex.xml)
    setMode('xml-to-json')
    convert(ex.xml, 'xml-to-json')
  }

  const xmlToJson = (xml: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'text/xml')

    const parseNode = (node: Element | Document): any => {
      if (node instanceof Document) {
        return parseNode(node.documentElement)
      }

      const result: Record<string, any> = {}

      // Attributes
      if (node.attributes.length > 0) {
        result['@attributes'] = {}
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i]
          result['@attributes'][attr.name] = attr.value
        }
      }

      // Child nodes
      const childElements = Array.from(node.children)
      if (childElements.length > 0) {
        childElements.forEach(child => {
          const childName = child.nodeName
          const childValue = parseNode(child)
          if (result[childName]) {
            if (!Array.isArray(result[childName])) {
              result[childName] = [result[childName]]
            }
            result[childName].push(childValue)
          } else {
            result[childName] = childValue
          }
        })
      } else if (node.textContent?.trim()) {
        return node.textContent.trim()
      }

      return result
    }

    return parseNode(doc)
  }

  const jsonToXml = (json: any, rootName: string = 'root'): string => {
    const convert = (obj: any, name: string): string => {
      if (typeof obj !== 'object' || obj === null) {
        return `<${name}>${obj}</${name}>`
      }

      let attrs = ''
      let children = ''

      Object.entries(obj).forEach(([key, value]) => {
        if (key === '@attributes') {
          attrs = Object.entries(value as Record<string, string>)
            .map(([k, v]) => ` ${k}="${v}"`).join('')
        } else if (Array.isArray(value)) {
          children += value.map(v => convert(v, key)).join('')
        } else {
          children += convert(value, key)
        }
      })

      return `<${name}${attrs}>${children}</${name}>`
    }

    return `<?xml version="1.0"?>\n${convert(json, rootName)}`
  }

  const convert = (text: string, m: 'xml-to-json' | 'json-to-xml') => {
    setError('')
    try {
      if (m === 'xml-to-json') {
        const json = xmlToJson(text)
        setOutput(JSON.stringify(json, null, 2))
      } else {
        const json = JSON.parse(text)
        setOutput(jsonToXml(json))
      }
    } catch (e) {
      setError('转换失败: ' + (e as Error).message)
      setOutput('')
    }
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">XML ↔ JSON</h1>
      <p className="tool-desc">XML 与 JSON 格式互转</p>

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
          <input type="radio" checked={mode === 'xml-to-json'} onChange={() => setMode('xml-to-json')} className="w-4 h-4" />
          <span className="text-sm font-medium">XML → JSON</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={mode === 'json-to-xml'} onChange={() => setMode('json-to-xml')} className="w-4 h-4" />
          <span className="text-sm font-medium">JSON → XML</span>
        </label>
      </div>

      <div className="tool-section">
        <label className="tool-label">{mode === 'xml-to-json' ? 'XML' : 'JSON'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-area h-48"
          placeholder={mode === 'xml-to-json' ? '输入 XML...' : '输入 JSON...'}
        />
      </div>

      <button onClick={() => convert(input, mode)} className="btn btn-primary mb-6">转换</button>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="tool-section">
        <label className="tool-label">{mode === 'xml-to-json' ? 'JSON' : 'XML'}</label>
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
