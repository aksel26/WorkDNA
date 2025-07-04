-- Add ending column to user_responses table
ALTER TABLE user_responses ADD COLUMN ending TEXT;

-- Update existing records with ending content based on personality type
UPDATE user_responses 
SET ending = CASE 
    WHEN personality_type = 'AB' THEN '진취적이며 자신감 있는 행동대장'
    WHEN personality_type = 'AA' THEN '관계 속에서 빛나는 사교왕'
    WHEN personality_type = 'BB' THEN '신뢰할 수 있는 솔직한 조언자'
    WHEN personality_type = 'BA' THEN '배려가 넘치는 따뜻한 평화주의자'
    ELSE NULL
END
WHERE personality_type IS NOT NULL;