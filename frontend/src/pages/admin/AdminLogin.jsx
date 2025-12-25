import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      // Check if user is admin after login
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (user.isAdmin) {
        navigate('/admin')
      } else {
        setError('You are not authorized to access admin panel')
        // Logout the user
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl font-bold text-white">HR</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">HisabRoom Administration</p>
        </div>

        {/* Admin Login Form */}
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Admin Login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="starhacker160@gmail.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Signing in...' : 'Admin Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              <a href="/" className="text-primary-600 font-medium hover:underline">
                Back to App
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}