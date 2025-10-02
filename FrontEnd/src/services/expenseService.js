const API = 'http://localhost:8080/api/expenses'

export async function listExpenses({ category, from, to } = {}) {
  const params = new URLSearchParams()
  if (category) params.append('category', category)
  if (from) params.append('startDate', from)
  if (to) params.append('endDate', to)
  const res = await fetch(`${API}?${params}`)
  return res.json()
}

export async function createExpense(exp) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exp)
  })
  return res.json()
}

export async function updateExpense(id, exp) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exp)
  })
  return res.json()
}

export async function deleteExpense(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' })
}
