'use client'

import { useState } from 'react'

const examples = [
  { label: '每天执行', cron: '0 0 * * *' },
  { label: '每小时', cron: '0 * * * *' },
  { label: '每周一早9点', cron: '0 9 * * 1' },
  { label: '每月1号', cron: '0 0 1 * *' },
]

const fieldNames = ['分钟', '小时', '日', '月', '星期']

export default function CronBuilder() {
  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [day, setDay] = useState('*')
  const [month, setMonth] = useState('*')
  const [weekday, setWeekday] = useState('*')
  const [cron, setCron] = useState('* * * * *')
  const [description, setDescription] = useState('')

  const loadExample = (ex: typeof examples[0]) => {
    const parts = ex.cron.split(' ')
    setMinute(parts[0])
    setHour(parts[1])
    setDay(parts[2])
    setMonth(parts[3])
    setWeekday(parts[4])
    buildCron(parts[0], parts[1], parts[2], parts[3], parts[4])
  }

  const buildCron = (m: string, h: string, d: string, mon: string, w: string) => {
    const cronStr = `${m} ${h} ${d} ${mon} ${w}`
    setCron(cronStr)
    describeCron(cronStr)
  }

  const describeCron = (cronStr: string) => {
    const parts = cronStr.split(' ')
    const [m, h, d, mon, w] = parts

    let desc = ''

    if (m === '*' && h === '*') {
      desc = '每分钟执行'
    } else if (m !== '*' && h === '*') {
      desc = `每小时的第 ${m} 分钟执行`
    } else if (m !== '*' && h !== '*') {
      if (d === '*' && mon === '*' && w === '*') {
        desc = `每天 ${h}:${m.padStart(2, '0')} 执行`
      } else if (w !== '*' && d === '*') {
        const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        desc = `每${weekdays[Number(w)]} ${h}:${m.padStart(2, '0')} 执行`
      } else if (d !== '*') {
        desc = `每月 ${d} 号 ${h}:${m.padStart(2, '0')} 执行`
      } else {
        desc = `在 ${h}:${m.padStart(2, '0')} 执行`
      }
    } else {
      desc = cronStr
    }

    setDescription(desc)
  }

  const updateField = (field: number, value: string) => {
    const fields = [minute, hour, day, month, weekday]
    fields[field] = value
    setMinute(fields[0])
    setHour(fields[1])
    setDay(fields[2])
    setMonth(fields[3])
    setWeekday(fields[4])
    buildCron(fields[0], fields[1], fields[2], fields[3], fields[4])
  }

  return (
    <div className="tool-container">
      <h1 className="tool-title">Cron 表达式生成器</h1>
      <p className="tool-desc">可视化生成 Cron 定时任务表达式</p>

      {/* 示例按钮 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {examples.map((ex) => (
          <button key={ex.label} onClick={() => loadExample(ex)} className="btn btn-secondary text-sm">
            {ex.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { name: '分钟', value: minute, range: '0-59', setter: setMinute },
          { name: '小时', value: hour, range: '0-23', setter: setHour },
          { name: '日', value: day, range: '1-31', setter: setDay },
          { name: '月', value: month, range: '1-12', setter: setMonth },
          { name: '星期', value: weekday, range: '0-6', setter: setWeekday },
        ].map((field, i) => (
          <div key={field.name} className="card p-3">
            <label className="block text-xs font-medium mb-2 text-slate-600 dark:text-slate-300">
              {field.name} ({field.range})
            </label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => updateField(i, e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-mono"
            />
          </div>
        ))}
      </div>

      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">生成的表达式</span>
          <button onClick={() => navigator.clipboard.writeText(cron)} className="text-sm text-blue-600 dark:text-blue-400">
            复制
          </button>
        </div>
        <code className="block text-xl font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
          {cron}
        </code>
        {description && (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      <div className="card p-4">
        <h3 className="font-medium mb-3">常用示例</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {examples.map((ex) => (
            <button
              key={ex.label}
              onClick={() => loadExample(ex)}
              className="text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <div className="font-mono text-xs text-slate-500">{ex.cron}</div>
              <div>{ex.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
