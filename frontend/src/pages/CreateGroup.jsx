import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'
import Avatar from '../components/common/Avatar'
import { groupService } from '../services/group.service'

export default function CreateGroup() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [groupName, setGroupName] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!groupName.trim()) {
      setError('Group name is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Create group with placeholder logic
      const { data, error: createError } = await groupService.createGroup(
        groupName.trim(),
        user?.id
      )

      if (createError) {
        throw new Error(createError.message || 'Failed to create group')
      }

      // In production, upload avatar to Supabase Storage if provided
      if (avatarFile && data?.id) {
        // Placeholder: Upload avatar
        // await uploadGroupAvatar(data.id, avatarFile)
      }

      // Redirect to group dashboard
      navigate(`/group/${data.id}`)
    } catch (err) {
      setError(err.message || 'Failed to create group')
      setLoading(false)
    }
  }

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
          <h1 className="text-lg font-semibold text-gray-900">Create Group</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Avatar
                name={groupName || 'New Group'}
                size="xl"
                src={avatarPreview}
                className="mb-2"
              />
              <div className="text-center mt-2">
                <span className="text-sm text-primary-600 font-medium">Change Icon</span>
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Apartment 3B, Goa Trip"
              className="input-field text-lg"
              required
              maxLength={50}
            />
            <p className="text-xs text-gray-500 mt-1">
              {groupName.length}/50 characters
            </p>
          </div>

          {error && (
            <div className="card p-4 bg-red-50 border-red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !groupName.trim()}
            className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Group'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
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

