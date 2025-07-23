import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getPersonalityTypeAlias } from '../utils/personalityTypeUtils';

export interface Stats {
  totalParticipants: number;
  totalCompleted: number;
  completionRate: number;
  mostCommonType: string;
  mostCommonTypePercentage: number;
  avgSessionDuration: number; // in seconds
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get personality type name in Korean
  const getTypeDisplayName = (typeCode: string): string => {
    return getPersonalityTypeAlias(typeCode);
  };

  // Helper function to find most common type from distribution
  const getMostCommonType = (distribution: Record<string, number>) => {
    let maxCount = 0;
    let mostCommonType = 'AB'; // fallback
    let totalCount = 0;

    Object.entries(distribution).forEach(([type, count]) => {
      totalCount += count;
      if (count > maxCount) {
        maxCount = count;
        mostCommonType = type;
      }
    });

    const percentage = totalCount > 0 ? Math.round((maxCount / totalCount) * 100) : 0;
    
    return {
      type: getTypeDisplayName(mostCommonType),
      percentage
    };
  };

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get the latest stats record (most recent date)
      const { data: statsData, error: statsError } = await supabase
        .from('stats')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (statsError) {
        // If no stats table data, fetch from user_responses directly
        console.warn('No stats data found, fetching from user_responses:', statsError);
        
        const { data: userResponses, error: userError } = await supabase
          .from('user_responses')
          .select('personality_type, session_duration_seconds, test_completed_at');

        if (userError) throw userError;

        // Calculate stats from user_responses
        const totalParticipants = userResponses.length;
        const completed = userResponses.filter(r => r.test_completed_at).length;
        const completionRate = totalParticipants > 0 ? Math.round((completed / totalParticipants) * 100) : 0;

        // Calculate type distribution
        const typeDistribution: Record<string, number> = {};
        userResponses.forEach(response => {
          if (response.personality_type) {
            typeDistribution[response.personality_type] = (typeDistribution[response.personality_type] || 0) + 1;
          }
        });

        // Calculate average session duration
        const completedWithDuration = userResponses.filter(r => r.session_duration_seconds > 0);
        const avgDuration = completedWithDuration.length > 0 
          ? Math.round(completedWithDuration.reduce((sum, r) => sum + r.session_duration_seconds, 0) / completedWithDuration.length)
          : 300; // fallback 5 minutes

        const { type: mostCommonType, percentage } = getMostCommonType(typeDistribution);

        setStats({
          totalParticipants,
          totalCompleted: completed,
          completionRate,
          mostCommonType,
          mostCommonTypePercentage: percentage,
          avgSessionDuration: avgDuration
        });
      } else {
        // Use stats table data
        const { type: mostCommonType, percentage } = getMostCommonType(statsData.type_distribution);

        setStats({
          totalParticipants: statsData.total_started,
          totalCompleted: statsData.total_completed,
          completionRate: statsData.completion_rate || 0,
          mostCommonType,
          mostCommonTypePercentage: percentage,
          avgSessionDuration: Math.round(statsData.avg_session_duration)
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to load statistics');
      
      // Fallback to default values
      setStats({
        totalParticipants: 1247,
        totalCompleted: 1120,
        completionRate: 90,
        mostCommonType: '행동대장',
        mostCommonTypePercentage: 23,
        avgSessionDuration: 300
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats
  };
};