-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Storage policies for property images
-- Anyone can view property images
CREATE POLICY "Property images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

-- Authenticated users can upload property images
CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'property-images' 
    AND auth.uid() IS NOT NULL
  );

-- Users can update their own property images
CREATE POLICY "Users can update own property images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'property-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their own property images
CREATE POLICY "Users can delete own property images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'property-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create storage bucket for user avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  1048576, -- 1MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Storage policies for avatars
-- Anyone can view avatars
CREATE POLICY "Avatars are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Users can upload their own avatar
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can update their own avatar
CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their own avatar
CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );