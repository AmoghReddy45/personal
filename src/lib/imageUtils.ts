import { supabase } from "./supabaseClient";

const BUCKET_NAME = "site-images";
const PUBLIC_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}`;

// Map of local image paths to Supabase URLs
const imageMap: Record<string, string> = {};

// Function to get image URL - returns Supabase URL if available, otherwise falls back to local path
export function getImageUrl(localPath: string): string {
  // If we already have a mapped URL, return it
  if (imageMap[localPath]) {
    return imageMap[localPath];
  }

  // If the path is already a full URL (e.g., https://...), return it as is
  if (localPath.startsWith("http")) {
    return localPath;
  }

  // Extract the filename from the path
  const filename = localPath.startsWith("/")
    ? localPath.substring(1) // Remove leading slash
    : localPath;

  // Construct the Supabase URL
  return `${PUBLIC_URL}/${filename}`;
}

// Function to upload all public images to Supabase storage
export async function uploadPublicImagesToSupabase() {
  try {
    console.log("Starting upload of public images to Supabase storage...");

    // List of image paths to upload
    const imagePaths = [
      "/greek-landscape.png",
      "/italian-villa.png",
      "/classical-building.png",
      "/greek-architecture.png",
      "/villa-florist.png",
      "/diogenes.jpg",
      "/Anthropic.png",
    ];

    // Convert local paths to full URLs based on current window location
    const imageUrls = imagePaths.map((path) => {
      // Remove leading slash if present
      const cleanPath = path.startsWith("/") ? path.substring(1) : path;
      // Use absolute URL with origin
      return `${window.location.origin}/${cleanPath}`;
    });

    console.log("Image URLs to upload:", imageUrls);

    console.log("Calling edge function to upload images...");
    // Call the edge function to upload images
    const { data, error } = await supabase.functions.invoke(
      "supabase-functions-upload_public_images",
      {
        body: { imageUrls },
      },
    );

    console.log("Edge function response:", { data, error });

    if (error) {
      console.error("Error uploading images:", error);
      return false;
    }

    console.log("Upload results:", data);

    // Update the image map with the new URLs
    if (data && data.results) {
      data.results.forEach((result: any) => {
        if (result.success) {
          // Extract the original path from the URL
          const originalPath = "/" + result.originalUrl.split("/").pop();
          imageMap[originalPath] = result.publicUrl;
          console.log(`Mapped ${originalPath} to ${result.publicUrl}`);
        }
      });
    }

    return true;
  } catch (error) {
    console.error("Error in uploadPublicImagesToSupabase:", error);
    return false;
  }
}

// Component props for images that use Supabase storage
export interface SupabaseImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

// Function to check if an image exists in Supabase storage
export async function checkImageExists(path: string): Promise<boolean> {
  try {
    // Extract filename from path
    const filename = path.split("/").pop() || "";

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(filename);

    return !error && !!data;
  } catch {
    return false;
  }
}
