import PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

if (!pocketbaseUrl) {
  console.error("Missing PocketBase configuration. Please check your .env file.");
}

export const pb = new PocketBase(pocketbaseUrl);
pb.autoCancellation(false);

// TypeScript interfaces
export interface UserResponse extends RecordModel {
  name: string | null;
  gender: string | null;
  age_range: string | null;
  consent_given: boolean;
  answer_1: string | null;
  answer_2: string | null;
  answer_3: string | null;
  answer_4: string | null;
  answer_5: string | null;
  answer_6: string | null;
  answer_7: string | null;
  answer_8: string | null;
  answer_9: string | null;
  answer_10: string | null;
  personality_type: string | null;
  type_code: string | null;
  scores: Record<string, number> | null;
  ending: string | null;
  session_duration_seconds: number;
  traffic_source: string | null;
  country: string | null;
  region: string | null;
  device_type: string | null;
  browser: string | null;
  test_started_at: string;
  test_completed_at: string | null;
}

export interface StatsRecord extends RecordModel {
  date: string;
  total_started: number;
  total_completed: number;
  completion_rate: number | null;
  avg_session_duration: number;
  type_distribution: Record<string, number>;
  traffic_sources: Record<string, number>;
  device_breakdown: Record<string, number>;
}

export interface CareResponse extends RecordModel {
  session_id: string;
  answer_paranoid: number;
  answer_schizoid: number;
  answer_schizotypal: number;
  answer_antisocial: number;
  answer_borderline: number;
  answer_histrionic: number;
  answer_narcissistic: number;
  answer_avoidant: number;
  answer_dependent: number;
  answer_obsessive: number;
  high_risk_areas: { questionId: string; score: number }[];
  detailed_results: { questionId: string; score: number; level: string }[];
  device_type: string | null;
  browser: string | null;
  completed_at: string | null;
}

// Helper: update daily stats (replaces Supabase DB trigger)
export async function updateDailyStats(): Promise<void> {
  try {
    const allResponses = await pb.collection("user_responses").getFullList<UserResponse>();

    const today = new Date().toISOString().split("T")[0];
    const totalStarted = allResponses.length;
    const completed = allResponses.filter((r) => r.test_completed_at);
    const totalCompleted = completed.length;
    const completionRate = totalStarted > 0 ? Math.round((totalCompleted / totalStarted) * 100) : 0;

    const completedWithDuration = allResponses.filter((r) => r.session_duration_seconds > 0);
    const avgSessionDuration =
      completedWithDuration.length > 0
        ? Math.round(completedWithDuration.reduce((sum, r) => sum + r.session_duration_seconds, 0) / completedWithDuration.length)
        : 0;

    const typeDistribution: Record<string, number> = {};
    const trafficSources: Record<string, number> = {};
    const deviceBreakdown: Record<string, number> = {};

    allResponses.forEach((r) => {
      if (r.personality_type) {
        typeDistribution[r.personality_type] = (typeDistribution[r.personality_type] || 0) + 1;
      }
      if (r.traffic_source) {
        trafficSources[r.traffic_source] = (trafficSources[r.traffic_source] || 0) + 1;
      }
      if (r.device_type) {
        deviceBreakdown[r.device_type] = (deviceBreakdown[r.device_type] || 0) + 1;
      }
    });

    const statsData = {
      date: today,
      total_started: totalStarted,
      total_completed: totalCompleted,
      completion_rate: completionRate,
      avg_session_duration: avgSessionDuration,
      type_distribution: typeDistribution,
      traffic_sources: trafficSources,
      device_breakdown: deviceBreakdown,
    };

    // Upsert: try to find existing record for today, update or create
    try {
      const existing = await pb.collection("stats").getFirstListItem<StatsRecord>(`date="${today}"`);
      await pb.collection("stats").update(existing.id, statsData);
    } catch {
      // No record for today, create new
      await pb.collection("stats").create(statsData);
    }
  } catch (err) {
    // Non-blocking: don't let stats failure break user flow
    console.error("Failed to update daily stats:", err);
  }
}
