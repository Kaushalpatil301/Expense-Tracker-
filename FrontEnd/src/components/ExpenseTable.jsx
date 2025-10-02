import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'

const colors = {
  Food: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  Utilities: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Entertainment: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  Transportation: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Health: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  Shopping: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  Other: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
}

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  if (!expenses.length) return <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-12 text-center text-gray-500 dark:text-gray-400 shadow-sm">No expenses</div>

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
          <tr>
            <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Description</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Category</th>
            <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Amount</th>
            <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => {
            const [year, month, day] = e.date.split('-')
            const formattedDate = `${day}/${month}/${year}`
            return (
              <tr key={e.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{formattedDate}</td>
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{e.description}</td>
                <td className="py-3 px-4"><span className={`px-2 py-1 rounded text-xs font-medium ${colors[e.category] || colors.Other}`}>{e.category}</span></td>
                <td className="py-3 px-4 text-right font-bold text-indigo-600 dark:text-indigo-400">₹{e.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => onEdit(e)} className="p-1 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded"><Edit2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /></button>
                    <button onClick={() => onDelete(e.id)} className="p-1 hover:bg-red-50 dark:hover:bg-red-900 rounded"><Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" /></button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
