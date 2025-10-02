import React, { useRef } from 'react'
import { Search, Calendar } from 'lucide-react'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

export default function ExpenseFilters({ search, setSearch, category, setCategory, dateFrom, setDateFrom, dateTo, setDateTo, categories }) {
  const fromRef = useRef()
  const toRef = useRef()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 mb-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input className="w-full pl-8 pr-2 py-2 text-sm border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select className="w-full px-2 py-2 text-sm border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All' : c}</option>)}
          </select>
        </div>
        
        <div className="relative">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
          <div className="relative">
            <Calendar className="absolute left-2 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
            <div onClick={() => fromRef.current?.showPicker()} className="w-full pl-8 pr-2 py-2 text-sm border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer">
              {dateFrom ? formatDate(dateFrom) : 'DD/MM/YYYY'}
            </div>
            <input ref={fromRef} type="date" className="absolute opacity-0 pointer-events-none" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
          <div className="relative">
            <Calendar className="absolute left-2 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
            <div onClick={() => toRef.current?.showPicker()} className="w-full pl-8 pr-2 py-2 text-sm border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer">
              {dateTo ? formatDate(dateTo) : 'DD/MM/YYYY'}
            </div>
            <input ref={toRef} type="date" className="absolute opacity-0 pointer-events-none" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}
