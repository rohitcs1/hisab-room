import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'
import Avatar from '../components/common/Avatar'

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const content = (
      <div className="max-w-2xl mx-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
            <div className="w-10"></div>
          </div>
        </header>

        <main className="p-4">
          {/* Profile Card */}
          <div className="card p-6 mb-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar
                name={user?.email || 'User'}
                size="xl"
                className="mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {user?.user_metadata?.name || 'User'}
              </h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
              {user?.phone && (
                <p className="text-sm text-gray-600 mt-1">{user.phone}</p>
              )}
            </div>

            <button 
              onClick={() => navigate('/profile/edit')}
              className="w-full btn-secondary"
            >
              Edit Profile
            </button>
          </div>

          {/* Settings Options */}
          <div className="space-y-2 mb-6">
            <button 
              onClick={() => navigate('/settings')}
              className="w-full card card-hover p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Settings</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={signOut}
            className="w-full card p-4 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Logout</span>
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
        <MobileLayout>{content}</MobileLayout>
      </div>
    </>
  )
}

