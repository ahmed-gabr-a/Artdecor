
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('Warning: Missing Supabase environment variables. App will run in placeholder mode.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
