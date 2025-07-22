-- Care Assessment Responses Table
CREATE TABLE care_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Session info
  session_id TEXT,
  
  -- User information (optional, anonymous-friendly)
  name TEXT,
  age_range TEXT,
  gender TEXT,
  
  -- Individual question answers (1-5 scale)
  answer_paranoid INTEGER CHECK (answer_paranoid >= 1 AND answer_paranoid <= 5),
  answer_schizoid INTEGER CHECK (answer_schizoid >= 1 AND answer_schizoid <= 5),
  answer_schizotypal INTEGER CHECK (answer_schizotypal >= 1 AND answer_schizotypal <= 5),
  answer_antisocial INTEGER CHECK (answer_antisocial >= 1 AND answer_antisocial <= 5),
  answer_borderline INTEGER CHECK (answer_borderline >= 1 AND answer_borderline <= 5),
  answer_histrionic INTEGER CHECK (answer_histrionic >= 1 AND answer_histrionic <= 5),
  answer_narcissistic INTEGER CHECK (answer_narcissistic >= 1 AND answer_narcissistic <= 5),
  answer_avoidant INTEGER CHECK (answer_avoidant >= 1 AND answer_avoidant <= 5),
  answer_dependent INTEGER CHECK (answer_dependent >= 1 AND answer_dependent <= 5),
  answer_obsessive INTEGER CHECK (answer_obsessive >= 1 AND answer_obsessive <= 5),
  
  -- Results
  high_risk_areas JSONB, -- Array of personality types with scores >= 4
  detailed_results JSONB, -- Full results with levels for each type
  
  -- Analytics data
  device_type TEXT,
  browser TEXT,
  location TEXT,
  traffic_source TEXT,
  test_duration INTEGER, -- in seconds
  
  -- Timestamps
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE care_responses ENABLE ROW LEVEL SECURITY;

-- Policy for anonymous access (insert and select own records)
CREATE POLICY "Enable anonymous access for care responses" ON care_responses
    FOR ALL USING (true);

-- Index for performance
CREATE INDEX idx_care_responses_session_id ON care_responses(session_id);
CREATE INDEX idx_care_responses_created_at ON care_responses(created_at);
CREATE INDEX idx_care_responses_completed_at ON care_responses(completed_at);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_care_responses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_care_responses_updated_at_trigger
    BEFORE UPDATE ON care_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_care_responses_updated_at();