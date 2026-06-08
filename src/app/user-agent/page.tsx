'use client'

import { useState } from 'react'

const examples = [
  { label: 'Chrome', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  { label: 'Safari', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15' },
  { label: 'Mobile', ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
]

export default function UserAgentParser() {
  const [ua, setUa] = useState('')
  const [result, setResult] = useState<{
    browser: string
    browserVersion: string
    os: string
    osVersion: string
    device: string
    engine: string
  } | null>(null)

  const loadExample = (ex: typeof examples[0]) => {
    setUa(ex.ua)
    parseUa(ex.ua)
  }

  const parseUa = (userAgent: string) => {
    if (!userAgent) {
      setResult(null)
      return
    }

    const uaLower = userAgent.toLowerCase()

    // Browser
    let browser = 'Unknown'
    let browserVersion = ''
    if (uaLower.includes('edg/')) {
      browser = 'Edge'
      browserVersion = userAgent.match(/edg\/([\d.]+)/i)?.[1] || ''
    } else if (uaLower.includes('chrome/')) {
      browser = 'Chrome'
      browserVersion = userAgent.match(/chrome\/([\d.]+)/i)?.[1] || ''
    } else if (uaLower.includes('safari/') && !uaLower.includes('chrome')) {
      browser = 'Safari'
      browserVersion = userAgent.match(/version\/([\d.]+)/i)?.[1] || ''
    } else if (uaLower.includes('firefox/')) {
      browser = 'Firefox'
      browserVersion = userAgent.match(/firefox\/([\d.]+)/i)?.[1] || ''
    }

    // OS
    let os = 'Unknown'
    let osVersion = ''
    if (uaLower.includes('windows nt 10')) {
      os = 'Windows 10/11'
      osVersion = ''
    } else if (uaLower.includes('windows nt 6.3')) {
      os = 'Windows 8.1'
    } else if (uaLower.includes('mac os x')) {
      os = 'macOS'
      osVersion = userAgent.match(/mac os x ([\d_]+)/i)?.[1]?.replace(/_/g, '.') || ''
    } else if (uaLower.includes('android')) {
      os = 'Android'
      osVersion = userAgent.match(/android ([\d.]+)/i)?.[1] || ''
    } else if (uaLower.includes('iphone') || uaLower.includes('ipad')) {
      os = 'iOS'
      osVersion = userAgent.match(/os ([\d_]+)/i)?.[1]?.replace(/_/g, '.') || ''
    } else if (uaLower.includes('linux')) {
      os = 'Linux'
    }

    // Device
    let device = 'Desktop'
    if (uaLower.includes('mobile') || uaLower.includes('iphone')) {
      device = 'Mobile'
    } else if (uaLower.includes('tablet') || uaLower.includes('ipad')) {
      device = 'Tablet'
    }

    // Engine
    let engine = 'Unknown'
    if (uaLower.includes('webkit')) {
      engine = 'WebKit'
    } else if (uaLower.includes('gecko')) {
      engine = 'Gecko'
    } else if (uaLower.includes('trident')) {
      engine = 'Trident'
    }

    setResult({
      browser,
      browserVersion,
      os,
      osVersion,
      device,
      engine
    })
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">User-Agent 解析</h1>
      <p className="tool-desc">解析 User-Agent 字符串，识别浏览器、操作系统、设备类型</p>

      {/* 示例按钮 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {examples.map((ex) => (
          <button key={ex.label} onClick={() => loadExample(ex)} className="btn btn-secondary text-sm">
            {ex.label}
          </button>
        ))}
      </div>

      <div className="tool-section">
        <label className="tool-label">User-Agent 字符串</label>
        <textarea
          value={ua}
          onChange={(e) => { setUa(e.target.value); parseUa(e.target.value) }}
          className="input-area h-24"
          placeholder="粘贴 User-Agent..."
        />
      </div>

      {result && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">浏览器</div>
            <div className="text-lg font-medium">{result.browser} {result.browserVersion}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">操作系统</div>
            <div className="text-lg font-medium">{result.os} {result.osVersion}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">设备类型</div>
            <div className="text-lg font-medium">{result.device}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">渲染引擎</div>
            <div className="text-lg font-medium">{result.engine}</div>
          </div>
        </div>
      )}
    </div>
  )
}
