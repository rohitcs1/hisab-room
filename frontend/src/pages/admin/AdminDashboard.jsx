import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/Layout/AdminLayout'

export default function AdminDashboard() {
  const navigate = useNavigate()

  const stats = [
    { label: 'Total Users', value: '1,234', icon: '👥', color: 'blue' },
    { label: 'Active Groups', value: '456', icon: '💬', color: 'green' },
    { label: 'Total Expenses', value: '₹12.5L', icon: '💰', color: 'purple' },
    { label: 'Active Ads', value: '23', icon: '📢', color: 'orange' },
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{stat.icon}</div>
                <div className={`w-3 h-3 rounded-full bg-${stat.color}-500`}></div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/users')}
            className="card card-hover p-6 text-left"
          >
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage all users</p>
          </button>

          <button
            onClick={() => navigate('/admin/groups')}
            className="card card-hover p-6 text-left"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Groups</h3>
            <p className="text-sm text-gray-600">View and manage all groups</p>
          </button>

          <button
            onClick={() => navigate('/admin/ads')}
            className="card card-hover p-6 text-left"
          >
            <div className="text-3xl mb-3">📢</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Ads</h3>
            <p className="text-sm text-gray-600">Create and manage advertisements</p>
          </button>

          <button
            onClick={() => navigate('/admin/payments')}
            className="card card-hover p-6 text-left"
          >
            <div className="text-3xl mb-3">💳</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payments</h3>
            <p className="text-sm text-gray-600">View payment history and status</p>
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}

