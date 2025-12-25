import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'
import Avatar from '../components/common/Avatar'
import { groupService } from '../services/group.service'
import { expenseService } from '../services/expense.service'

const categories = [
  { id: 'grocery', name: 'Grocery', icon: '🍚' },
  { id: 'travel', name: 'Travel', icon: '🚕' },
  { id: 'snacks', name: 'Snacks', icon: '🥤' },
  { id: 'bills', name: 'Bills', icon: '🧾' },
  { id: 'rent', name: 'Rent', icon: '🏠' },
  { id: 'other', name: 'Other', icon: '➕' },
]

export default function AddExpense() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('grocery')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState(null)
  const [splitMethod, setSplitMethod] = useState('equal')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadGroup()
  }, [groupId])

  const loadGroup = async () => {
    try {
      const { data } = await groupService.getGroupDetails(groupId)
      setGroup(data)
      if (data?.members?.[0]) {
        setPaidBy(data.members[0].id)
      }
    } catch (error) {
      console.error('Error loading group:', error)
    }
  }

  const handleAmountInput = (value) => {
    if (value === 'backspace') {
      setAmount((prev) => prev.slice(0, -1))
    } else if (value === 'clear') {
      setAmount('')
    } else {
      setAmount((prev) => prev + value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!amount || !paidBy) return

    setLoading(true)
    try {
      await expenseService.addExpense(groupId, {
        category: selectedCategory,
        amount: parseFloat(amount),
        paidBy,
        splitMethod,
        note,
      })
      navigate(`/group/${groupId}`)
    } catch (error) {
      console.error('Error adding expense:', error)
      alert('Failed to add expense')
    } finally {
      setLoading(false)
    }
  }

  const content = (
      <div className="max-w-2xl mx-auto">
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
            <h1 className="text-lg font-semibold text-gray-900">Add Expense</h1>
            <div className="w-10"></div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category
            </label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`card p-4 text-center transition-all ${
                    selectedCategory === cat.id
                      ? 'ring-2 ring-primary-500 bg-primary-50'
                      : 'card-hover'
                  }`}
                >
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <div className="text-xs font-medium text-gray-700">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Amount
            </label>
            <div className="card p-6 mb-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ₹{amount || '0'}
                </div>
                {amount && (
                  <button
                    type="button"
                    onClick={() => setAmount('')}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleAmountInput(num.toString())}
                  className="card card-hover p-6 text-2xl font-semibold text-gray-900"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleAmountInput('0')}
                className="card card-hover p-6 text-2xl font-semibold text-gray-900"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => handleAmountInput('.')}
                className="card card-hover p-6 text-2xl font-semibold text-gray-900"
              >
                .
              </button>
              <button
                type="button"
                onClick={() => handleAmountInput('backspace')}
                className="card card-hover p-6 text-red-600"
              >
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Paid By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Paid By
            </label>
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {group?.members?.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setPaidBy(member.id)}
                  className={`flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl transition-all ${
                    paidBy === member.id
                      ? 'bg-primary-100 ring-2 ring-primary-500'
                      : 'bg-gray-100'
                  }`}
                >
                  <Avatar name={member.name} size="lg" />
                  <span className="text-xs font-medium text-gray-700">{member.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Split Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Split Method
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSplitMethod('equal')}
                className={`flex-1 card p-4 text-center ${
                  splitMethod === 'equal'
                    ? 'ring-2 ring-primary-500 bg-primary-50'
                    : 'card-hover'
                }`}
              >
                <span className="font-medium text-gray-700">Equal Split</span>
              </button>
              <button
                type="button"
                onClick={() => setSplitMethod('custom')}
                className={`flex-1 card p-4 text-center ${
                  splitMethod === 'custom'
                    ? 'ring-2 ring-primary-500 bg-primary-50'
                    : 'card-hover'
                }`}
              >
                <span className="font-medium text-gray-700">Custom</span>
              </button>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note..."
                className="input-field"
              />
            </div>

            <button
              type="button"
              className="w-full card card-hover p-4 flex items-center justify-center gap-2 text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Upload Receipt</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !amount || !paidBy}
            className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </form>
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


