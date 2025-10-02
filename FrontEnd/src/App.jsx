import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Insights from './pages/Insights'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </div>
  )
}
