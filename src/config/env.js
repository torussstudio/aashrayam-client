export const clientEnv = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL || '',
  supabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || '',
  supabaseBucket: process.env.REACT_APP_SUPABASE_BUCKET || 'media',
};

export const validateClientEnv = () => {
  const missing = [];
  if (!clientEnv.supabaseUrl) missing.push('REACT_APP_SUPABASE_URL');
  if (!clientEnv.supabaseAnonKey) missing.push('REACT_APP_SUPABASE_ANON_KEY');
  return missing;
};
