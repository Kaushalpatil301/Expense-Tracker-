import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { BarChart3 } from 'lucide-react'

export default function CategoryBarChart({ expenses }) {
  const data = useMemo(() => {
    const totals = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount
      return acc
    }, {})
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1])
    return { categories: sorted.map(([c]) => c), amounts: sorted.map(([, a]) => parseFloat(a.toFixed(2))) }
  }, [expenses])

  const option = {
    title: { text: 'Top Spending Categories', left: 'center', top: 15, textStyle: { fontSize: 16, fontWeight: 'bold', color: '#10b981' } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b0}: ₹{c0}', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e5e7eb', borderWidth: 1 },
    xAxis: { type: 'category', data: data.categories, axisLabel: { fontSize: 11, rotate: 20 } },
    yAxis: { type: 'value', axisLabel: { formatter: '₹{value}', fontSize: 11 }, splitLine: { lineStyle: { type: 'dashed' } } },
    series: [{
      type: 'bar',
      data: data.amounts,
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#10b981' }, { offset: 1, color: '#3b82f6' }] },
        borderRadius: [8, 8, 0, 0]
      },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(16, 185, 129, 0.5)' } }
    }],
    grid: { left: '12%', right: '5%', bottom: '15%', top: '20%' }
  }

  return (
    <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/20 shadow-xl p-6 hover:shadow-2xl transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-bold text-gray-800">Category Comparison</h3>
      </div>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  )
}
