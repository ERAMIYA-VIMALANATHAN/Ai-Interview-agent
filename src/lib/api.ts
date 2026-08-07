import supabase from './supabase';

export async function authFetch(path: string, options: RequestInit = {}) {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(path, { ...options, headers });
}

export async function getUserId() {
  const session = await supabase.auth.getSession();
  return session.data.session?.user?.id || null;
}
