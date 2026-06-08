'use client'

import { useState, useRef } from 'react'

export default function ImageConvert() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [convertedUrl, setConvertedUrl] = useState('')
  const [targetFormat, setTargetFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setOriginalUrl(URL.createObjectURL(file))
    
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
          setConvertedUrl(URL.createObjectURL(blob))
        }
      },
      targetFormat,
      0.92
    )
  }

  const download = () => {
    if (!convertedUrl) return
    const ext = targetFormat.split('/')[1]
    const a = document.createElement('a')
    a.href = convertedUrl
    a.download = `converted.${ext}`
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">图片格式转换</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">目标格式</label>
        <div className="flex gap-2">
          <button
            onClick={() => setTargetFormat('image/png')}
            className={`px-4 py-2 rounded-lg ${targetFormat === 'image/png' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            PNG
          </button>
          <button
            onClick={() => setTargetFormat('image/jpeg')}
            className={`px-4 py-2 rounded-lg ${targetFormat === 'image/jpeg' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            JPG
          </button>
          <button
            onClick={() => setTargetFormat('image/webp')}
            className={`px-4 py-2 rounded-lg ${targetFormat === 'image/webp' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            WebP
          </button>
        </div>
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

      {convertedUrl && (
        <>
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">原始图片</div>
              <img src={originalUrl} alt="Original" className="max-w-full rounded-lg" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">
                转换后 ({targetFormat.split('/')[1].toUpperCase()})
              </div>
              <img src={convertedUrl} alt="Converted" className="max-w-full rounded-lg" />
            </div>
          </div>
          
          <button
            onClick={download}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            下载转换图片
          </button>
        </>
      )}
    </div>
  )
}
