import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lmulpvhnhfuvnnsbmazn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtdWxwdmhuaGZ1dm5uc2JtYXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MzcwNzQsImV4cCI6MjA0NzQxMzA3NH0.8t3jKfXrfNFtYscvCaejPHtw7QF38vO2RdxlTouANFU";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  // Enable Persisted Authentication
  auth: {
    persistSession: true,
    storageKey: "supabase.auth.token",
  },
});

// Session Management
export function getSession() {
  return supabase.auth.getSession();
}

// Subscribe to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Auth Event:", event);
  console.log("Session:", session);
});
