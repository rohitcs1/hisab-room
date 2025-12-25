import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'
import Avatar from '../components/common/Avatar'
import { expenseService } from '../services/expense.service'

const categoryIcons = {
  grocery: '🍚',
  travel: '🚕',
  snacks: '🥤',
  bills: '🧾',
  rent: '🏠',
  other: '➕',
}

const filters = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
]

export default function ExpenseList() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [expenses, setExpenses] = useState([])
  const [filter, setFilter] = useState('month')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadExpenses()
  }, [groupId, filter])

  const loadExpenses = async () => {
    setLoading(true)
    try {
      const { data } = await expenseService.getGroupExpenses(groupId, filter)
      setExpenses(data || [])
    } catch (error) {
      console.error('Error loading expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const formatDate = (date) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now - d
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  const content = (
      <div className="max-w-4xl mx-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate(`/group/${groupId}`)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Expenses</h1>
            <div className="w-10"></div>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-[57px] z-20">
          <div className="flex gap-2 px-4 py-3 overflow-x-auto hide-scrollbar">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                  filter === f.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Expense List */}
        <main className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : expenses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-gray-600 mb-2">No expenses yet</p>
              <p className="text-sm text-gray-500">Add your first expense to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {expenses.map((expense) => (
                <div key={expense.id} className="card card-hover p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {categoryIcons[expense.category] || categoryIcons.other}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {formatCurrency(expense.amount)}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatDate(expense.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Avatar name={expense.paidBy?.name} size="sm" />
                        <span>Paid by {expense.paidBy?.name}</span>
                        {expense.note && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="truncate">{expense.note}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
  )

  return (
    <>
      <div className="hidden md:block">
        <DesktopLayout>{content}</DesktopLayout>
      </div>
      <div className="md:hidden">
        <MobileLayout showBottomNav={false}>{content}</MobileLayout>
      </div>
    </>
  )
}

