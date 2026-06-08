'use client'

import Link from 'next/link'

const categories = [
  {
    name: '文本处理',
    icon: '📝',
    color: 'from-blue-500 to-cyan-500',
    items: [
      { name: 'JSON 格式化', href: '/json', desc: '压缩、美化、校验' },
      { name: 'JSON 转 CSV', href: '/json-to-csv', desc: '导出为 CSV' },
      { name: 'Base64 编解码', href: '/base64', desc: '文本/图片互转' },
      { name: 'URL 批量编解码', href: '/url', desc: '批量处理' },
      { name: '字数统计', href: '/text-count', desc: '字符、单词、行数' },
      { name: 'Markdown 预览', href: '/markdown', desc: '实时渲染' },
      { name: '大小写转换', href: '/case-converter', desc: '驼峰/下划线/短横线' },
      { name: '文本排序去重', href: '/text-sort', desc: '排序、去重、反转' },
    ]
  },
  {
    name: '编码转换',
    icon: '🔢',
    color: 'from-purple-500 to-pink-500',
    items: [
      { name: 'Hash 计算', href: '/hash', desc: 'MD5/SHA1/SHA256' },
      { name: '时间戳转换', href: '/timestamp', desc: '时间戳 ↔ 日期' },
      { name: 'UUID 生成', href: '/uuid', desc: '批量生成' },
      { name: '进制转换', href: '/radix', desc: '二/八/十/十六' },
      { name: 'Unicode 转换', href: '/unicode', desc: 'Unicode ↔ 字符' },
    ]
  },
  {
    name: '开发辅助',
    icon: '🛠️',
    color: 'from-orange-500 to-amber-500',
    items: [
      { name: '正则测试', href: '/regexp', desc: '在线测试' },
      { name: '代码格式化', href: '/code-format', desc: 'JS/CSS/SQL' },
      { name: '代码对比', href: '/diff', desc: 'Diff 高亮' },
      { name: '二维码生成', href: '/qrcode', desc: '文本转二维码' },
      { name: '颜色选择器', href: '/color-picker', desc: 'HEX/RGB/HSL' },
      { name: 'Lorem Ipsum', href: '/lorem-ipsum', desc: '占位文本' },
    ]
  },
  {
    name: '图片处理',
    icon: '🖼️',
    color: 'from-emerald-500 to-teal-500',
    items: [
      { name: '图片压缩', href: '/image-compress', desc: 'PNG/JPG 压缩' },
      { name: '图片格式转换', href: '/image-convert', desc: 'PNG ↔ JPG ↔ WebP' },
    ]
  }
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🛠️ DevKit
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            轻量、快速、无广告的在线开发者工具集
          </p>
          <p className="text-sm text-slate-400 mt-2">
            所有处理均在浏览器本地完成，不上传任何数据
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {categories.map((cat) => (
          <section key={cat.name}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{cat.icon}</span>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {cat.name}
              </h2>
              <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${cat.color} opacity-30`} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {cat.items.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <h3 className="font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>DevKit · 开源免费 · 无广告 · 隐私安全</p>
      </footer>
    </main>
  )
}
