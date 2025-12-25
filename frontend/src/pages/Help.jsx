import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'

export default function Help() {
  const navigate = useNavigate()
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'How do I create a group?',
      answer: 'Tap the "+" button on the home screen, enter a group name, and optionally add a group icon. You\'ll automatically be added as a member.',
    },
    {
      id: 2,
      question: 'How do I join a group?',
      answer: 'Tap the camera icon in the top bar to scan a group QR code, or ask a group member to share the group QR code with you.',
    },
    {
      id: 3,
      question: 'How do I add an expense?',
      answer: 'Open a group, tap "Add Expense", select a category, enter the amount, choose who paid, and split it equally or custom.',
    },
    {
      id: 4,
      question: 'How does balance settlement work?',
      answer: 'The app automatically calculates who owes whom based on expenses. You can view balances and settlement suggestions in the Balance tab.',
    },
    {
      id: 5,
      question: 'Can I leave a group?',
      answer: 'Yes, you can leave a group at any time from the group settings. Your expense history will remain in the group.',
    },
    {
      id: 6,
      question: 'How do I change my profile?',
      answer: 'Go to Profile, tap "Edit Profile", update your name or profile photo, and save changes.',
    },
  ]

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

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
          <h1 className="text-lg font-semibold text-gray-900">Help & Support</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* FAQs */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left py-3 flex items-center justify-between"
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                      expandedFAQ === faq.id ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFAQ === faq.id && (
                  <div className="pb-3 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact Support</h2>
          <p className="text-sm text-gray-600 mb-4">
            Need more help? Reach out to our support team.
          </p>
          <a
            href="mailto:support@hisabroom.com"
            className="btn-primary w-full text-center block"
          >
            Email Support
          </a>
        </div>

        {/* App Version */}
        <div className="card p-6 bg-gray-50">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">App Version</p>
            <p className="text-lg font-semibold text-gray-900">1.0.0</p>
            <p className="text-xs text-gray-500 mt-2">HisabRoom - Expense Sharing Made Easy</p>
          </div>
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

