import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "<your-supabase-url-here>";
const supabaseKey =
  "<your-supabase-key-here>";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
