import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'
import Avatar from '../components/common/Avatar'
import { balanceService } from '../services/supabase'

export default function Balance() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [balanceData, setBalanceData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBalance()
  }, [groupId])

  const loadBalance = async () => {
    setLoading(true)
    try {
      const { data } = await balanceService.getGroupBalance(groupId)
      setBalanceData(data)
    } catch (error) {
      console.error('Error loading balance:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return `₹${Math.abs(amount).toLocaleString('en-IN')}`
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
          <MobileLayout showBottomNav={false}>
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          </MobileLayout>
        </div>
      </>
    )
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
            <h1 className="text-lg font-semibold text-gray-900">Balance</h1>
            <div className="w-10"></div>
          </div>
        </header>

        <main className="p-4 space-y-6">
          {/* Balance Cards */}
          <div className="space-y-3">
            {balanceData?.balances?.map((balance) => (
              <div
                key={balance.userId}
                className={`card p-4 ${
                  balance.type === 'receive'
                    ? 'bg-green-50 border-green-200'
                    : balance.type === 'owe'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={balance.name} size="lg" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{balance.name}</h3>
                      <p className="text-xs text-gray-600">
                        {balance.type === 'receive'
                          ? 'Will receive'
                          : balance.type === 'owe'
                          ? 'Owes'
                          : 'Settled'}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      balance.type === 'receive'
                        ? 'text-green-600'
                        : balance.type === 'owe'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {balance.type === 'receive' && '+'}
                    {balance.type === 'owe' && '-'}
                    {formatCurrency(balance.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Settlement Suggestions */}
          {balanceData?.settlements && balanceData.settlements.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Settlement Suggestions</h2>
              <div className="space-y-3">
                {balanceData.settlements.map((settlement, index) => (
                  <div key={index} className="card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar name={settlement.from} size="md" />
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <Avatar name={settlement.to} size="md" />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{settlement.from} → {settlement.to}</p>
                        <p className="text-lg font-bold text-primary-600">
                          {formatCurrency(settlement.amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settle Up Button */}
          <button className="btn-primary w-full text-lg py-4">
            Settle Up
          </button>
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

