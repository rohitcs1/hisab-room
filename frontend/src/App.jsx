import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import GroupList from './pages/GroupList'
import GroupDashboard from './pages/GroupDashboard'
import AddExpense from './pages/AddExpense'
import ExpenseList from './pages/ExpenseList'
import Balance from './pages/Balance'
import Profile from './pages/Profile'
import ScanQR from './pages/ScanQR'
import JoinGroup from './pages/JoinGroup'
import CreateGroup from './pages/CreateGroup'
import EditProfile from './pages/EditProfile'
import Settings from './pages/Settings'
import Privacy from './pages/Privacy'
import Help from './pages/Help'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAds from './pages/admin/AdminAds'
import AdminPayments from './pages/admin/AdminPayments'
import AdminUsers from './pages/admin/AdminUsers'
import AdminGroups from './pages/admin/AdminGroups'
import AdminLogin from './pages/admin/AdminLogin'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" />
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // In production, check if user is admin
  const isAdmin = user?.isAdmin || false
  return isAdmin ? children : <Navigate to="/admin/login" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <GroupList />
          </PrivateRoute>
        }
      />
      <Route
        path="/group/:groupId"
        element={
          <PrivateRoute>
            <GroupDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/group/:groupId/add-expense"
        element={
          <PrivateRoute>
            <AddExpense />
          </PrivateRoute>
        }
      />
      <Route
        path="/group/:groupId/expenses"
        element={
          <PrivateRoute>
            <ExpenseList />
          </PrivateRoute>
        }
      />
      <Route
        path="/group/:groupId/balance"
        element={
          <PrivateRoute>
            <Balance />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/scan"
        element={
          <PrivateRoute>
            <ScanQR />
          </PrivateRoute>
        }
      />
      <Route
        path="/join-group/:groupId"
        element={
          <PrivateRoute>
            <JoinGroup />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-group"
        element={
          <PrivateRoute>
            <CreateGroup />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/privacy"
        element={
          <PrivateRoute>
            <Privacy />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/help"
        element={
          <PrivateRoute>
            <Help />
          </PrivateRoute>
        }
      />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/ads"
        element={
          <AdminRoute>
            <AdminAds />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/payments"
        element={
          <AdminRoute>
            <AdminPayments />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/groups"
        element={
          <AdminRoute>
            <AdminGroups />
          </AdminRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App


