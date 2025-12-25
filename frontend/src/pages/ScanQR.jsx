import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileLayout from '../components/Layout/MobileLayout'
import DesktopLayout from '../components/Layout/DesktopLayout'

export default function ScanQR() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(true)
  const [error, setError] = useState('')
  const [hasPermission, setHasPermission] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => {
    requestCameraPermission()
    return () => {
      stopCamera()
    }
  }, [])

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setHasPermission(true)
      }
    } catch (err) {
      console.error('Camera permission denied:', err)
      setHasPermission(false)
      setError('Camera access is required to scan QR codes')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const handleManualInput = () => {
    const groupId = prompt('Enter Group ID:')
    if (groupId && groupId.trim()) {
      navigate(`/join-group/${groupId.trim()}`)
    }
  }

  const handleQRScan = (qrData) => {
    try {
      // Parse QR data - expected format: "hisabroom:group:groupId" or just "groupId"
      let groupId = qrData
      if (qrData.includes(':')) {
        const parts = qrData.split(':')
        groupId = parts[parts.length - 1]
      }

      if (groupId && groupId.trim()) {
        stopCamera()
        navigate(`/join-group/${groupId.trim()}`)
      } else {
        setError('Invalid QR code format')
      }
    } catch (err) {
      setError('Failed to parse QR code')
    }
  }

  // Simulate QR scan for demo (in production, use a library like html5-qrcode or jsQR)
  const simulateQRScan = () => {
    // This is a placeholder - in production, use a real QR scanner library
    // For now, we'll show a manual input option
    setTimeout(() => {
      // Simulate scanning after 2 seconds
      const mockGroupId = '1'
      handleQRScan(mockGroupId)
    }, 2000)
  }

  const content = (
    <div className="max-w-2xl mx-auto">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              stopCamera()
              navigate('/')
            }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Scan Group QR</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="p-4">
        {hasPermission === false ? (
          <div className="card p-8 text-center">
            <div className="text-6xl mb-4">📷</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Camera Access Required</h2>
            <p className="text-gray-600 mb-6">{error || 'Please allow camera access to scan QR codes'}</p>
            <button onClick={requestCameraPermission} className="btn-primary">
              Grant Permission
            </button>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Or enter Group ID manually:</p>
              <button onClick={handleManualInput} className="btn-secondary w-full">
                Enter Group ID
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Camera View */}
            <div className="card overflow-hidden relative" style={{ aspectRatio: '1' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-4 border-primary-500 rounded-lg" style={{ width: '80%', aspectRatio: '1' }}>
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500"></div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="card p-4 bg-red-50 border-red-200">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="card p-4 bg-blue-50 border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                Point your camera at a group QR code to join
              </p>
            </div>

            {/* Manual Input Option */}
            <button onClick={handleManualInput} className="btn-secondary w-full">
              Enter Group ID Manually
            </button>

            {/* Demo Button (for testing without real QR scanner) */}
            <button 
              onClick={simulateQRScan}
              className="btn-primary w-full"
            >
              Simulate Scan (Demo)
            </button>
          </div>
        )}
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

