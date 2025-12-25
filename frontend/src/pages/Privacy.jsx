import React from 'react'
import { useNavigate } from 'react-router-dom'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'

export default function Privacy() {
  const navigate = useNavigate()

  const content = (
    <div className="max-w-2xl mx-auto">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Privacy</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* Data Usage */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Usage</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your expense data is stored securely and is only accessible to members of your groups. 
            We use industry-standard encryption to protect your information.
          </p>
        </div>

        {/* Group Visibility */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Group Visibility</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Groups are private by default. Only members you invite or who scan your group QR code can join.
          </p>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
            <li>Group names and members are visible only to group members</li>
            <li>Expense details are private to each group</li>
            <li>You can leave a group at any time</li>
          </ul>
        </div>

        {/* Account Deletion */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Account Deletion</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            You can delete your account at any time. This will permanently remove all your data including:
          </p>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside mb-4">
            <li>Your profile information</li>
            <li>All groups you created</li>
            <li>Your expense history</li>
          </ul>
          <button className="btn-secondary w-full">
            Request Account Deletion
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Account deletion is permanent and cannot be undone
          </p>
        </div>

        {/* Contact */}
        <div className="card p-6 bg-blue-50 border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Questions?</h2>
          <p className="text-sm text-blue-700">
            If you have any privacy concerns, please contact us at{' '}
            <a href="mailto:privacy@hisabroom.com" className="underline font-medium">
              privacy@hisabroom.com
            </a>
          </p>
        </div>
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

