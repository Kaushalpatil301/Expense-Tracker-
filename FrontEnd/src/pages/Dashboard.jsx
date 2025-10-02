import React, { useEffect, useMemo, useState } from 'react'
import { listExpenses, createExpense, updateExpense, deleteExpense } from '../services/expenseService'
import ExpenseFilters from '../components/ExpenseFilters'
import ExpenseSummary from '../components/ExpenseSummary'
import ExpenseTable from '../components/ExpenseTable'
import ExpenseAdd from '../components/ExpenseAdd'
import { Plus } from 'lucide-react'

export default function Dashboard() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  async function fetchData() {
    setLoading(true)
    const params = {}
    if (category !== 'all') params.category = category
    if (dateFrom) params.from = dateFrom
    if (dateTo) params.to = dateTo
    const data = await listExpenses(params)
    setExpenses(data)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [category, dateFrom, dateTo])

  const categories = useMemo(() => ['all', ...Array.from(new Set(expenses.map(e => e.category)))], [expenses])
  const filtered = useMemo(() => expenses.filter(e => e.description.toLowerCase().includes(search.toLowerCase())), [expenses, search])

  const handleAdd = async (exp) => { await createExpense(exp); await fetchData(); setDialogOpen(false) }
  const handleUpdate = async (exp) => { await updateExpense(exp.id, exp); await fetchData(); setDialogOpen(false); setEditing(null) }
  const handleDelete = async (id) => { await deleteExpense(id); await fetchData() }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button onClick={() => { setEditing(null); setDialogOpen(true) }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 text-sm shadow-sm">
          <Plus className="w-4 h-4" />Add
        </button>
      </div>
      <ExpenseSummary expenses={filtered} allExpenses={expenses} />
      <ExpenseFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo} categories={categories} />
      {loading ? <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-12 text-center shadow-sm"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div></div> : <ExpenseTable expenses={filtered} onEdit={(e) => { setEditing(e); setDialogOpen(true) }} onDelete={handleDelete} />}
      <ExpenseAdd open={dialogOpen} setOpen={setDialogOpen} onSubmit={editing ? handleUpdate : handleAdd} expense={editing} />
    </div>
  )
}
