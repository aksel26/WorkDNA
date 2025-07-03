-- Fix RLS policies for stats table
-- Add missing INSERT and UPDATE policies for stats table

CREATE POLICY "Allow anonymous insert on stats" ON stats
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous update on stats" ON stats
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

-- Also add policies for authenticated users and service role
CREATE POLICY "Allow authenticated insert on stats" ON stats
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update on stats" ON stats
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow service role full access for functions
CREATE POLICY "Allow service role all on stats" ON stats
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);