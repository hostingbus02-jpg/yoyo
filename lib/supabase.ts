import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pqzmzuomafhqhppmybmt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

