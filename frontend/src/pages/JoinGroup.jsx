import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'
import Avatar from '../components/common/Avatar'
import { groupService } from '../services/group.service'

export default function JoinGroup() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadGroupDetails()
  }, [groupId])

  const loadGroupDetails = async () => {
    try {
      const { data, error } = await groupService.getGroupDetails(groupId)
      if (error) {
        setError('Group not found')
      } else {
        setGroup(data)
      }
    } catch (err) {
      setError('Failed to load group details')
    } finally {
      setLoading(false)
    }
  }

  const handleJoinGroup = async () => {
    setJoining(true)
    setError('')
    
    try {
      // Get current user ID from auth context or localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const { error: joinError } = await groupService.joinGroup(groupId, user?.id)
      
      if (joinError) {
        throw new Error(joinError.message || 'Failed to join group')
      }
      
      // Redirect to group dashboard
      navigate(`/group/${groupId}`)
    } catch (err) {
      setError(err.message || 'Failed to join group')
      setJoining(false)
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
          <h1 className="text-lg font-semibold text-gray-900">Join Group</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : error && !group ? (
          <div className="card p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Group Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Back to Groups
            </button>
          </div>
        ) : group ? (
          <div className="space-y-6">
            {/* Group Info Card */}
            <div className="card p-6 text-center">
              <Avatar name={group.name} size="xl" className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{group.name}</h2>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {group.memberCount} members
                </span>
                {group.totalExpense > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ₹{group.totalExpense.toLocaleString('en-IN')} total
                  </span>
                )}
              </div>
            </div>

            {error && (
              <div className="card p-4 bg-red-50 border-red-200">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Join Button */}
            <button
              onClick={handleJoinGroup}
              disabled={joining}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {joining ? 'Joining...' : 'Join Group'}
            </button>

            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full"
            >
              Cancel
            </button>
          </div>
        ) : null}
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

