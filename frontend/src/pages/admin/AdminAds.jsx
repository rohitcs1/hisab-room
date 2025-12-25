import React, { useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'

export default function AdminAds() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    placement: 'banner',
    startDate: '',
    endDate: '',
    status: 'pending',
  })

  const ads = [
    {
      id: 1,
      title: 'Summer Sale',
      image: '/placeholder-ad.jpg',
      placement: 'banner',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'active',
    },
    {
      id: 2,
      title: 'New Product Launch',
      image: '/placeholder-ad.jpg',
      placement: 'sidebar',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      status: 'pending',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle ad creation
    console.log('Ad created:', formData)
    setShowForm(false)
    setFormData({
      title: '',
      image: null,
      placement: 'banner',
      startDate: '',
      endDate: '',
      status: 'pending',
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Ads Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Create Ad'}
          </button>
        </div>

        {/* Create Ad Form */}
        {showForm && (
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Ad</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Poster/Banner
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    className="hidden"
                    id="ad-image"
                  />
                  <label
                    htmlFor="ad-image"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload image</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placement
                </label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                  className="input-field"
                >
                  <option value="banner">Banner (Top)</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Create Ad
              </button>
            </form>
          </div>
        )}

        {/* Ads List */}
        <div className="space-y-4">
          {ads.map((ad) => (
            <div key={ad.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{ad.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>Placement: <strong>{ad.placement}</strong></span>
                    <span>•</span>
                    <span>{ad.startDate} to {ad.endDate}</span>
                  </div>
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Ad Preview</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
                  {ad.status.toUpperCase()}
                </span>
                <div className="flex gap-2">
                  <button className="btn-secondary text-sm py-2 px-4">Edit</button>
                  <button className="bg-red-100 text-red-600 text-sm py-2 px-4 rounded-xl font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

