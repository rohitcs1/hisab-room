import React from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'

export default function AdminPayments() {
  const payments = [
    {
      id: 1,
      advertiser: 'Company A',
      amount: 5000,
      plan: 'Banner Ad - 1 Month',
      status: 'completed',
      date: '2024-01-15',
      transactionId: 'TXN123456',
    },
    {
      id: 2,
      advertiser: 'Company B',
      amount: 10000,
      plan: 'Sidebar Ad - 3 Months',
      status: 'pending',
      date: '2024-01-20',
      transactionId: 'TXN123457',
    },
    {
      id: 3,
      advertiser: 'Company C',
      amount: 7500,
      plan: 'Banner Ad - 2 Months',
      status: 'completed',
      date: '2024-01-18',
      transactionId: 'TXN123458',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Payments</h1>
        <p className="text-gray-600 mb-6">
          Payment history for advertisers. Razorpay integration placeholder.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="text-sm text-gray-600 mb-2">Total Revenue</div>
            <div className="text-2xl font-bold text-gray-900">₹22,500</div>
          </div>
          <div className="card p-6">
            <div className="text-sm text-gray-600 mb-2">Completed</div>
            <div className="text-2xl font-bold text-green-600">2</div>
          </div>
          <div className="card p-6">
            <div className="text-sm text-gray-600 mb-2">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">1</div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Advertiser
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.advertiser}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{payment.plan}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(payment.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{payment.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-mono">{payment.transactionId}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Razorpay Integration Note */}
        <div className="mt-6 card p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Razorpay Integration</p>
              <p className="text-sm text-blue-700">
                This is a placeholder UI. Integrate Razorpay payment gateway for actual payment processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

