-- Drop existing tables and recreate with new structure
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS results CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stats CASCADE;

-- Create new unified user_responses table
CREATE TABLE user_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- User information
    name TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    age_range TEXT CHECK (age_range IN ('20s', '30s', '40s', '50s', '60+')),
    consent_given BOOLEAN DEFAULT FALSE,
    
    -- Test answers (10 questions)
    answer_1 INTEGER CHECK (answer_1 BETWEEN 1 AND 5),
    answer_2 INTEGER CHECK (answer_2 BETWEEN 1 AND 5),
    answer_3 INTEGER CHECK (answer_3 BETWEEN 1 AND 5),
    answer_4 INTEGER CHECK (answer_4 BETWEEN 1 AND 5),
    answer_5 INTEGER CHECK (answer_5 BETWEEN 1 AND 5),
    answer_6 INTEGER CHECK (answer_6 BETWEEN 1 AND 5),
    answer_7 INTEGER CHECK (answer_7 BETWEEN 1 AND 5),
    answer_8 INTEGER CHECK (answer_8 BETWEEN 1 AND 5),
    answer_9 INTEGER CHECK (answer_9 BETWEEN 1 AND 5),
    answer_10 INTEGER CHECK (answer_10 BETWEEN 1 AND 5),
    answer_11 INTEGER CHECK (answer_11 BETWEEN 1 AND 5),
    answer_12 INTEGER CHECK (answer_12 BETWEEN 1 AND 5),
    
    -- Test results
    personality_type TEXT,
    scores JSONB,
    
    -- Session and tracking data
    session_duration_seconds INTEGER DEFAULT 0,
    traffic_source TEXT CHECK (traffic_source IN ('Direct', 'Kakao', 'Other')) DEFAULT 'Direct',
    country TEXT,
    region TEXT,
    device_type TEXT, -- 'Mobile', 'Desktop', 'Tablet'
    browser TEXT,
    
    -- Timestamps
    test_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    test_completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stats table for aggregated data
CREATE TABLE stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL UNIQUE,
    total_started INTEGER DEFAULT 0,
    total_completed INTEGER DEFAULT 0,
    completion_rate DECIMAL(5,2),
    avg_session_duration INTEGER DEFAULT 0,
    type_distribution JSONB DEFAULT '{}',
    traffic_sources JSONB DEFAULT '{}',
    device_breakdown JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_responses_test_started ON user_responses(test_started_at);
CREATE INDEX idx_user_responses_test_completed ON user_responses(test_completed_at);
CREATE INDEX idx_user_responses_personality_type ON user_responses(personality_type);
CREATE INDEX idx_user_responses_traffic_source ON user_responses(traffic_source);
CREATE INDEX idx_user_responses_device_type ON user_responses(device_type);
CREATE INDEX idx_stats_date ON stats(date);

-- Enable Row Level Security
ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access
CREATE POLICY "Allow anonymous insert on user_responses" ON user_responses
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous update on user_responses" ON user_responses
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow anonymous select on user_responses" ON user_responses
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "Allow anonymous select on stats" ON stats
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "Allow anonymous insert on stats" ON stats
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous update on stats" ON stats
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_user_responses_updated_at
    BEFORE UPDATE ON user_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update daily stats
CREATE OR REPLACE FUNCTION update_daily_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO stats (
        date, 
        total_started, 
        total_completed, 
        completion_rate,
        avg_session_duration,
        type_distribution,
        traffic_sources,
        device_breakdown
    )
    VALUES (
        CURRENT_DATE,
        (SELECT COUNT(*) FROM user_responses WHERE DATE(test_started_at) = CURRENT_DATE),
        (SELECT COUNT(*) FROM user_responses WHERE DATE(test_completed_at) = CURRENT_DATE),
        (SELECT 
            CASE 
                WHEN COUNT(*) FILTER (WHERE test_started_at::date = CURRENT_DATE) > 0 
                THEN ROUND(
                    (COUNT(*) FILTER (WHERE test_completed_at::date = CURRENT_DATE) * 100.0) / 
                    COUNT(*) FILTER (WHERE test_started_at::date = CURRENT_DATE), 2
                )
                ELSE 0 
            END
        FROM user_responses),
        (SELECT COALESCE(AVG(session_duration_seconds), 0)::INTEGER 
         FROM user_responses 
         WHERE DATE(test_completed_at) = CURRENT_DATE),
        (SELECT COALESCE(
            jsonb_object_agg(personality_type, count),
            '{}'::jsonb
        ) FROM (
            SELECT personality_type, COUNT(*) as count
            FROM user_responses
            WHERE DATE(test_completed_at) = CURRENT_DATE
            AND personality_type IS NOT NULL
            GROUP BY personality_type
        ) t),
        (SELECT COALESCE(
            jsonb_object_agg(traffic_source, count),
            '{}'::jsonb
        ) FROM (
            SELECT traffic_source, COUNT(*) as count
            FROM user_responses
            WHERE DATE(test_started_at) = CURRENT_DATE
            GROUP BY traffic_source
        ) t),
        (SELECT COALESCE(
            jsonb_object_agg(device_type, count),
            '{}'::jsonb
        ) FROM (
            SELECT device_type, COUNT(*) as count
            FROM user_responses
            WHERE DATE(test_started_at) = CURRENT_DATE
            AND device_type IS NOT NULL
            GROUP BY device_type
        ) t)
    )
    ON CONFLICT (date) DO UPDATE SET
        total_started = EXCLUDED.total_started,
        total_completed = EXCLUDED.total_completed,
        completion_rate = EXCLUDED.completion_rate,
        avg_session_duration = EXCLUDED.avg_session_duration,
        type_distribution = EXCLUDED.type_distribution,
        traffic_sources = EXCLUDED.traffic_sources,
        device_breakdown = EXCLUDED.device_breakdown;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update stats
CREATE TRIGGER update_stats_on_user_insert
    AFTER INSERT ON user_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_daily_stats();

CREATE TRIGGER update_stats_on_user_update
    AFTER UPDATE ON user_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_daily_stats();