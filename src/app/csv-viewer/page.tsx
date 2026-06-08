'use client'

import { useState, useRef } from 'react'

const examples = [
  { label: '简单数据', csv: 'name,age,city\nAlice,25,Beijing\nBob,30,Shanghai\nCarol,28,Guangzhou' },
  { label: '带引号', csv: 'id,name,description\n1,"Product A","A good product"\n2,"Product B","Another one"' },
]

export default function CsvViewer() {
  const [csv, setCsv] = useState('')
  const [data, setData] = useState<string[][]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadExample = (ex: typeof examples[0]) => {
    setCsv(ex.csv)
    parseCsv(ex.csv)
  }

  const parseCsv = (text: string) => {
    setError('')
    try {
      const lines = text.trim().split('\n')
      if (lines.length === 0) {
        setHeaders([])
        setData([])
        return
      }

      const parseLine = (line: string): string[] => {
        const result: string[] = []
        let current = ''
        let inQuotes = false

        for (let i = 0; i < line.length; i++) {
          const char = line[i]
          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"'
              i++
            } else {
              inQuotes = !inQuotes
            }
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim())
            current = ''
          } else {
            current += char
          }
        }
        result.push(current.trim())
        return result
      }

      const parsedHeaders = parseLine(lines[0])
      const parsedData = lines.slice(1).map(parseLine)

      setHeaders(parsedHeaders)
      setData(parsedData)
    } catch (e) {
      setError('解析失败: ' + (e as Error).message)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setCsv(text)
        parseCsv(text)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">CSV 预览</h1>
      <p className="tool-desc">上传或粘贴 CSV 数据，表格化预览</p>

      {/* 示例按钮 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {examples.map((ex) => (
          <button key={ex.label} onClick={() => loadExample(ex)} className="btn btn-secondary text-sm">
            {ex.label}
          </button>
        ))}
        <button onClick={() => fileInputRef.current?.click()} className="btn btn-primary text-sm">
          上传文件
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <div className="tool-section">
        <label className="tool-label">CSV 数据</label>
        <textarea
          value={csv}
          onChange={(e) => { setCsv(e.target.value); parseCsv(e.target.value) }}
          className="input-area h-32"
          placeholder="粘贴 CSV 数据..."
        />
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {headers.length > 0 && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-medium text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-b-0">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2 text-slate-600 dark:text-slate-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400">
            共 {data.length} 行数据
          </div>
        </div>
      )}
    </div>
  )
}
