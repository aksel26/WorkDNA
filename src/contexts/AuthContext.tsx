import React, { createContext, useContext, useEffect, useState } from 'react'
import { pb } from '../lib/pocketbase'
import type { RecordModel } from 'pocketbase'

interface AuthContextType {
  user: RecordModel | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: { message: string } | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<RecordModel | null>(pb.authStore.record)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check initial auth state
    setUser(pb.authStore.record)
    setLoading(false)

    // Listen for auth changes
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(record)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(email, password)
      return { error: null }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed'
      return { error: { message } }
    }
  }

  const signOut = async () => {
    pb.authStore.clear()
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
