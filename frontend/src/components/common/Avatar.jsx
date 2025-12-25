import React from 'react'

export default function Avatar({ name, size = 'md', src = null, className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  }

  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'

  return (
    <div
      className={`avatar ${sizeClasses[size]} ${className}`}
      style={{
        background: src
          ? `url(${src}) center/cover`
          : `linear-gradient(135deg, #7dd3fc 0%, #0ea5e9 100%)`,
      }}
    >
      {!src && initials}
    </div>
  )
}


