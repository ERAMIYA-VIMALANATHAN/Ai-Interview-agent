import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Route, Building2, Mic2, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import VoiceOrb from '../components/VoiceOrb';
import { type LunaContext } from '../lib/aiEngine';

export default function Home() {
  const [context, setContext] = useState<LunaContext>({ language: 'en-US' });
  const [lastResponse, setLastResponse] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem('luna-context');
    if (saved) setContext(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('luna-context', JSON.stringify(context));
  }, [context]);

  const handleResponse = (text: string, action?: string, data?: any, updatedContext?: LunaContext) => {
    setLastResponse(text);
    if (action === 'roadmap' && data) {
      localStorage.setItem('luna-generated-roadmap', JSON.stringify(data));
    }
    if (action === 'career_recommendation' && data) {
      localStorage.setItem('luna-career', JSON.stringify(data));
    }
  };

  const features = [
    { icon: Sparkles, label: 'Career Guidance', to: '/career', desc: 'Discover your ideal tech career' },
    { icon: Route, label: 'Roadmaps', to: '/roadmap', desc: 'Personalized learning plans' },
    { icon: Building2, label: 'Company Intel', to: '/company-intel', desc: 'Real-time industry insights' },
    { icon: Mic2, label: 'Mock Interview', to: '/interview', desc: 'Practice with AI voice interviews' },
    { icon: BookOpen, label: 'Learning Hub', to: '/learn', desc: 'Tutorials, DSA, and cheat sheets' },
    { icon: Target, label: 'Focus Assistant', to: '/focus', desc: 'Stay productive and motivated' },
  ];

  return (
    <Layout full>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
                Your 24/7 AI Career Mentor
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                Luna is a voice-first AI senior developer, interviewer, and coach. Prepare for top tech jobs, build personalized roadmaps, and get real-time company intelligence.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/career" className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
                  Start Assessment
                </Link>
                <Link to="/interview" className="px-5 py-2.5 rounded-full border border-slate-700 hover:border-indigo-500/50 text-slate-300 text-sm transition-colors">
                  Mock Interview
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <VoiceOrb context={context} onContextChange={setContext} onResponse={handleResponse} />
              {lastResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl p-5 text-slate-300 text-sm leading-relaxed"
                >
                  {lastResponse}
                </motion.div>
              )}
            </motion.div>
          </div>

          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <Link
                  to={f.to}
                  className="group block p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900 transition-all"
                >
                  <f.icon className="w-6 h-6 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-slate-200 font-medium text-sm">{f.label}</div>
                  <div className="text-slate-500 text-xs mt-1">{f.desc}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
