import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeToggle from './components/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevKit - 开发者工具集',
  description: '轻量、快速、无广告的在线开发者工具集',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('devkit-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex">
          {/* Sidebar placeholder - 客户端渲染 */}
          <div className="hidden lg:block w-64 h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
            {/* Sidebar 由客户端组件渲染 */}
          </div>
          <div className="flex-1 min-h-screen">
            {/* 顶部导航 */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 h-14 flex items-center justify-between px-6">
              <a href="/" className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                <span>🛠️</span>
                <span>DevKit</span>
              </a>
              <ThemeToggle />
            </nav>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
