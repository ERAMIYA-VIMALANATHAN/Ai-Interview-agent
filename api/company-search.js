import supabase from './db-client.js';

async function webSearch(query) {
  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${process.env.GOOGLE_SEARCH_CX}&num=3`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.items?.map((item) => ({ title: item.title, snippet: item.snippet, link: item.link })) || null;
  } catch (e) {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const { query, company, role } = req.query;
    const searchQuery = query || `${company} ${role} fresher salary interview process hiring`;

    const { data: cached, error: cacheError } = await supabase.from('company_intel').select('*').ilike('query', searchQuery).order('updated_at', { ascending: false }).limit(1).maybeSingle();
    if (cached) {
      return res.status(200).json(cached);
    }

    let results = null;
    if (process.env.GOOGLE_SEARCH_API_KEY && process.env.GOOGLE_SEARCH_CX) {
      results = await webSearch(searchQuery);
    }

    const record = {
      query: searchQuery,
      company: company || null,
      role: role || null,
      results,
      updated_at: new Date().toISOString(),
    };
    await supabase.from('company_intel').insert(record);
    return res.status(200).json(record);
  } catch (err) {
    console.error('Company search API error:', err);
    res.status(500).json({ error: err.message });
  }
}
