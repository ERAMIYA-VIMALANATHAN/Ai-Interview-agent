import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    let userId = null;
    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    if (req.method === 'GET') {
      const targetId = req.query.user_id || userId;
      if (!targetId) return res.status(200).json(null);
      const { data, error } = await supabase.from('profiles').select('*').eq('user_id', targetId).single();
      if (error && error.code !== 'PGRST116') throw error;
      return res.status(200).json(data || null);
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const payload = req.body;
      const targetId = payload.user_id || userId;
      if (!targetId) return res.status(401).json({ error: 'Unauthorized' });
      const { data: existing } = await supabase.from('profiles').select('id').eq('user_id', targetId).single();
      const record = { ...payload, user_id: targetId, updated_at: new Date().toISOString() };
      if (existing) {
        const { data, error } = await supabase.from('profiles').update(record).eq('user_id', targetId).select().single();
        if (error) throw error;
        return res.status(200).json(data);
      } else {
        record.created_at = new Date().toISOString();
        const { data, error } = await supabase.from('profiles').insert(record).select().single();
        if (error) throw error;
        return res.status(201).json(data);
      }
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Profiles API error:', err);
    res.status(500).json({ error: err.message });
  }
}
