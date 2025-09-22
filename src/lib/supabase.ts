import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging
// console.log('Supabase config:', {
//   url: supabaseUrl ? 'Set' : 'Missing',
//   key: supabaseAnonKey ? 'Set' : 'Missing'
// });

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase configuration. Please check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      results: {
        Row: {
          id: string;
          user_id: string;
          personality_type: string;
          scores: Record<string, number>;
          ending: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          personality_type: string;
          scores: Record<string, number>;
          ending?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          personality_type?: string;
          scores?: Record<string, number>;
          ending?: string | null;
          created_at?: string;
        };
      };
      user_responses: {
        Row: {
          id: string;
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          gender?: string | null;
          age_range?: string | null;
          consent_given?: boolean;
          answer_1?: string | null;
          answer_2?: string | null;
          answer_3?: string | null;
          answer_4?: string | null;
          answer_5?: string | null;
          answer_6?: string | null;
          answer_7?: string | null;
          answer_8?: string | null;
          answer_9?: string | null;
          answer_10?: string | null;
          personality_type?: string | null;
          type_code?: string | null;
          scores?: Record<string, number> | null;
          ending?: string | null;
          session_duration_seconds?: number;
          traffic_source?: string | null;
          country?: string | null;
          region?: string | null;
          device_type?: string | null;
          browser?: string | null;
          test_started_at?: string;
          test_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          gender?: string | null;
          age_range?: string | null;
          consent_given?: boolean;
          answer_1?: string | null;
          answer_2?: string | null;
          answer_3?: string | null;
          answer_4?: string | null;
          answer_5?: string | null;
          answer_6?: string | null;
          answer_7?: string | null;
          answer_8?: string | null;
          answer_9?: string | null;
          answer_10?: string | null;
          personality_type?: string | null;
          type_code?: string | null;
          scores?: Record<string, number> | null;
          ending?: string | null;
          session_duration_seconds?: number;
          traffic_source?: string | null;
          country?: string | null;
          region?: string | null;
          device_type?: string | null;
          browser?: string | null;
          test_started_at?: string;
          test_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      stats: {
        Row: {
          id: string;
          date: string;
          total_started: number;
          total_completed: number;
          completion_rate: number | null;
          avg_session_duration: number;
          type_distribution: Record<string, number>;
          traffic_sources: Record<string, number>;
          device_breakdown: Record<string, number>;
          created_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          total_started?: number;
          total_completed?: number;
          completion_rate?: number | null;
          avg_session_duration?: number;
          type_distribution?: Record<string, number>;
          traffic_sources?: Record<string, number>;
          device_breakdown?: Record<string, number>;
          created_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          total_started?: number;
          total_completed?: number;
          completion_rate?: number | null;
          avg_session_duration?: number;
          type_distribution?: Record<string, number>;
          traffic_sources?: Record<string, number>;
          device_breakdown?: Record<string, number>;
          created_at?: string;
        };
      };
    };
  };
};
