import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import TestApp from './App'

export default function AppRouter() {
  const currentPath = window.location.pathname

  if (currentPath === '/dashboard') {
    return (
      <AuthProvider>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AuthProvider>
    )
  }

  // Default route - test application
  return <TestApp />
}