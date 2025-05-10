-- Create a storage bucket for site images if it doesn't exist
DO $$
BEGIN
    -- Check if the bucket already exists
    IF NOT EXISTS (
        SELECT 1 FROM storage.buckets WHERE name = 'site-images'
    ) THEN
        -- Create the bucket
        INSERT INTO storage.buckets (id, name, public, avif_autodetection)
        VALUES ('site-images', 'site-images', true, false);
        
        -- Storage replication is enabled by default in Supabase
    END IF;
END
$$;

-- Create policies for the site-images bucket
-- Policy for public read access
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'site-images');

-- Policy for authenticated users to upload files
DROP POLICY IF EXISTS "Authenticated Users Can Upload" ON storage.objects;
CREATE POLICY "Authenticated Users Can Upload" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'site-images');

-- Policy for authenticated users to update their own files
DROP POLICY IF EXISTS "Authenticated Users Can Update" ON storage.objects;
CREATE POLICY "Authenticated Users Can Update" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'site-images' AND auth.uid() = owner);

-- Policy for authenticated users to delete their own files
DROP POLICY IF EXISTS "Authenticated Users Can Delete" ON storage.objects;
CREATE POLICY "Authenticated Users Can Delete" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'site-images' AND auth.uid() = owner);
