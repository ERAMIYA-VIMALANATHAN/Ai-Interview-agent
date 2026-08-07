import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vxumbiptvnmhkwzufvor.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_oUhtLcee0YUinFkNz-VQKQ_C4bcI0C8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

