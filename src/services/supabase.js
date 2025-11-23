import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tqxbsahsvufiwlyfkwws.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeGJzYWhzdnVmaXdseWZrd3dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5NzI2NzAsImV4cCI6MjA3MjU0ODY3MH0.-lQ_4Dl3UDM0HOw39eFEY9RsmqmIhE4wbIuFL8apeGk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
