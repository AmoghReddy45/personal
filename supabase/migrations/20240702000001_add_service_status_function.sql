-- Create a simple function to test connectivity
CREATE OR REPLACE FUNCTION get_service_status()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN jsonb_build_object(
    'status', 'ok',
    'timestamp', now(),
    'message', 'Database connection successful'
  );
END;
$$;