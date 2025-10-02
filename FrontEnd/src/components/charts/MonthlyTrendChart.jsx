import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { TrendingUp } from 'lucide-react'

export default function MonthlyTrendChart({ expenses }) {
  const data = useMemo(() => {
    const monthly = expenses.reduce((acc, e) => {
      const month = e.date.substring(0, 7)
      acc[month] = (acc[month] || 0) + e.amount
      return acc
    }, {})
    const sorted = Object.entries(monthly).sort((a, b) => a[0].localeCompare(b[0]))
    return { months: sorted.map(([m]) => m), amounts: sorted.map(([, a]) => parseFloat(a.toFixed(2))) }
  }, [expenses])

  const option = {
    title: { text: 'Monthly Spending Trend', left: 'center', top: 15, textStyle: { fontSize: 16, fontWeight: 'bold', color: '#8b5cf6' } },
    tooltip: { trigger: 'axis', formatter: '{b0}: ₹{c0}', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e5e7eb', borderWidth: 1 },
    xAxis: { type: 'category', data: data.months, axisLabel: { rotate: 30, fontSize: 11 } },
    yAxis: { type: 'value', axisLabel: { formatter: '₹{value}', fontSize: 11 }, splitLine: { lineStyle: { type: 'dashed' } } },
    series: [{
      type: 'line',
      data: data.amounts,
      smooth: true,
      lineStyle: { width: 3, color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#6366f1' }, { offset: 1, color: '#ec4899' }] } },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(99, 102, 241, 0.4)' }, { offset: 1, color: 'rgba(236, 72, 153, 0.05)' }] } },
      itemStyle: { color: '#ec4899', borderWidth: 2, borderColor: '#fff' },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(236, 72, 153, 0.5)' } }
    }],
    grid: { left: '12%', right: '5%', bottom: '20%', top: '20%' }
  }

  return (
    <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/20 shadow-xl p-6 hover:shadow-2xl transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-bold text-gray-800">Monthly Overview</h3>
      </div>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  )
}
