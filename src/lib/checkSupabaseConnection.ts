import { supabase } from "./supabaseClient";

export async function checkSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...");
    console.log("Supabase client initialized:", !!supabase);

    // Log the URL being used (without exposing the full URL)
    const url = import.meta.env.VITE_SUPABASE_URL || "not set";
    console.log(
      "Using Supabase URL domain:",
      url.includes("://") ? new URL(url).hostname : "invalid URL",
    );

    console.log("Attempting to query blog_posts table...");
    const { data, error } = await supabase
      .from("blog_posts")
      .select("count")
      .limit(1);

    if (error) {
      console.error("Supabase connection test failed:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      return { success: false, error };
    }

    console.log("Supabase connection successful:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Supabase connection test exception:", err);
    return { success: false, error: err };
  }
}

// Export a function to test a simpler query
export async function testSimpleQuery() {
  try {
    console.log("Testing simple RPC call to Supabase...");
    const { data, error } = await supabase.rpc("get_service_status");

    if (error) {
      console.error("Simple query failed:", error);
      return { success: false, error };
    }

    console.log("Simple query successful:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Simple query exception:", err);
    return { success: false, error: err };
  }
}
