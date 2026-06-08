'use client'

import { useState, useEffect } from 'react'

const allTools = [
  // 文本处理
  { name: 'JSON 格式化', href: '/json', icon: '📊', desc: '压缩、美化、校验', category: '文本处理' },
  { name: 'JSON 转 CSV', href: '/json-to-csv', icon: '📋', desc: '导出为 CSV', category: '文本处理' },
  { name: 'Base64 编解码', href: '/base64', icon: '🔐', desc: '文本/图片互转', category: '文本处理' },
  { name: 'URL 编解码', href: '/url', icon: '🔗', desc: '批量处理', category: '文本处理' },
  { name: '字数统计', href: '/text-count', icon: '📏', desc: '字符、单词、行数', category: '文本处理' },
  { name: 'Markdown 预览', href: '/markdown', icon: '📝', desc: '实时渲染', category: '文本处理' },
  { name: '大小写转换', href: '/case-converter', icon: '🔤', desc: '驼峰/下划线/短横线', category: '文本处理' },
  { name: '文本排序去重', href: '/text-sort', icon: '📑', desc: '排序、去重、反转', category: '文本处理' },
  { name: '文本差异对比', href: '/text-diff', icon: '⚡', desc: '两段文本对比', category: '文本处理' },
  { name: '密码生成器', href: '/password', icon: '🔑', desc: '随机密码生成', category: '文本处理' },
  { name: '文本加密解密', href: '/crypto', icon: '🔒', desc: 'AES 加解密', category: '文本处理' },
  // 编码转换
  { name: 'Hash 计算', href: '/hash', icon: '#️⃣', desc: 'MD5/SHA1/SHA256', category: '编码转换' },
  { name: '时间戳转换', href: '/timestamp', icon: '⏰', desc: '时间戳 ↔ 日期', category: '编码转换' },
  { name: 'UUID 生成', href: '/uuid', icon: '🎲', desc: '批量生成', category: '编码转换' },
  { name: '进制转换', href: '/radix', icon: '🔢', desc: '二/八/十/十六', category: '编码转换' },
  { name: 'Unicode 转换', href: '/unicode', icon: '🌐', desc: 'Unicode ↔ 字符', category: '编码转换' },
  { name: 'JWT 解析', href: '/jwt', icon: '🎫', desc: '解码 JWT Token', category: '编码转换' },
  { name: 'HTML 实体编解码', href: '/html-entity', icon: '🏗️', desc: '&lt; ↔ <', category: '编码转换' },
  { name: '摩斯电码', href: '/morse', icon: '📡', desc: '文本 ↔ 摩斯', category: '编码转换' },
  // 开发辅助
  { name: '正则测试', href: '/regexp', icon: '🔎', desc: '在线测试', category: '开发辅助' },
  { name: '代码格式化', href: '/code-format', icon: '💻', desc: 'JS/CSS/SQL', category: '开发辅助' },
  { name: '代码对比', href: '/diff', icon: '⚡', desc: 'Diff 高亮', category: '开发辅助' },
  { name: '二维码生成', href: '/qrcode', icon: '📱', desc: '文本转二维码', category: '开发辅助' },
  { name: '颜色选择器', href: '/color-picker', icon: '🎨', desc: 'HEX/RGB/HSL', category: '开发辅助' },
  { name: 'Lorem Ipsum', href: '/lorem-ipsum', icon: '📜', desc: '占位文本', category: '开发辅助' },
  { name: 'Cron 表达式', href: '/cron', icon: '⏱️', desc: '可视化生成', category: '开发辅助' },
  { name: 'HTTP 状态码', href: '/http-status', icon: '📡', desc: '状态码查询', category: '开发辅助' },
  { name: 'User-Agent 解析', href: '/user-agent', icon: '🖥️', desc: '解析 UA', category: '开发辅助' },
  // 格式转换
  { name: 'YAML ↔ JSON', href: '/yaml-json', icon: '📄', desc: '互转', category: '格式转换' },
  { name: 'XML ↔ JSON', href: '/xml-json', icon: '📄', desc: '互转', category: '格式转换' },
  { name: 'CSV 预览', href: '/csv-viewer', icon: '📊', desc: '表格预览', category: '格式转换' },
  // 图片处理
  { name: '图片压缩', href: '/image-compress', icon: '🖼️', desc: 'PNG/JPG 压缩', category: '图片处理' },
  { name: '图片格式转换', href: '/image-convert', icon: '🔄', desc: 'PNG ↔ JPG ↔ WebP', category: '图片处理' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(allTools)

  useEffect(() => {
    if (!search) {
      setFiltered(allTools)
    } else {
      setFiltered(allTools.filter(tool =>
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.desc.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase())
      ))
    }
  }, [search])

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🛠️ DevKit</h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto mb-6">
            轻量、快速、无广告的在线开发者工具集
          </p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索工具..."
            className="w-full max-w-md px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          {search && (
            <p className="mt-3 text-sm text-slate-400">
              找到 {filtered.length} 个工具
            </p>
          )}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-2xl mb-2">{tool.icon}</div>
              <h3 className="font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {tool.desc}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                {tool.category}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>DevKit · 开源免费 · 无广告 · 隐私安全</p>
        <p className="mt-1">所有处理均在浏览器本地完成，不上传任何数据</p>
      </footer>
    </main>
  )
}
