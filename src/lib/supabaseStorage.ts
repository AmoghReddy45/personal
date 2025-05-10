import { supabase } from "./supabaseClient";

// Constants
const BUCKET_NAME = "site-images";
const PUBLIC_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}`;

// Initialize the storage bucket
export async function initializeStorage() {
  try {
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);

    if (!bucketExists) {
      // Create the bucket if it doesn't exist
      const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true, // Make the bucket public
        fileSizeLimit: 5242880, // 5MB
      });

      if (error) throw error;
      console.log("Storage bucket created:", data);
    } else {
      console.log("Storage bucket already exists");
    }

    return true;
  } catch (error) {
    console.error("Error initializing storage:", error);
    return false;
  }
}

// Upload an image to Supabase storage
export async function uploadImage(file: File, path: string = "") {
  try {
    const filePath = path ? `${path}/${file.name}` : file.name;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    return getImageUrl(filePath);
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

// Get the public URL for an image
export function getImageUrl(path: string) {
  return `${PUBLIC_URL}/${path}`;
}

// List all images in a directory
export async function listImages(path: string = "") {
  try {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list(path);

    if (error) throw error;

    return data
      .filter((item) => !item.id.endsWith("/")) // Filter out folders
      .map((item) => ({
        name: item.name,
        url: getImageUrl(path ? `${path}/${item.name}` : item.name),
        size: item.metadata?.size,
        createdAt: item.created_at,
      }));
  } catch (error) {
    console.error("Error listing images:", error);
    return [];
  }
}

// Delete an image
export async function deleteImage(path: string) {
  try {
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}
