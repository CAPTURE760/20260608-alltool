import Link from 'next/link'

const tools = [
  {
    category: '文本处理',
    items: [
      { name: 'JSON 格式化', href: '/json', desc: 'JSON 压缩、美化、校验' },
      { name: 'JSON 转 CSV', href: '/json-to-csv', desc: 'JSON 数据导出为 CSV' },
      { name: 'Base64 编解码', href: '/base64', desc: '文本/图片 Base64 互转' },
      { name: 'URL 批量编解码', href: '/url', desc: '批量 encodeURI / decodeURI' },
      { name: '字数统计', href: '/text-count', desc: '字符数、单词数、行数统计' },
      { name: 'Markdown 预览', href: '/markdown', desc: '实时 Markdown 渲染预览' },
    ]
  },
  {
    category: '编码转换',
    items: [
      { name: 'Hash 计算', href: '/hash', desc: 'MD5、SHA1、SHA256' },
      { name: '时间戳转换', href: '/timestamp', desc: '时间戳 ↔ 日期' },
      { name: 'UUID 生成', href: '/uuid', desc: 'UUID v4 批量生成' },
    ]
  },
  {
    category: '开发辅助',
    items: [
      { name: '正则测试', href: '/regexp', desc: '正则表达式在线测试' },
      { name: '代码格式化', href: '/code-format', desc: 'JS/CSS/SQL 美化压缩' },
      { name: '二维码生成', href: '/qrcode', desc: '文本生成二维码' },
      { name: '颜色选择器', href: '/color-picker', desc: 'HEX/RGB/HSL 互转取色' },
      { name: 'Lorem Ipsum', href: '/lorem-ipsum', desc: '占位文本生成器' },
    ]
  },
  {
    category: '图片处理',
    items: [
      { name: '图片压缩', href: '/image-compress', desc: 'PNG/JPG 压缩' },
      { name: '图片格式转换', href: '/image-convert', desc: 'PNG ↔ JPG ↔ WebP' },
    ]
  }
]

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🛠️ DevKit</h1>
        <p className="text-gray-500 dark:text-gray-400">
          轻量、快速、无广告的在线开发者工具集
        </p>
      </header>

      <div className="grid gap-8">
        {tools.map((category) => (
          <section key={category.category}>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block p-4 border rounded-lg hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-medium mb-1">{tool.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-gray-400">
        <p>所有处理均在浏览器本地完成，不上传任何数据</p>
      </footer>
    </main>
  )
}
