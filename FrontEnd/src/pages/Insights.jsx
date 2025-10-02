import React, { useEffect, useState, useMemo } from 'react'
import { listExpenses } from '../services/expenseService'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '../context/ThemeContext'

export default function Insights() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()

  useEffect(() => { listExpenses({}).then(setExpenses).finally(() => setLoading(false)) }, [])

  const pieData = useMemo(() => Object.entries(expenses.reduce((acc, e) => ({ ...acc, [e.category]: (acc[e.category] || 0) + e.amount }), {})).map(([name, value]) => ({ name, value })), [expenses])
  const lineData = useMemo(() => { 
    const monthly = expenses.reduce((acc, e) => {
      const monthYear = new Date(e.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
      return { ...acc, [monthYear]: (acc[monthYear] || 0) + e.amount }
    }, {})
    const sorted = Object.entries(monthly).sort((a, b) => new Date(a[0]) - new Date(b[0]))
    return { x: sorted.map(([m]) => m), y: sorted.map(([, a]) => a) }
  }, [expenses])
  const barData = useMemo(() => { 
    const sorted = Object.entries(expenses.reduce((acc, e) => ({ ...acc, [e.category]: (acc[e.category] || 0) + e.amount }), {})).sort((a, b) => b[1] - a[1])
    return { x: sorted.map(([c]) => c), y: sorted.map(([, a]) => a) }
  }, [expenses])

  if (loading) return <div className="max-w-7xl mx-auto px-6 py-12 text-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div></div>
  if (!expenses.length) return <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-500 dark:text-gray-400">No data</div>

  const txt = isDark ? '#9ca3af' : '#4b5563'
  const grid = isDark ? '#374151' : '#e5e7eb'
  const bg = isDark ? '#1f2937' : '#fff'
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f97316', '#06b6d4']
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const avg = total / expenses.length

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Insights</h1>
      
      <div className="grid gap-4 md:grid-cols-2 mb-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Spending</span>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{total.toFixed(2)}</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Average per Transaction</span>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">₹{avg.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Category Distribution</h3>
          <ReactECharts option={{
            tooltip: { trigger: 'item', formatter: '{b}: ₹{c} ({d}%)', backgroundColor: bg, textStyle: { color: txt } },
            legend: { bottom: 0, textStyle: { color: txt, fontSize: 11 } },
            series: [{ type: 'pie', radius: '60%', data: pieData, label: { fontSize: 10, color: txt }, itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 2 }, color: colors }]
          }} style={{ height: 280 }} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Monthly Trend</h3>
          <ReactECharts option={{
            tooltip: { trigger: 'axis', backgroundColor: bg, textStyle: { color: txt } },
            xAxis: { type: 'category', data: lineData.x, axisLabel: { color: txt, fontSize: 10, rotate: 15 } },
            yAxis: { type: 'value', axisLabel: { color: txt, fontSize: 10 }, splitLine: { lineStyle: { color: grid } } },
            series: [{ type: 'line', data: lineData.y, smooth: true, lineStyle: { width: 2, color: '#6366f1' }, areaStyle: { color: 'rgba(99, 102, 241, 0.1)' }, itemStyle: { color: '#6366f1' } }],
            grid: { left: 50, right: 20, bottom: 40, top: 20 }
          }} style={{ height: 280 }} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 shadow-sm md:col-span-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Top Categories</h3>
          <ReactECharts option={{
            tooltip: { trigger: 'axis', backgroundColor: bg, textStyle: { color: txt } },
            xAxis: { type: 'category', data: barData.x, axisLabel: { color: txt, fontSize: 11 } },
            yAxis: { type: 'value', axisLabel: { color: txt, fontSize: 10 }, splitLine: { lineStyle: { color: grid } } },
            series: [{ type: 'bar', data: barData.y.map((v, i) => ({ value: v, itemStyle: { color: colors[i % colors.length], borderRadius: [4, 4, 0, 0] } })), barWidth: '50%' }],
            grid: { left: 50, right: 20, bottom: 30, top: 20 }
          }} style={{ height: 280 }} />
        </div>
      </div>
    </div>
  )
}
