import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { LogOut, Users, BarChart3, TrendingUp, Clock, Globe, Smartphone, Monitor } from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  completedTests: number
  completionRate: number
  avgSessionDuration: number
  todayUsers: number
  weeklyGrowth: number
  typeDistribution: Record<string, number>
  deviceBreakdown: Record<string, number>
}

export default function Dashboard() {
  const { signOut, user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const { data: userResponses } = await supabase
        .from('user_responses')
        .select('*')

      // Future: Use aggregated stats data
      await supabase
        .from('stats')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)

      if (userResponses) {
        const totalUsers = userResponses.length
        const completedTests = userResponses.filter(r => r.test_completed_at).length
        const completionRate = totalUsers > 0 ? (completedTests / totalUsers) * 100 : 0
        
        const today = new Date().toISOString().split('T')[0]
        const todayUsers = userResponses.filter(r => 
          r.created_at.startsWith(today)
        ).length

        const avgDuration = userResponses
          .filter(r => r.session_duration_seconds > 0)
          .reduce((acc, r) => acc + r.session_duration_seconds, 0) / completedTests || 0

        const typeDistribution: Record<string, number> = {}
        userResponses.forEach(r => {
          if (r.personality_type) {
            typeDistribution[r.personality_type] = (typeDistribution[r.personality_type] || 0) + 1
          }
        })

        const deviceBreakdown: Record<string, number> = {}
        userResponses.forEach(r => {
          if (r.device_type) {
            deviceBreakdown[r.device_type] = (deviceBreakdown[r.device_type] || 0) + 1
          }
        })

        setStats({
          totalUsers,
          completedTests,
          completionRate,
          avgSessionDuration: avgDuration,
          todayUsers,
          weeklyGrowth: 12.5, // Mock data
          typeDistribution,
          deviceBreakdown
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">WorkDNA 관리자 대시보드</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 사용자</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Completed Tests Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">완료된 테스트</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.completedTests.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Completion Rate Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">완료율</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.completionRate.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Today's Users Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">오늘 사용자</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.todayUsers}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large card - Personality Type Distribution */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">성격 유형 분포</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats?.typeDistribution || {}).map(([type, count]) => (
                <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Side card - Session Duration */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">평균 세션 시간</h3>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {Math.round((stats?.avgSessionDuration || 0) / 60)}분
              </p>
              <p className="text-sm text-gray-600">사용자 평균</p>
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">디바이스 분석</h3>
            <div className="space-y-3">
              {Object.entries(stats?.deviceBreakdown || {}).map(([device, count]) => (
                <div key={device} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {device === 'mobile' && <Smartphone className="w-4 h-4 text-gray-600" />}
                    {device === 'desktop' && <Monitor className="w-4 h-4 text-gray-600" />}
                    {device === 'tablet' && <Globe className="w-4 h-4 text-gray-600" />}
                    <span className="text-sm text-gray-600 capitalize">{device}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Chart Placeholder */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">주간 성장률</h3>
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-green-600">+{stats?.weeklyGrowth}%</p>
                <p className="text-sm text-gray-600">지난 주 대비</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}