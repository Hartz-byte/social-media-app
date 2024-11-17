import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lmulpvhnhfuvnnsbmazn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtdWxwdmhuaGZ1dm5uc2JtYXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MzcwNzQsImV4cCI6MjA0NzQxMzA3NH0.8t3jKfXrfNFtYscvCaejPHtw7QF38vO2RdxlTouANFU";

export const supabase = createClient(supabaseUrl, supabaseKey);
