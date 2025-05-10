import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use a try-catch to prevent the app from crashing if env vars are missing
let supabase;
try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables");
    // Create a dummy client that won't crash the app
    supabase = {
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
        eq: () => ({ data: null, error: null }),
        single: () => ({ data: null, error: null }),
        limit: () => ({ data: [], error: null }),
      }),
      auth: {
        signIn: () => Promise.resolve({ user: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      },
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: "" } }),
        }),
      },
      functions: {
        invoke: () => Promise.resolve({ data: null, error: null }),
      },
    };
  } else {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.error("Error initializing Supabase client:", error);
  // Create a dummy client as fallback
  supabase = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      // Add other methods as needed
    }),
  };
}

export { supabase };
