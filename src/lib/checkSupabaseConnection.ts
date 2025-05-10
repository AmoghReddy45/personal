import { supabase } from "./supabaseClient";

export async function checkSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...");
    const { data, error } = await supabase
      .from("blog_posts")
      .select("count")
      .limit(1);

    if (error) {
      console.error("Supabase connection test failed:", error);
      return { success: false, error };
    }

    console.log("Supabase connection successful:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Supabase connection test exception:", err);
    return { success: false, error: err };
  }
}
