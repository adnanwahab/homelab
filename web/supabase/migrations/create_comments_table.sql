-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    post_id TEXT NOT NULL,
    user_name TEXT NOT NULL DEFAULT 'Anonymous',
    user_id UUID
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read comments
CREATE POLICY "Allow anyone to read comments"
    ON public.comments
    FOR SELECT
    USING (true);

-- Create policy to allow anyone to insert comments
CREATE POLICY "Allow anyone to insert comments"
    ON public.comments
    FOR INSERT
    WITH CHECK (true); 