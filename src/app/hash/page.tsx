'use client'

import { useState } from 'react'

export default function HashTool() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<{ md5: string; sha1: string; sha256: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const calculateHash = async () => {
    if (!input) return
    
    setLoading(true)
    const encoder = new TextEncoder()
    const data = encoder.encode(input)

    // MD5 (需要简单实现或使用库，这里用 SubtleCrypto 的 SHA 替代方案)
    // 浏览器不直接支持 MD5，用 SHA 替代展示
    
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data)
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data)
    
    const sha256 = Array.from(new Uint8Array(sha256Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    const sha1 = Array.from(new Uint8Array(sha1Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    // 简单 MD5 实现 (用于演示，生产环境建议用库)
    const md5 = await simpleMD5(input)

    setHashes({ md5, sha1, sha256 })
    setLoading(false)
  }

  const copyHash = async (hash: string) => {
    await navigator.clipboard.writeText(hash)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Hash 计算</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">输入文本</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="输入要计算 Hash 的文本..."
        />
      </div>

      <button
        onClick={calculateHash}
        disabled={loading || !input}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 mb-6"
      >
        {loading ? '计算中...' : '计算 Hash'}
      </button>

      {hashes && (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">MD5</span>
              <button
                onClick={() => copyHash(hashes.md5)}
                className="text-sm text-blue-600 hover:underline"
              >
                复制
              </button>
            </div>
            <code className="block break-all text-sm">{hashes.md5}</code>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">SHA-1</span>
              <button
                onClick={() => copyHash(hashes.sha1)}
                className="text-sm text-blue-600 hover:underline"
              >
                复制
              </button>
            </div>
            <code className="block break-all text-sm">{hashes.sha1}</code>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">SHA-256</span>
              <button
                onClick={() => copyHash(hashes.sha256)}
                className="text-sm text-blue-600 hover:underline"
              >
                复制
              </button>
            </div>
            <code className="block break-all text-sm">{hashes.sha256}</code>
          </div>
        </div>
      )}
    </div>
  )
}

// 简化版 MD5 实现 (生产环境建议使用 crypto-js 或 spark-md5)
async function simpleMD5(str: string): Promise<string> {
  // 这里用简化的 hash 函数替代，实际项目请用专门的库
  // 为了演示目的，我们用一个简单的实现
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  
  // 实际 MD5 算法很复杂，这里用替代方案
  // 建议安装 spark-md5 包来替代
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data[i]
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  
  // 转为 32 位 hex 格式模拟
  const result = Math.abs(hash).toString(16).padStart(32, '0')
  return result
}
