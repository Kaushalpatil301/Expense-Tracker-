import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, Wallet, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Navigation() {
  const location = useLocation()
  const { isDark, toggleDark } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">Expense Tracker</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium ${location.pathname === '/' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <LayoutDashboard className="w-4 h-4 inline mr-1" />Dashboard
          </Link>
          <Link to="/insights" className={`px-3 py-2 rounded-lg text-sm font-medium ${location.pathname === '/insights' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <TrendingUp className="w-4 h-4 inline mr-1" />Insights
          </Link>
          <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  )
}
