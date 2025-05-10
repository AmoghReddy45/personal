// This edge function uploads public images to Supabase storage

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing environment variables");
    }

    // Create Supabase client with service key for admin privileges
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get request data
    const { imageUrls } = await req.json();

    if (!imageUrls || !Array.isArray(imageUrls)) {
      throw new Error("Invalid request: imageUrls must be an array");
    }

    const BUCKET_NAME = "site-images";

    // Create bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);

    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
    }

    // Process each image URL
    const results = await Promise.all(
      imageUrls.map(async (imageUrl: string) => {
        try {
          // Extract filename from URL
          const filename = imageUrl.split("/").pop() || "unknown.png";

          // Fetch the image with no-cors mode and log the attempt
          console.log(`Attempting to fetch image from: ${imageUrl}`);
          const imageResponse = await fetch(imageUrl, {
            mode: "no-cors",
            cache: "no-cache",
          });

          if (!imageResponse.ok) {
            throw new Error(
              `Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`,
            );
          }

          console.log(`Successfully fetched image: ${imageUrl}`);

          const imageBlob = await imageResponse.blob();

          // Upload to Supabase storage
          const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filename, imageBlob, {
              cacheControl: "3600",
              upsert: true,
            });

          if (error) throw error;

          // Get public URL
          const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${filename}`;

          return {
            originalUrl: imageUrl,
            filename,
            publicUrl,
            success: true,
          };
        } catch (error) {
          console.error(`Error processing ${imageUrl}:`, error);
          return {
            originalUrl: imageUrl,
            success: false,
            error: error.message,
          };
        }
      }),
    );

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
