import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import TestApp from './App'
import { Care } from './components/Care'

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

  if (currentPath === '/care') {
    return (
      <BrowserRouter>
        <Care />
      </BrowserRouter>
    )
  }

  // Default route - test application
  return <TestApp />
}