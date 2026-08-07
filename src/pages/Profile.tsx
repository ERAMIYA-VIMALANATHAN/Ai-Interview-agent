import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Github, Linkedin, FileText } from 'lucide-react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { authFetch } from '../lib/api';

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    authFetch('/api/profiles')
      .then((r) => r.json())
      .then((data) => {
        setForm(data || {});
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await authFetch('/api/profiles', { method: 'POST', body: JSON.stringify(form) });
    setSaving(false);
    setSaved(true);
  };

  if (loading) return <Layout><div className="text-center py-20 text-slate-400">Loading profile...</div></Layout>;

  const fields = [
    { name: 'full_name', label: 'Full Name', icon: User },
    { name: 'interests', label: 'Interests', icon: User },
    { name: 'skills', label: 'Skills', icon: User },
    { name: 'experience', label: 'Experience Level', icon: User },
    { name: 'dream_companies', label: 'Dream Companies', icon: User },
    { name: 'goals', label: 'Career Goals', icon: User },
    { name: 'github_url', label: 'GitHub URL', icon: Github },
    { name: 'linkedin_url', label: 'LinkedIn URL', icon: Linkedin },
    { name: 'resume_text', label: 'Resume Text', icon: FileText, textarea: true },
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-2">Your Profile</h1>
        <p className="text-slate-400 mb-8">Keep your details updated so Luna can personalize guidance.</p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5"
        >
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-slate-400 text-sm mb-2">{f.label}</label>
              {f.textarea ? (
                <textarea
                  value={form[f.name] || ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  rows={5}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/60"
                />
              ) : (
                <input
                  value={form[f.name] || ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/60"
                />
              )}
            </div>
          ))}

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Profile'}
            </button>
            {saved && <span className="text-emerald-400 text-sm">Profile saved.</span>}
          </div>

          {(form.github_url || form.linkedin_url || form.resume_text) && (
            <div className="mt-6 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
              <h3 className="text-slate-200 font-medium mb-2">Skill Gap Snapshot</h3>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Add system design practice if targeting senior roles.</li>
                <li>• Strengthen DSA consistency with daily medium problems.</li>
                <li>• Build 2 portfolio projects demonstrating end-to-end ownership.</li>
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
