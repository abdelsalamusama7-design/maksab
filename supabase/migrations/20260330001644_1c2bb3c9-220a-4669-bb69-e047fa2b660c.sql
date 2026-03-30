
-- Table to track video watches and prevent abuse
CREATE TABLE public.video_watches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  video_id text NOT NULL,
  points_earned integer NOT NULL DEFAULT 10,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for rate limiting queries
CREATE INDEX idx_video_watches_user_time ON public.video_watches (user_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.video_watches ENABLE ROW LEVEL SECURITY;

-- Users can view their own watches
CREATE POLICY "Users can view own watches"
  ON public.video_watches FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own watches
CREATE POLICY "Users can insert own watches"
  ON public.video_watches FOR INSERT
  WITH CHECK (auth.uid() = user_id);
