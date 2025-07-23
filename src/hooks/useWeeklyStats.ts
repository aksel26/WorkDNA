import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface WeeklyStatsData {
  week: string;
  dateLabel: string;
  users: number;
  completedTests: number;
  date: Date;
}

export const useWeeklyStats = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyStatsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeeklyStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Try to get data from stats table first
      const { data: statsData } = await supabase
        .from('stats')
        .select('*')
        .order('date', { ascending: true });

      if (statsData && statsData.length > 0) {
        // Use aggregated stats data if available
        const weeklyStats = statsData.map(stat => ({
          week: formatWeekLabel(new Date(stat.date)),
          dateLabel: formatDateLabel(new Date(stat.date)),
          users: stat.total_started,
          completedTests: stat.total_completed,
          date: new Date(stat.date)
        }));

        setWeeklyData(weeklyStats);
      } else {
        // Fallback: Calculate weekly stats from user_responses
        console.warn('No stats data found, calculating from user_responses');
        
        const { data: userResponses, error: userError } = await supabase
          .from('user_responses')
          .select('created_at, test_completed_at')
          .order('created_at', { ascending: true });

        if (userError) throw userError;

        // Group data by week
        const weeklyMap = new Map<string, { users: number; completedTests: number; date: Date }>();

        userResponses?.forEach(response => {
          const date = new Date(response.created_at);
          const weekKey = getWeekKey(date);

          if (!weeklyMap.has(weekKey)) {
            weeklyMap.set(weekKey, {
              users: 0,
              completedTests: 0,
              date: getWeekStartDate(date)
            });
          }

          const week = weeklyMap.get(weekKey)!;
          week.users += 1;
          
          if (response.test_completed_at) {
            week.completedTests += 1;
          }
        });

        // Convert to array and format for chart
        const weeklyStats = Array.from(weeklyMap.entries())
          .map(([, data]) => ({
            week: formatWeekLabel(data.date),
            dateLabel: formatDateLabel(data.date),
            users: data.users,
            completedTests: data.completedTests,
            date: data.date
          }))
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(-8); // Get last 8 weeks

        setWeeklyData(weeklyStats);
      }
    } catch (err) {
      console.error('Error fetching weekly stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to load weekly statistics');
      
      // Fallback to sample data
      setWeeklyData(generateSampleWeeklyData());
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get week key (year-week)
  const getWeekKey = (date: Date): string => {
    const year = date.getFullYear();
    const weekNumber = getWeekNumber(date);
    return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
  };

  // Helper function to get week number
  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Helper function to get week start date (Monday)
  const getWeekStartDate = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(date.setDate(diff));
  };

  // Helper function to format week label
  const formatWeekLabel = (date: Date): string => {
    const month = date.toLocaleDateString('ko-KR', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}주`;
  };

  // Helper function to format date label for XAxis
  const formatDateLabel = (date: Date): string => {
    return date.toLocaleDateString('ko-KR', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Generate sample data for fallback
  const generateSampleWeeklyData = (): WeeklyStatsData[] => {
    const data: WeeklyStatsData[] = [];
    const today = new Date();
    
    for (let i = 7; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - (i * 7));
      
      data.push({
        week: formatWeekLabel(date),
        dateLabel: formatDateLabel(date),
        users: Math.floor(Math.random() * 100) + 50,
        completedTests: Math.floor(Math.random() * 80) + 30,
        date: new Date(date)
      });
    }
    
    return data;
  };

  useEffect(() => {
    fetchWeeklyStats();
  }, []);

  return {
    weeklyData,
    isLoading,
    error,
    refetch: fetchWeeklyStats
  };
};