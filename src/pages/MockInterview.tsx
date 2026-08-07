import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic2, Play, RotateCcw, Save, MessageSquare } from 'lucide-react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import VoiceOrb from '../components/VoiceOrb';
import { INTERVIEW_TYPES, INTERVIEW_QUESTIONS } from '../lib/interviewEngine';
import { authFetch } from '../lib/api';
import { generateResponse, type LunaContext } from '../lib/aiEngine';

export default function MockInterview() {
  return (
    <ProtectedRoute>
      <InterviewContent />
    </ProtectedRoute>
  );
}

function InterviewContent() {
  const [type, setType] = useState('technical');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [started, setStarted] = useState(false);
  const [context, setContext] = useState<LunaContext>({ language: 'en-US' });
  const [messages, setMessages] = useState<{ role: 'luna' | 'user'; text: string }[]>([]);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startInterview = () => {
    const questionSet = INTERVIEW_QUESTIONS[type] || INTERVIEW_QUESTIONS.technical;
    const first = questionSet[0];
    setStarted(true);
    setMessages([{ role: 'luna', text: `Starting ${type.replace('_', ' ')} interview${company ? ` for ${company}` : ''}${role ? ` (${role})` : ''}.\n\nQuestion 1: ${first.question}` }]);
    setContext({ language: 'en-US', interview: { type, company, role, questionIndex: 0, answers: [], difficulty: 'medium' }, lastTopic: 'mock_interview' });
    setFinalScore(null);
    setFeedback('');
  };

  const handleResponse = (text: string, action?: string, data?: any, updatedContext?: LunaContext) => {
    setMessages((prev) => [...prev, { role: 'luna', text }]);
    if (updatedContext) setContext(updatedContext);
    if (action === 'mock_interview_done' && data) {
      setFinalScore(data.score);
      setFeedback(data.feedback);
    }
  };

  const handleTextSubmit = (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
    const result = generateResponse(text, context);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'luna', text: result.text }]);
      setContext(result.context);
      if (result.action === 'mock_interview_done' && result.data) {
        setFinalScore(result.data.score);
        setFeedback(result.data.feedback);
      }
    }, 400);
  };

  const saveInterview = async () => {
    setSaving(true);
    await authFetch('/api/interviews', {
      method: 'POST',
      body: JSON.stringify({
        type,
        company,
        role,
        score: finalScore,
        feedback,
        transcript: messages.map((m) => `${m.role}: ${m.text}`).join('\n'),
      }),
    });
    setSaving(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white flex items-center justify-center gap-2">
            <Mic2 className="w-7 h-7 text-indigo-400" />
            AI Voice Mock Interview
          </h1>
          <p className="text-slate-400 mt-2">Practice with Luna as your interviewer and get detailed feedback.</p>
        </div>

        {!started ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Interview Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/60"
                >
                  {INTERVIEW_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Company (optional)</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Amazon, Google, etc."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/60"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-slate-400 text-sm mb-2">Role (optional)</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="SDE, Data Scientist, etc."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/60"
              />
            </div>
            <button
              onClick={startInterview}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4" /> Start Interview
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 flex flex-col items-center">
              <VoiceOrb context={context} onContextChange={setContext} onResponse={handleResponse} compact />
              <button
                onClick={() => { setStarted(false); setMessages([]); setFinalScore(null); }}
                className="mt-4 flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Restart
              </button>
            </div>

            <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col min-h-[500px]">
              <div className="flex-1 overflow-y-auto max-h-[500px] space-y-4 pr-2">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-line ${
                        m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {finalScore != null && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
                    <div className="text-emerald-300 text-lg font-medium">Estimated Score: {finalScore}/100</div>
                    <p className="text-slate-400 text-sm mt-2 whitespace-pre-line">{feedback}</p>
                    <button
                      onClick={saveInterview}
                      disabled={saving}
                      className="mt-4 flex items-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded-lg text-sm transition-colors"
                    >
                      <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Result'}
                    </button>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.elements.namedItem('answer') as HTMLInputElement;
                  if (input.value.trim() && finalScore == null) {
                    handleTextSubmit(input.value.trim());
                    input.value = '';
                  }
                }}
                className="mt-4 flex gap-2"
              >
                <input
                  name="answer"
                  type="text"
                  disabled={finalScore != null}
                  placeholder="Type your answer..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 disabled:opacity-50"
                />
                <button type="submit" disabled={finalScore != null} className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm transition-colors disabled:opacity-50">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
