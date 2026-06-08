'use client'

import { useState } from 'react'

export default function UuidGenerator() {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState<string[]>([])

  const generate = () => {
    const results: string[] = []
    for (let i = 0; i < count; i++) {
      results.push(crypto.randomUUID())
    }
    setUuids(results)
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'))
  }

  const copyOne = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">UUID 生成器</h1>

      <div className="mb-6 flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-2">生成数量</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-24 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          />
        </div>
        <button
          onClick={generate}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          生成 UUID
        </button>
        {uuids.length > 0 && (
          <button
            onClick={copyAll}
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            复制全部
          </button>
        )}
      </div>

      {uuids.length > 0 && (
        <div className="border rounded-lg divide-y bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          {uuids.map((uuid, index) => (
            <div
              key={uuid}
              className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <code className="font-mono text-sm">{uuid}</code>
              <button
                onClick={() => copyOne(uuid)}
                className="text-sm text-blue-600 hover:underline"
              >
                复制
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
