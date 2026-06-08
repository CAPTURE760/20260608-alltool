'use client'

import { useState } from 'react'

export default function ColorPicker() {
  const [hex, setHex] = useState('#3B82F6')
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })

  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h)
    if (!result) return null
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100; l /= 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0

    if (h < 60) { r = c; g = x; b = 0 }
    else if (h < 120) { r = x; g = c; b = 0 }
    else if (h < 180) { r = 0; g = c; b = x }
    else if (h < 240) { r = 0; g = x; b = c }
    else if (h < 300) { r = x; g = 0; b = c }
    else { r = c; g = 0; b = x }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    }
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
  }

  const updateFromHex = (value: string) => {
    setHex(value)
    const rgbVal = hexToRgb(value)
    if (rgbVal) {
      setRgb(rgbVal)
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b))
    }
  }

  const updateFromRgb = (key: 'r' | 'g' | 'b', val: number) => {
    const newRgb = { ...rgb, [key]: val }
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
  }

  const updateFromHsl = (key: 'h' | 's' | 'l', val: number) => {
    const newHsl = { ...hsl, [key]: val }
    setHsl(newHsl)
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  const presets = [
    '#EF4444', '#F97316', '#EAB308', '#22C55E', '#14B8A6',
    '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280', '#000000',
  ]

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">颜色选择器</h1>

      {/* 预览 */}
      <div className="mb-6 flex gap-4 items-start">
        <div
          className="w-40 h-40 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: hex }}
        />
        <div className="flex-1">
          <input
            type="color"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full h-16 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* 预设色板 */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">快捷色板</label>
        <div className="flex gap-2 flex-wrap">
          {presets.map(color => (
            <button
              key={color}
              onClick={() => updateFromHex(color)}
              className="w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* HEX */}
      <div className="mb-4 p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">HEX</span>
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="ml-3 p-1 border rounded font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 w-32"
            />
          </div>
          <button onClick={() => copyText(hex)} className="text-sm text-blue-600 hover:underline">复制</button>
        </div>
      </div>

      {/* RGB */}
      <div className="mb-4 p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">RGB</span>
            <label className="flex items-center gap-1">
              R <input type="number" min={0} max={255} value={rgb.r} onChange={(e) => updateFromRgb('r', parseInt(e.target.value) || 0)} className="w-16 p-1 border rounded font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600" />
            </label>
            <label className="flex items-center gap-1">
              G <input type="number" min={0} max={255} value={rgb.g} onChange={(e) => updateFromRgb('g', parseInt(e.target.value) || 0)} className="w-16 p-1 border rounded font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600" />
            </label>
            <label className="flex items-center gap-1">
              B <input type="number" min={0} max={255} value={rgb.b} onChange={(e) => updateFromRgb('b', parseInt(e.target.value) || 0)} className="w-16 p-1 border rounded font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600" />
            </label>
          </div>
          <button onClick={() => copyText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="text-sm text-blue-600 hover:underline">复制</button>
        </div>
      </div>

      {/* HSL */}
      <div className="mb-4 p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">HSL</span>
            <label className="flex items-center gap-1">
              H <input type="number" min={0} max={360} value={hsl.h} onChange={(e) => updateFromHsl('h', parseInt(e.target.value) || 0)} className="w-16 p-1 border rounded font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600" />
            </label>
            <label className="flex items-center gap-1">
              S <input type="number" min={0} max={100} value={hsl.s} onChange={(e) => updateFromHsl('s', parseInt(e.target.value) || 0)} className="w-16 p-1 border rounded font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600" />
            </label>
            <label className="flex items-center gap-1">
              L <input type="number" min={0} max={100} value={hsl.l} onChange={(e) => updateFromHsl('l', parseInt(e.target.value) || 0)} className="w-16 p-1 border rounded font-mono bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600" />
            </label>
          </div>
          <button onClick={() => copyText(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} className="text-sm text-blue-600 hover:underline">复制</button>
        </div>
      </div>
    </div>
  )
}
