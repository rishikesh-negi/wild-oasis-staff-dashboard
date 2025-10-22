import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "<your-supabase-db-url-here>";
const supabaseKey =
  "<your-supabase-api-key-here>";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
