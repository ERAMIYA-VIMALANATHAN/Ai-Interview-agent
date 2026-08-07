import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, Code, FileText, Lightbulb } from 'lucide-react';
import Layout from '../components/Layout';
import { LEARNING_TOPICS, CODING_CHALLENGES, INTERVIEW_CHEAT_SHEETS } from '../lib/learningHub';
import { createVoiceController } from '../lib/voice';

export default function LearningHub() {
  const [activeTab, setActiveTab] = useState<'topics' | 'challenges' | 'cheatsheets'>('topics');
  const [selectedTopic, setSelectedTopic] = useState(LEARNING_TOPICS[0]);
  const [selectedChallenge, setSelectedChallenge] = useState(CODING_CHALLENGES[0]);
  const voice = createVoiceController('en-US');

  const speak = (text: string) => {
    voice.speak(text);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white flex items-center justify-center gap-2">
            <BookOpen className="w-7 h-7 text-indigo-400" />
            AI Learning Hub
          </h1>
          <p className="text-slate-400 mt-2">Master technical concepts, coding challenges, and interview cheat sheets.</p>
        </div>

        <div className="flex justify-center gap-2">
          {[
            { id: 'topics', label: 'Topics', icon: Lightbulb },
            { id: 'challenges', label: 'Challenges', icon: Code },
            { id: 'cheatsheets', label: 'Cheat Sheets', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors ${
                activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'topics' && (
            <motion.div
              key="topics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-4 max-h-[600px] overflow-y-auto">
                {LEARNING_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition-colors ${
                      selectedTopic.id === topic.id ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-medium text-sm">{topic.title}</div>
                    <div className="text-xs text-slate-500">{topic.category}</div>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-medium text-white">{selectedTopic.title}</h2>
                  <button
                    onClick={() => speak(`${selectedTopic.title}. ${selectedTopic.summary} Key concepts: ${selectedTopic.concepts.join(', ')}. Example: ${selectedTopic.example}`)}
                    className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
                  >
                    🔊 Listen
                  </button>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">{selectedTopic.summary}</p>
                <div className="mb-6">
                  <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-3">Key Concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTopic.concepts.map((c) => (
                      <span key={c} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Example</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedTopic.example}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-4 max-h-[600px] overflow-y-auto">
                {CODING_CHALLENGES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedChallenge(c)}
                    className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition-colors ${
                      selectedChallenge.id === c.id ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-medium text-sm">{c.title}</div>
                    <div className={`text-xs ${c.difficulty === 'Easy' ? 'text-emerald-400' : c.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-400'}`}>{c.difficulty}</div>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-medium text-white">{selectedChallenge.title}</h2>
                  <span className={`text-xs px-3 py-1 rounded-full border ${selectedChallenge.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : selectedChallenge.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-rose-500/10 text-rose-300 border-rose-500/20'}`}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">{selectedChallenge.description}</p>
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Hint</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedChallenge.hint}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'cheatsheets' && (
            <motion.div
              key="cheatsheets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {INTERVIEW_CHEAT_SHEETS.map((sheet) => (
                <div key={sheet.title} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">{sheet.title}</h3>
                  <ul className="space-y-3">
                    {sheet.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
