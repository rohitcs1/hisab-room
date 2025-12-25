import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'
import Avatar from '../components/common/Avatar'

export default function EditProfile() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [name, setName] = useState(user?.user_metadata?.name || '')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }
      setAvatarFile(file)
      setError('')
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Name is required')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Placeholder: Update profile in Supabase
      // In production:
      // 1. Upload avatar to Supabase Storage if provided
      // 2. Update user metadata with new name
      // 3. Update user avatar URL

      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

      if (avatarFile) {
        // Placeholder: Upload to Supabase Storage
        // const { data: uploadData, error: uploadError } = await supabase.storage
        //   .from('avatars')
        //   .upload(`${user.id}/${Date.now()}.jpg`, avatarFile)
      }

      // Placeholder: Update user metadata
      // await supabase.auth.updateUser({
      //   data: { name: name.trim() }
      // })

      setSuccess(true)
      setTimeout(() => {
        navigate('/profile')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to update profile')
      setLoading(false)
    }
  }

  const content = (
    <div className="max-w-2xl mx-auto">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Edit Profile</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <label htmlFor="profile-avatar-upload" className="cursor-pointer">
              <Avatar
                name={name || user?.email || 'User'}
                size="xl"
                src={avatarPreview}
                className="mb-2"
              />
              <div className="text-center mt-2">
                <span className="text-sm text-primary-600 font-medium">Change Photo</span>
              </div>
            </label>
            <input
              id="profile-avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input-field text-lg"
              required
              maxLength={50}
            />
          </div>

          {/* Email/Phone (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="input-field text-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {user?.phone && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={user.phone}
                disabled
                className="input-field text-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Phone cannot be changed</p>
            </div>
          )}

          {error && (
            <div className="card p-4 bg-red-50 border-red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="card p-4 bg-green-50 border-green-200">
              <p className="text-green-600 text-sm">Profile updated successfully!</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="btn-secondary w-full"
          >
            Cancel
          </button>
        </form>
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

