import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { PieChart } from 'lucide-react'

export default function CategoryPieChart({ expenses }) {
  const data = useMemo(() => {
    const totals = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount
      return acc
    }, {})
    return Object.entries(totals).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
  }, [expenses])

  const option = {
    title: { text: 'Spending by Category', left: 'center', top: 15, textStyle: { fontSize: 16, fontWeight: 'bold', color: '#4f46e5' } },
    tooltip: { trigger: 'item', formatter: '{b}: ₹{c} ({d}%)', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e5e7eb', borderWidth: 1 },
    legend: { orient: 'vertical', left: 10, top: 'middle', textStyle: { fontSize: 12 } },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '55%'],
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 3 },
      label: { show: true, formatter: '{b}\n{d}%', fontSize: 11, fontWeight: 'bold' },
      emphasis: { itemStyle: { shadowBlur: 15, shadowColor: 'rgba(0, 0, 0, 0.5)' } },
      data,
      color: ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#3b82f6', '#f59e0b', '#14b8a6']
    }]
  }

  return (
    <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/20 shadow-xl p-6 hover:shadow-2xl transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <PieChart className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-gray-800">Category Distribution</h3>
      </div>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  )
}
