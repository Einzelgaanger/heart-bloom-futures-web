
-- Create admin settings table for managing site-wide settings
CREATE TABLE public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default settings
INSERT INTO public.admin_settings (key, value) VALUES 
('total_donations', '0'),
('children_reached', '1247'),
('programs_completed', '45'),
('community_partners', '23');

-- Create events table for upcoming events
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create visits table for impact section
CREATE TABLE public.visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  visit_date DATE NOT NULL,
  activities TEXT[],
  impact_metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create visit media table for images and videos
CREATE TABLE public.visit_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID REFERENCES public.visits(id) ON DELETE CASCADE,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  caption TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create storage bucket for visit media
INSERT INTO storage.buckets (id, name, public) VALUES ('visit-media', 'visit-media', true);

-- Create storage policies for visit media
CREATE POLICY "Anyone can view visit media" ON storage.objects
  FOR SELECT USING (bucket_id = 'visit-media');

CREATE POLICY "Anyone can upload visit media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'visit-media');

CREATE POLICY "Anyone can update visit media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'visit-media');

CREATE POLICY "Anyone can delete visit media" ON storage.objects
  FOR DELETE USING (bucket_id = 'visit-media');

-- Add some sample data
INSERT INTO public.events (title, description, date, location) VALUES
('Financial Literacy Workshop', 'Monthly workshop on budgeting and saving', '2024-07-15', 'Downtown Community Center'),
('AI & Technology Bootcamp', 'Learn about artificial intelligence and coding', '2024-07-22', 'Tech Hub Nairobi');

INSERT INTO public.visits (title, description, location, visit_date, activities, impact_metrics) VALUES
('Kibera Community Outreach', 'Educational program for 200+ children focusing on financial literacy and health awareness', 'Kibera, Nairobi', '2024-06-15', ARRAY['Financial literacy workshop', 'Health screening', 'Creative arts session'], '{"children_reached": 234, "workshops_conducted": 3, "health_checkups": 180}'),
('Mathare Youth Program', 'Technology and life skills training for young adults', 'Mathare, Nairobi', '2024-05-20', ARRAY['Computer training', 'Life skills workshop', 'Mental health counseling'], '{"youth_trained": 45, "computers_distributed": 12, "counseling_sessions": 30}');
