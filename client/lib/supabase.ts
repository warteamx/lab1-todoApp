import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://wwcrjqqaapcasamfplfa.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3Y3JqcXFhYXBjYXNhbWZwbGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Njc3MzgsImV4cCI6MjA2NjM0MzczOH0.FL1LJZRWSNlUs2DO1bT7fkWZxMObjSAlXw62_I2BK_0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})