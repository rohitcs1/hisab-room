import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'
import { groupService } from '../services/supabase'

export default function GroupDashboard() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGroup()
  }, [groupId])

  const loadGroup = async () => {
    try {
      const { data } = await groupService.getGroupDetails(groupId)
      setGroup(data)
    } catch (error) {
      console.error('Error loading group:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  if (loading) {
    return (
      <>
        <div className="hidden md:block">
          <DesktopLayout>
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          </DesktopLayout>
        </div>
        <div className="md:hidden">
          <MobileLayout>
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          </MobileLayout>
        </div>
      </>
    )
  }

  if (!group) {
    return (
      <>
        <div className="hidden md:block">
          <DesktopLayout>
            <div className="text-center py-12">
              <p className="text-gray-600">Group not found</p>
            </div>
          </DesktopLayout>
        </div>
        <div className="md:hidden">
          <MobileLayout>
            <div className="text-center py-12">
              <p className="text-gray-600">Group not found</p>
            </div>
          </MobileLayout>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="hidden md:block">
        <DesktopLayout>
          <div className="max-w-4xl mx-auto">
            {/* Top Bar */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">{group.name}</h1>
                    <p className="text-xs text-gray-500">{group.memberCount} members</p>
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  aria-label="Settings"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Summary Section */}
            <div className="p-4">
              <div className="card p-6 mb-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Monthly Expense</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatCurrency(group.totalExpense)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Per Person</p>
                    <p className="text-xl font-semibold text-primary-600">
                      {formatCurrency(group.perPersonAverage)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Action Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => navigate(`/group/${groupId}/add-expense`)}
                  className="card card-hover p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Add Expense</span>
                </button>

                <button
                  onClick={() => navigate(`/group/${groupId}/expenses`)}
                  className="card card-hover p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Expenses</span>
                </button>

                <button
                  onClick={() => navigate(`/group/${groupId}/balance`)}
                  className="card card-hover p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Balance</span>
                </button>
              </div>

              {/* Recent Activity */}
              <div className="card p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-600">Expense added 2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Balance settled yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DesktopLayout>
      </div>
      <div className="md:hidden">
        <MobileLayout>
          <div className="max-w-4xl mx-auto">
            {/* Top Bar */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">{group.name}</h1>
                    <p className="text-xs text-gray-500">{group.memberCount} members</p>
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  aria-label="Settings"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Summary Section */}
            <div className="p-4">
              <div className="card p-6 mb-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Monthly Expense</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatCurrency(group.totalExpense)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Per Person</p>
                    <p className="text-xl font-semibold text-primary-600">
                      {formatCurrency(group.perPersonAverage)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Action Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => navigate(`/group/${groupId}/add-expense`)}
                  className="card card-hover p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Add Expense</span>
                </button>

                <button
                  onClick={() => navigate(`/group/${groupId}/expenses`)}
                  className="card card-hover p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Expenses</span>
                </button>

                <button
                  onClick={() => navigate(`/group/${groupId}/balance`)}
                  className="card card-hover p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Balance</span>
                </button>
              </div>

              {/* Recent Activity */}
              <div className="card p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-600">Expense added 2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Balance settled yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MobileLayout>
      </div>
    </>
  )
}


