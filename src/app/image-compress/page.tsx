'use client'

import { useState, useRef } from 'react'

export default function ImageCompress() {
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [originalUrl, setOriginalUrl] = useState('')
  const [compressedUrl, setCompressedUrl] = useState('')
  const [quality, setQuality] = useState(0.8)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setOriginalSize(file.size)
    setOriginalUrl(URL.createObjectURL(file))
    setLoading(true)

    // 使用 Canvas 压缩图片
    const img = new window.Image()
    img.src = URL.createObjectURL(file)
    await new Promise(resolve => { img.onload = resolve })
    
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0)
    
    canvas.toBlob(
      (blob) => {
        if (blob) {
          setCompressedSize(blob.size)
          setCompressedUrl(URL.createObjectURL(blob))
        }
        setLoading(false)
      },
      'image/jpeg',
      quality
    )
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = compressedUrl
    a.download = 'compressed.jpg'
    a.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">图片压缩</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">压缩质量</label>
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.1}
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
          className="w-64"
        />
        <span className="ml-4">{Math.round(quality * 100)}%</span>
      </div>

      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          选择图片
        </button>
      </div>

      {loading && <div className="text-gray-500">压缩中...</div>}

      {compressedUrl && (
        <>
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">
                原图: {formatSize(originalSize)}
              </div>
              <img src={originalUrl} alt="Original" className="max-w-full rounded-lg" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">
                压缩后: {formatSize(compressedSize)} 
                <span className="ml-2 text-green-600">
                  (节省 {Math.round((1 - compressedSize / originalSize) * 100)}%)
                </span>
              </div>
              <img src={compressedUrl} alt="Compressed" className="max-w-full rounded-lg" />
            </div>
          </div>
          
          <button
            onClick={download}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            下载压缩图片
          </button>
        </>
      )}
    </div>
  )
}
