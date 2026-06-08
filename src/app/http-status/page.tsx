'use client'

import { useState } from 'react'

const statusCodes = [
  // 2xx
  { code: 200, name: 'OK', desc: '请求成功' },
  { code: 201, name: 'Created', desc: '已创建' },
  { code: 204, name: 'No Content', desc: '无内容' },
  // 3xx
  { code: 301, name: 'Moved Permanently', desc: '永久重定向' },
  { code: 302, name: 'Found', desc: '临时重定向' },
  { code: 304, name: 'Not Modified', desc: '未修改' },
  // 4xx
  { code: 400, name: 'Bad Request', desc: '请求错误' },
  { code: 401, name: 'Unauthorized', desc: '未授权' },
  { code: 403, name: 'Forbidden', desc: '禁止访问' },
  { code: 404, name: 'Not Found', desc: '未找到' },
  { code: 405, name: 'Method Not Allowed', desc: '方法不允许' },
  { code: 408, name: 'Request Timeout', desc: '请求超时' },
  { code: 409, name: 'Conflict', desc: '冲突' },
  { code: 410, name: 'Gone', desc: '已删除' },
  { code: 429, name: 'Too Many Requests', desc: '请求过多' },
  // 5xx
  { code: 500, name: 'Internal Server Error', desc: '服务器内部错误' },
  { code: 501, name: 'Not Implemented', desc: '未实现' },
  { code: 502, name: 'Bad Gateway', desc: '网关错误' },
  { code: 503, name: 'Service Unavailable', desc: '服务不可用' },
  { code: 504, name: 'Gateway Timeout', desc: '网关超时' },
]

export default function HttpStatus() {
  const [search, setSearch] = useState('')

  const filtered = statusCodes.filter(item =>
    item.code.toString().includes(search) ||
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.includes(search)
  )

  const getCategory = (code: number) => {
    if (code < 200) return { label: '信息', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' }
    if (code < 300) return { label: '成功', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' }
    if (code < 400) return { label: '重定向', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' }
    if (code < 500) return { label: '客户端错误', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' }
    return { label: '服务器错误', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">HTTP 状态码查询</h1>
      <p className="tool-desc">快速查询 HTTP 状态码含义</p>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索状态码或名称..."
          className="input-area h-10"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((item) => {
          const cat = getCategory(item.code)
          return (
            <div key={item.code} className="card p-4 flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold ${cat.color}`}>
                {item.code}
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-800 dark:text-slate-100">{item.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</div>
              </div>
              <span className={`tag ${cat.color}`}>{cat.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
