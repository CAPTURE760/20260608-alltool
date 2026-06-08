'use client'

import { useState } from 'react'

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(`# Markdown 预览

## 功能特性

- **实时预览**：左侧输入，右侧即时渲染
- 支持常见 Markdown 语法
- 深色模式支持

## 代码块

\`\`\`javascript
function hello() {
  console.log("Hello, DevKit!");
}
\`\`\`

## 表格

| 工具 | 说明 |
|------|------|
| JSON 格式化 | 美化/压缩 JSON |
| Base64 | 编解码转换 |

> 这是一段引用文字

---

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3
`)

  const renderMarkdown = (md: string) => {
    let html = md
      // 代码块
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto my-2"><code>$2</code></pre>')
      // 行内代码
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-red-600 dark:text-red-400">$1</code>')
      // 标题
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
      // 粗体斜体
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // 引用
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-400 pl-4 py-1 my-2 text-gray-600 dark:text-gray-400">$1</blockquote>')
      // 分割线
      .replace(/^---$/gm, '<hr class="my-4 border-gray-300 dark:border-gray-600"/>')
      // 无序列表
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      // 有序列表
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
      // 表格
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim())
        if (cells.every(c => /^[\s-:]+$/.test(c))) return ''
        const tds = cells.map(c => `<td class="border border-gray-300 dark:border-gray-600 px-3 py-1">${c.trim()}</td>`).join('')
        return `<tr>${tds}</tr>`
      })
      // 段落（换行）
      .replace(/\n\n/g, '</p><p class="my-2">')
      .replace(/\n/g, '<br/>')

    // 包裹表格
    if (html.includes('<tr>')) {
      html = html.replace(/((<tr>.*?<\/tr>\s*)+)/g, '<table class="border-collapse my-2">$1</table>')
    }

    return html
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Markdown 预览</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Markdown 输入</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[600px] p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 resize-none"
            placeholder="输入 Markdown 内容..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">实时预览</label>
          <div
            className="w-full h-[600px] p-3 border rounded-lg overflow-auto bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
          />
        </div>
      </div>
    </div>
  )
}
