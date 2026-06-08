'use client'

import { useState } from 'react'

export default function HashTool() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Record<string, string>>({})

  const calculate = async (text: string) => {
    if (!text) {
      setResults({})
      return
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    const algorithms = [
      { name: 'MD5', algo: 'MD5' },
      { name: 'SHA-1', algo: 'SHA-1' },
      { name: 'SHA-256', algo: 'SHA-256' },
      { name: 'SHA-512', algo: 'SHA-512' },
    ]

    const newResults: Record<string, string> = {}

    // MD5 via simple implementation
    const md5 = (str: string) => {
      const rotateLeft = (x: number, n: number) => (x << n) | (x >>> (32 - n))
      const addUnsigned = (x: number, y: number) => {
        const x8 = x & 0x80000000, y8 = y & 0x80000000
        const x4 = x & 0x40000000, y4 = y & 0x40000000
        const result = (x & 0x3FFFFFFF) + (y & 0x3FFFFFFF)
        if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8
        if (x4 | y4) {
          if (result & 0x40000000) return result ^ 0xC0000000 ^ x8 ^ y8
          return result ^ 0x40000000 ^ x8 ^ y8
        }
        return result ^ x8 ^ y8
      }
      const F = (x: number, y: number, z: number) => (x & y) | (~x & z)
      const G = (x: number, y: number, z: number) => (x & z) | (y & ~z)
      const H = (x: number, y: number, z: number) => x ^ y ^ z
      const I = (x: number, y: number, z: number) => y ^ (x | ~z)
      const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
      }
      const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
      }
      const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
      }
      const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
      }

      const utf8 = unescape(encodeURIComponent(str))
      let x: number[] = []
      for (let i = 0; i < utf8.length; i++) {
        x[i >> 2] |= utf8.charCodeAt(i) << ((i % 4) * 8)
      }
      const len = utf8.length * 8
      x[len >> 5] |= 0x80 << (len % 32)
      x[(((len + 64) >>> 9) << 4) + 14] = len

      let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476
      for (let i = 0; i < x.length; i += 16) {
        const olda = a, oldb = b, oldc = c, oldd = d
        a = FF(a, b, c, d, x[i], 7, 0xD76AA478); d = FF(d, a, b, c, x[i + 1], 12, 0xE8C7B756)
        c = FF(c, d, a, b, x[i + 2], 17, 0x242070DB); b = FF(b, c, d, a, x[i + 3], 22, 0xC1BDCEEE)
        a = FF(a, b, c, d, x[i + 4], 7, 0xF57C0FAF); d = FF(d, a, b, c, x[i + 5], 12, 0x4787C62A)
        c = FF(c, d, a, b, x[i + 6], 17, 0xA8304613); b = FF(b, c, d, a, x[i + 7], 22, 0xFD469501)
        a = FF(a, b, c, d, x[i + 8], 7, 0x698098D8); d = FF(d, a, b, c, x[i + 9], 12, 0x8B44F7AF)
        c = FF(c, d, a, b, x[i + 10], 17, 0xFFFF5BB1); b = FF(b, c, d, a, x[i + 11], 22, 0x895CD7BE)
        a = FF(a, b, c, d, x[i + 12], 7, 0x6B901122); d = FF(d, a, b, c, x[i + 13], 12, 0xFD987193)
        c = FF(c, d, a, b, x[i + 14], 17, 0xA679438E); b = FF(b, c, d, a, x[i + 15], 22, 0x49B40821)
        a = GG(a, b, c, d, x[i + 1], 5, 0xF61E2562); d = GG(d, a, b, c, x[i + 6], 9, 0xC040B340)
        c = GG(c, d, a, b, x[i + 11], 14, 0x265E5A51); b = GG(b, c, d, a, x[i], 20, 0xE9B6C7AA)
        a = GG(a, b, c, d, x[i + 5], 5, 0xD62F105D); d = GG(d, a, b, c, x[i + 10], 9, 0x2441453)
        c = GG(c, d, a, b, x[i + 15], 14, 0xD8A1E681); b = GG(b, c, d, a, x[i + 4], 20, 0xE7D3FBC8)
        a = GG(a, b, c, d, x[i + 9], 5, 0x21E1CDE6); d = GG(d, a, b, c, x[i + 14], 9, 0xC33707D6)
        c = GG(c, d, a, b, x[i + 3], 14, 0xF4D50D87); b = GG(b, c, d, a, x[i + 8], 20, 0x455A14ED)
        a = GG(a, b, c, d, x[i + 13], 5, 0xA9E3E905); d = GG(d, a, b, c, x[i + 2], 9, 0xFCEFA3F8)
        c = GG(c, d, a, b, x[i + 7], 14, 0x676F02D9); b = GG(b, c, d, a, x[i + 12], 20, 0x8D2A4C8A)
        a = HH(a, b, c, d, x[i + 5], 4, 0xFFFA3942); d = HH(d, a, b, c, x[i + 8], 11, 0x8771F681)
        c = HH(c, d, a, b, x[i + 11], 16, 0x6D9D6122); b = HH(b, c, d, a, x[i + 14], 23, 0xFDE5380C)
        a = HH(a, b, c, d, x[i + 1], 4, 0xA4BEEA44); d = HH(d, a, b, c, x[i + 4], 11, 0x4BDECFA9)
        c = HH(c, d, a, b, x[i + 7], 16, 0xF6BB4B60); b = HH(b, c, d, a, x[i + 10], 23, 0xBEBFBC70)
        a = HH(a, b, c, d, x[i + 13], 4, 0x289B7EC6); d = HH(d, a, b, c, x[i], 11, 0xEAA127FA)
        c = HH(c, d, a, b, x[i + 3], 16, 0xD4EF3085); b = HH(b, c, d, a, x[i + 6], 23, 0x4881D05)
        a = HH(a, b, c, d, x[i + 9], 4, 0xD9D4D039); d = HH(d, a, b, c, x[i + 12], 11, 0xE6DB99E5)
        c = HH(c, d, a, b, x[i + 15], 16, 0x1FA27CF8); b = HH(b, c, d, a, x[i + 2], 23, 0xC4AC5665)
        a = II(a, b, c, d, x[i], 6, 0xF4292244); d = II(d, a, b, c, x[i + 7], 10, 0x432AFF97)
        c = II(c, d, a, b, x[i + 14], 15, 0xAB9423A7); b = II(b, c, d, a, x[i + 5], 21, 0xFC93A039)
        a = II(a, b, c, d, x[i + 12], 6, 0x655B59C3); d = II(d, a, b, c, x[i + 3], 10, 0x8F0CCC92)
        c = II(c, d, a, b, x[i + 10], 15, 0xFFEFF47D); b = II(b, c, d, a, x[i + 1], 21, 0x85845DD1)
        a = II(a, b, c, d, x[i + 8], 6, 0x6FA87E4F); d = II(d, a, b, c, x[i + 15], 10, 0xFE2CE6E0)
        c = II(c, d, a, b, x[i + 6], 15, 0xA3014314); b = II(b, c, d, a, x[i + 13], 21, 0x4E0811A1)
        a = II(a, b, c, d, x[i + 4], 6, 0xF7537E82); d = II(d, a, b, c, x[i + 11], 10, 0xBD3AF235)
        c = II(c, d, a, b, x[i + 2], 15, 0x2AD7D2BB); b = II(b, c, d, a, x[i + 9], 21, 0xEB86D391)
        a = addUnsigned(a, olda); b = addUnsigned(b, oldb); c = addUnsigned(c, oldc); d = addUnsigned(d, oldd)
      }
      return [a, b, c, d].map(n => n.toString(16).padStart(8, '0')).join('')
    }

    newResults['MD5'] = md5(text)

    for (const { name, algo } of algorithms.slice(1)) {
      const hashBuffer = await crypto.subtle.digest(algo, data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      newResults[name] = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    }

    setResults(newResults)
  }

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">Hash 计算</h1>
      <p className="tool-desc">计算文本的 MD5、SHA-1、SHA-256、SHA-512 哈希值</p>

      <div className="tool-section">
        <label className="tool-label">输入文本</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); calculate(e.target.value) }}
          className="input-area h-32"
          placeholder="输入要计算哈希的文本..."
        />
      </div>

      <div className="space-y-3">
        {Object.entries(results).map(([name, value]) => (
          <div key={name} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="tag tag-purple">{name}</span>
              <button onClick={() => copyText(value)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">复制</button>
            </div>
            <input
              type="text"
              value={value}
              readOnly
              className="w-full p-2 rounded-lg font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
