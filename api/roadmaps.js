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
      if (!targetId) return res.status(200).json([]);
      const { data, error } = await supabase.from('roadmaps').select('*').eq('user_id', targetId).order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { title, goal, career, items, duration_weeks } = req.body;
      const targetId = userId || req.body.user_id;
      if (!targetId) return res.status(401).json({ error: 'Unauthorized' });
      const { data, error } = await supabase.from('roadmaps').insert({
        user_id: targetId,
        title,
        goal,
        career,
        items,
        duration_weeks,
        progress: 0,
        created_at: new Date().toISOString(),
      }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, progress, items } = req.body;
      const { data, error } = await supabase.from('roadmaps').update({ progress, items, updated_at: new Date().toISOString() }).eq('id', id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase.from('roadmaps').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Roadmaps API error:', err);
    res.status(500).json({ error: err.message });
  }
}
