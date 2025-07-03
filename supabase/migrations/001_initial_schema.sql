-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    age_range TEXT CHECK (age_range IN ('20s', '30s', '40s', '50s', '60+')),
    consent_given BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create answers table
CREATE TABLE answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL CHECK (question_id BETWEEN 1 AND 12),
    answer_value INTEGER NOT NULL CHECK (answer_value BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create results table
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    personality_type TEXT NOT NULL,
    scores JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stats table
CREATE TABLE stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL UNIQUE,
    total_users INTEGER DEFAULT 0,
    total_completed INTEGER DEFAULT 0,
    type_distribution JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_answers_user_id ON answers(user_id);
CREATE INDEX idx_answers_question_id ON answers(question_id);
CREATE INDEX idx_results_user_id ON results(user_id);
CREATE INDEX idx_results_personality_type ON results(personality_type);
CREATE INDEX idx_stats_date ON stats(date);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (since we're not using auth)
CREATE POLICY "Allow anonymous insert on users" ON users
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous select on users" ON users
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "Allow anonymous insert on answers" ON answers
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous select on answers" ON answers
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "Allow anonymous insert on results" ON results
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous select on results" ON results
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

-- Create function to update stats
CREATE OR REPLACE FUNCTION update_daily_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO stats (date, total_users, total_completed, type_distribution)
    VALUES (
        CURRENT_DATE,
        (SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURRENT_DATE),
        (SELECT COUNT(*) FROM results WHERE DATE(created_at) = CURRENT_DATE),
        (SELECT COALESCE(
            jsonb_object_agg(personality_type, count),
            '{}'::jsonb
        ) FROM (
            SELECT personality_type, COUNT(*) as count
            FROM results
            WHERE DATE(created_at) = CURRENT_DATE
            GROUP BY personality_type
        ) t)
    )
    ON CONFLICT (date) DO UPDATE SET
        total_users = EXCLUDED.total_users,
        total_completed = EXCLUDED.total_completed,
        type_distribution = EXCLUDED.type_distribution;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update stats
CREATE TRIGGER update_stats_on_user_insert
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_daily_stats();

CREATE TRIGGER update_stats_on_result_insert
    AFTER INSERT ON results
    FOR EACH ROW
    EXECUTE FUNCTION update_daily_stats();