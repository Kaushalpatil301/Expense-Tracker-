import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { Calendar } from 'lucide-react'

export default function DailySpendingChart({ expenses }) {
  const data = useMemo(() => {
    const daily = expenses.reduce((acc, e) => {
      acc[e.date] = (acc[e.date] || 0) + e.amount
      return acc
    }, {})
    const sorted = Object.entries(daily).sort((a, b) => a[0].localeCompare(b[0])).slice(-30)
    return { dates: sorted.map(([d]) => d), amounts: sorted.map(([, a]) => parseFloat(a.toFixed(2))) }
  }, [expenses])

  const option = {
    title: { text: 'Daily Spending (Last 30 Days)', left: 'center', top: 15, textStyle: { fontSize: 16, fontWeight: 'bold', color: '#f97316' } },
    tooltip: { trigger: 'axis', formatter: '{b0}: ₹{c0}', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e5e7eb', borderWidth: 1 },
    xAxis: { type: 'category', data: data.dates, axisLabel: { fontSize: 10, rotate: 45 } },
    yAxis: { type: 'value', axisLabel: { formatter: '₹{value}', fontSize: 11 }, splitLine: { lineStyle: { type: 'dashed' } } },
    series: [{
      type: 'bar',
      data: data.amounts,
      itemStyle: { color: '#f97316', borderRadius: [4, 4, 0, 0] },
      emphasis: { itemStyle: { color: '#ea580c', shadowBlur: 10, shadowColor: 'rgba(249, 115, 22, 0.5)' } }
    }],
    grid: { left: '10%', right: '5%', bottom: '25%', top: '20%' }
  }

  return (
    <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/20 shadow-xl p-6 hover:shadow-2xl transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-bold text-gray-800">Daily Activity</h3>
      </div>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  )
}
