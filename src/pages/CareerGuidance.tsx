import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Save } from 'lucide-react';
import Layout from '../components/Layout';
import VoiceOrb from '../components/VoiceOrb';
import { type LunaContext, generateResponse } from '../lib/aiEngine';
import { authFetch } from '../lib/api';

export default function CareerGuidance() {
  const [context, setContext] = useState<LunaContext>({ language: 'en-US', assessment: { step: 0 } });
  const [messages, setMessages] = useState<{ role: 'luna' | 'user'; text: string }[]>([
    { role: 'luna', text: "Let's discover your ideal tech career. First, what are your main interests? For example: AI, web development, data, security, cloud, or product design." },
  ]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedContext = localStorage.getItem('luna-context');
    if (savedContext) setContext(JSON.parse(savedContext));
  }, []);

  useEffect(() => {
    localStorage.setItem('luna-context', JSON.stringify(context));
  }, [context]);

  const handleResponse = (text: string, action?: string, data?: any, updatedContext?: LunaContext) => {
    setMessages((prev) => [...prev, { role: 'luna', text }]);
    if (updatedContext) setContext(updatedContext);
  };

  const handleTextSubmit = (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
    const result = generateResponse(text, context);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'luna', text: result.text }]);
      setContext(result.context);
      if (result.action === 'career_recommendation') {
        saveRecommendation(result.data);
      }
    }, 400);
  };

  const saveRecommendation = async (data: any) => {
    setSaving(true);
    try {
      await authFetch('/api/profiles', {
        method: 'POST',
        body: JSON.stringify({
          recommended_career: data.career,
          career_reason: data.reason || `Recommended based on your interests and skills.`,
          interests: data.assessment?.interests,
          skills: data.assessment?.skills,
          experience: data.assessment?.experience,
          dream_companies: data.assessment?.dreamCompanies,
          goals: data.assessment?.goals,
        }),
      });
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-white flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            AI Career Guidance
          </h1>
          <p className="text-slate-400 mt-2">Answer Luna's questions to discover your best-fit tech career.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col items-center">
            <VoiceOrb
              context={context}
              onContextChange={setContext}
              onResponse={handleResponse}
              compact
            />
            {saved && (
              <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm">
                <Save className="w-4 h-4" /> Saved to profile
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 min-h-[500px] flex flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-2">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {saving && <div className="text-xs text-slate-500">Saving recommendation...</div>}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem('careerInput') as HTMLInputElement;
                if (input.value.trim()) {
                  handleTextSubmit(input.value.trim());
                  input.value = '';
                }
              }}
              className="mt-4 flex gap-2"
            >
              <input
                name="careerInput"
                type="text"
                placeholder="Type your answer..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60"
              />
              <button type="submit" className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
