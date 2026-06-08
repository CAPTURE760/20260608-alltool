'use client'

import { useState } from 'react'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(200)
  const [qrUrl, setQrUrl] = useState('')

  const generate = () => {
    if (!text) return
    
    // 使用 Google Chart API 生成二维码 (生产环境可替换为自己部署的库)
    const encoded = encodeURIComponent(text)
    const url = `https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${encoded}&choe=UTF-8`
    setQrUrl(url)
  }

  const download = () => {
    if (!qrUrl) return
    const a = document.createElement('a')
    a.href = qrUrl
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">二维码生成器</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">输入内容</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="输入文本或链接..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">尺寸</label>
        <input
          type="number"
          min={100}
          max={500}
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value) || 200)}
          className="w-32 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
        />
        <span className="ml-2 text-gray-500">px</span>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={generate}
          disabled={!text}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          生成二维码
        </button>
        {qrUrl && (
          <button
            onClick={download}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            下载
          </button>
        )}
      </div>

      {qrUrl && (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 inline-block">
          <img src={qrUrl} alt="QR Code" className="mx-auto" />
        </div>
      )}
    </div>
  )
}
