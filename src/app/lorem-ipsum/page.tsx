'use client'

import { useState } from 'react'

export default function LoremIpsum() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [output, setOutput] = useState('')
  const [startWithLorem, setStartWithLorem] = useState(true)

  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
    'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
    'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
    'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
    'explicabo', 'nemo', 'ipsam', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit',
  ]

  const generateWord = () => words[Math.floor(Math.random() * words.length)]

  const generateSentence = () => {
    const len = Math.floor(Math.random() * 10) + 6
    const sentenceWords = Array.from({ length: len }, generateWord)
    sentenceWords[0] = sentenceWords[0].charAt(0).toUpperCase() + sentenceWords[0].slice(1)
    return sentenceWords.join(' ') + '.'
  }

  const generateParagraph = () => {
    const len = Math.floor(Math.random() * 4) + 4
    return Array.from({ length: len }, generateSentence).join(' ')
  }

  const generate = () => {
    let result = ''
    switch (type) {
      case 'paragraphs':
        const paragraphs = Array.from({ length: count }, generateParagraph)
        if (startWithLorem) {
          paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paragraphs[0]
        }
        result = paragraphs.join('\n\n')
        break
      case 'sentences':
        const sentences = Array.from({ length: count }, generateSentence)
        if (startWithLorem) {
          sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
        result = sentences.join(' ')
        break
      case 'words':
        const wordList = Array.from({ length: count }, generateWord)
        if (startWithLorem && wordList.length >= 2) {
          wordList[0] = 'lorem'
          wordList[1] = 'ipsum'
        }
        result = wordList.join(' ')
        break
    }
    setOutput(result)
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Lorem Ipsum 生成器</h1>

      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">生成类型</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          >
            <option value="paragraphs">段落</option>
            <option value="sentences">句子</option>
            <option value="words">单词</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">数量</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-24 p-2 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          />
        </div>

        <label className="flex items-center gap-2 pb-2">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
          />
          <span className="text-sm">以 "Lorem ipsum..." 开头</span>
        </label>

        <button
          onClick={generate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          生成
        </button>

        <button
          onClick={copyOutput}
          disabled={!output}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          复制结果
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">生成结果</label>
        <textarea
          value={output}
          readOnly
          className="w-full h-64 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          placeholder="点击生成..."
        />
      </div>
    </div>
  )
}
