'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const categories = [
  {
    name: '文本处理',
    icon: '📝',
    items: [
      { name: 'JSON 格式化', href: '/json', keywords: ['json', 'format', '美化', '压缩'] },
      { name: 'JSON 转 CSV', href: '/json-to-csv', keywords: ['csv', '导出'] },
      { name: 'Base64 编解码', href: '/base64', keywords: ['base64', '编码', '解码'] },
      { name: 'URL 编解码', href: '/url', keywords: ['url', 'encode', 'decode'] },
      { name: '字数统计', href: '/text-count', keywords: ['字数', '统计', '字符'] },
      { name: 'Markdown 预览', href: '/markdown', keywords: ['markdown', 'md', '预览'] },
      { name: '大小写转换', href: '/case-converter', keywords: ['大小写', '驼峰', '下划线'] },
      { name: '文本排序去重', href: '/text-sort', keywords: ['排序', '去重', '反转'] },
      { name: '文本差异对比', href: '/text-diff', keywords: ['diff', '对比', '差异'] },
      { name: '密码生成器', href: '/password', keywords: ['密码', '生成', '随机'] },
      { name: '文本加密解密', href: '/crypto', keywords: ['aes', '加密', '解密'] },
    ]
  },
  {
    name: '编码转换',
    icon: '🔢',
    items: [
      { name: 'Hash 计算', href: '/hash', keywords: ['md5', 'sha', '哈希'] },
      { name: '时间戳转换', href: '/timestamp', keywords: ['时间戳', 'timestamp', '日期'] },
      { name: 'UUID 生成', href: '/uuid', keywords: ['uuid', 'guid', '唯一id'] },
      { name: '进制转换', href: '/radix', keywords: ['进制', '二进制', '十六进制'] },
      { name: 'Unicode 转换', href: '/unicode', keywords: ['unicode', '字符编码'] },
      { name: 'JWT 解析', href: '/jwt', keywords: ['jwt', 'token', '解析'] },
      { name: 'HTML 实体编解码', href: '/html-entity', keywords: ['html', '实体', 'entity'] },
      { name: '摩斯电码', href: '/morse', keywords: ['摩斯', 'morse', '电码'] },
    ]
  },
  {
    name: '开发辅助',
    icon: '🛠️',
    items: [
      { name: '正则测试', href: '/regexp', keywords: ['正则', 'regexp', 'regex'] },
      { name: '代码格式化', href: '/code-format', keywords: ['格式化', 'prettier', '代码'] },
      { name: '代码对比', href: '/diff', keywords: ['diff', '代码对比'] },
      { name: '二维码生成', href: '/qrcode', keywords: ['二维码', 'qrcode'] },
      { name: '颜色选择器', href: '/color-picker', keywords: ['颜色', 'color', '取色'] },
      { name: 'Lorem Ipsum', href: '/lorem-ipsum', keywords: ['lorem', '占位', '假文'] },
      { name: 'Cron 表达式', href: '/cron', keywords: ['cron', '定时', '表达式'] },
      { name: 'HTTP 状态码', href: '/http-status', keywords: ['http', '状态码', 'status'] },
      { name: 'User-Agent 解析', href: '/user-agent', keywords: ['user-agent', 'ua', '浏览器'] },
    ]
  },
  {
    name: '格式转换',
    icon: '📄',
    items: [
      { name: 'YAML ↔ JSON', href: '/yaml-json', keywords: ['yaml', 'json', '转换'] },
      { name: 'XML ↔ JSON', href: '/xml-json', keywords: ['xml', 'json', '转换'] },
      { name: 'CSV 预览', href: '/csv-viewer', keywords: ['csv', '表格', '预览'] },
    ]
  },
  {
    name: '图片处理',
    icon: '🖼️',
    items: [
      { name: '图片压缩', href: '/image-compress', keywords: ['图片', '压缩', 'compress'] },
      { name: '图片格式转换', href: '/image-convert', keywords: ['图片', '格式', 'png', 'jpg'] },
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  const [expandedCats, setExpandedCats] = useState<string[]>(categories.map(c => c.name))

  const toggleCat = (name: string) => {
    setExpandedCats(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    )
  }

  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.keywords.some(k => k.includes(search.toLowerCase()))
    )
  })).filter(cat => cat.items.length > 0)

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} flex flex-col h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300`}>
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-100">
            <span>🛠️</span>
            <span>DevKit</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索工具..."
            className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm border-0 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
      )}

      {/* Categories */}
      <nav className="flex-1 overflow-y-auto p-2">
        {filteredCategories.map((cat) => (
          <div key={cat.name} className="mb-2">
            <button
              onClick={() => toggleCat(cat.name)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <span>{cat.icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{cat.name}</span>
                  <span className="text-xs text-slate-400">{expandedCats.includes(cat.name) ? '▼' : '▶'}</span>
                </>
              )}
            </button>
            {!collapsed && expandedCats.includes(cat.name) && (
              <div className="ml-6 mt-1 space-y-1">
                {cat.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
