import React, { useMemo } from 'react'
import { DollarSign, TrendingUp, Award } from 'lucide-react'

export default function ExpenseSummary({ expenses, allExpenses }) {
  const stats = useMemo(() => {
    const total = expenses.reduce((s, e) => s + e.amount, 0)
    const month = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    const monthlyTotal = allExpenses.filter(e => e.date.startsWith(month)).reduce((s, e) => s + e.amount, 0)
    const cats = expenses.reduce((acc, e) => ({ ...acc, [e.category]: (acc[e.category] || 0) + e.amount }), {})
    const top = Object.entries(cats).sort((a, b) => b[1] - a[1])[0]
    return { total, monthlyTotal, top: top ? top[0] : 'N/A', count: expenses.length }
  }, [expenses, allExpenses])

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-4">
      <Card icon={DollarSign} title="Total" value={`₹${stats.total.toFixed(2)}`} sub={`${stats.count} items`} />
      <Card icon={TrendingUp} title="This Month" value={`₹${stats.monthlyTotal.toFixed(2)}`} />
      <Card icon={Award} title="Top" value={stats.top} />
    </div>
  )
}

function Card({ icon: Icon, title, value, sub }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}
