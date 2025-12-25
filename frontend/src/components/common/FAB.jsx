import React from 'react'

export default function FAB({ onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg shadow-primary-500/50 flex items-center justify-center z-40 active:scale-95 transition-transform"
      aria-label={label}
    >
      {icon || (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )}
    </button>
  )
}


