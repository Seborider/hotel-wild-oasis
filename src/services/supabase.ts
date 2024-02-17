import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://voeuwudnumjiyhaddzqb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvZXV3dWRudW1qaXloYWRkenFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxOTEwNjQsImV4cCI6MjAyMzc2NzA2NH0.dUaUoBqpsvTsyR6Ozy_quxqeDFduveN6b8_PHGfAkLo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
