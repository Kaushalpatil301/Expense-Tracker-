import React, { useEffect, useState, useRef } from 'react'
import { X, Calendar } from 'lucide-react'

const CATEGORIES = ['Food', 'Utilities', 'Entertainment', 'Transportation', 'Health', 'Shopping', 'Other Categories']

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

export default function ExpenseAdd({ open, setOpen, onSubmit, expense }) {
  const [form, setForm] = useState({ description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] })
  const dateRef = useRef()

  useEffect(() => {
    if (expense) setForm({ description: expense.description, amount: expense.amount, category: expense.category, date: expense.date })
    else setForm({ description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] })
  }, [expense, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setOpen(false)}>
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 border dark:border-gray-700" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{expense ? 'Edit' : 'Add'} Expense</h2>
          <button onClick={() => setOpen(false)} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...form, amount: parseFloat(form.amount), ...(expense && { id: expense.id }) }) }} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Add Description</label>
            <input className="w-full px-3 py-2 text-sm border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="e.g., Grocery" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (₹)</label>
            <input type="number" step="0.01" min="0" className="w-full px-3 py-2 text-sm border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select className="w-full px-3 py-2 text-sm border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required>
              <option value="">Select</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
              <div onClick={() => dateRef.current?.showPicker()} className="w-full pl-10 pr-3 py-2 text-sm border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer">
                {form.date ? formatDate(form.date) : 'DD/MM/YYYY'}
              </div>
              <input ref={dateRef} type="date" className="absolute opacity-0 pointer-events-none" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{expense ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
