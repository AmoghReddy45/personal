import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Use environment variables directly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl ? "Set" : "Not set");
console.log("Supabase Anon Key:", supabaseAnonKey ? "Set" : "Not set");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please check your environment configuration.",
  );
}

// Create the Supabase client directly without fallbacks
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
