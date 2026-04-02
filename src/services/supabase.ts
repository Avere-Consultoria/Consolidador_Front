import { createClient } from '@supabase/supabase-js';

// Pegue essas URLs no seu Dashboard do Supabase (Settings > API)
const supabaseUrl = 'https://dhiqbfldihyjbrgbfveq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoaXFiZmxkaWh5amJyZ2JmdmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTg1MDAsImV4cCI6MjA5MDAzNDUwMH0.tnqu-Y6kSk2E9x5rkoahPI6HT6GE4A7jO8wNGXk9RyE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);