import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Route, Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { authFetch } from '../lib/api';
import { ROADMAP_TEMPLATES, roadmapToItems } from '../lib/roadmaps';

export default function Roadmap() {
  return (
    <ProtectedRoute>
      <RoadmapContent />
    </ProtectedRoute>
  );
}

function RoadmapContent() {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState('Amazon SDE');

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const res = await authFetch('/api/roadmaps');
      setRoadmaps(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createRoadmap = async () => {
    const template = ROADMAP_TEMPLATES[selectedGoal];
    if (!template) return;
    const items = roadmapToItems(template);
    const res = await authFetch('/api/roadmaps', {
      method: 'POST',
      body: JSON.stringify({
        title: template.title,
        goal: selectedGoal,
        career: selectedGoal,
        items,
        duration_weeks: template.durationWeeks,
      }),
    });
    if (res.ok) fetchRoadmaps();
  };

  const toggleTask = async (roadmap: any, phaseIndex: number, taskIndex: number) => {
    const items = [...roadmap.items];
    const tasks = [...items[phaseIndex].tasks];
    tasks[taskIndex] = { ...tasks[taskIndex], completed: !tasks[taskIndex].completed };
    items[phaseIndex] = { ...items[phaseIndex], tasks };

    const total = items.reduce((acc: number, phase: any) => acc + phase.tasks.length, 0);
    const completed = items.reduce((acc: number, phase: any) => acc + phase.tasks.filter((t: any) => t.completed).length, 0);
    const progress = total ? Math.round((completed / total) * 100) : 0;

    await authFetch('/api/roadmaps', {
      method: 'PUT',
      body: JSON.stringify({ id: roadmap.id, items, progress }),
    });
    fetchRoadmaps();
  };

  const deleteRoadmap = async (id: string) => {
    await authFetch('/api/roadmaps', { method: 'DELETE', body: JSON.stringify({ id }) });
    fetchRoadmaps();
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-white flex items-center gap-2">
              <Route className="w-7 h-7 text-indigo-400" />
              Roadmaps
            </h1>
            <p className="text-slate-400 text-sm mt-1">Personalized preparation plans from beginner to industry-ready.</p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500/60"
            >
              {Object.keys(ROADMAP_TEMPLATES).map((goal) => (
                <option key={goal} value={goal}>{goal}</option>
              ))}
            </select>
            <button
              onClick={createRoadmap}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Generate
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-20">Loading roadmaps...</div>
        ) : roadmaps.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 border border-slate-800 rounded-3xl">
            <Route className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-300">No roadmaps yet.</p>
            <p className="text-slate-500 text-sm mt-1">Select a goal and generate your first roadmap.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {roadmaps.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-medium text-white">{r.title}</h2>
                    <p className="text-slate-500 text-sm">{r.duration_weeks} weeks &bull; {r.goal}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-indigo-400 font-medium">{r.progress || 0}%</div>
                      <div className="w-32 bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${r.progress || 0}%` }} />
                      </div>
                    </div>
                    <button onClick={() => deleteRoadmap(r.id)} className="p-2 text-slate-500 hover:text-rose-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {r.items?.map((phase: any, pi: number) => (
                    <div key={phase.id} className="border-l-2 border-slate-800 pl-4">
                      <h3 className="text-slate-200 font-medium">{phase.title} <span className="text-slate-500 text-xs font-normal">{phase.subtitle}</span></h3>
                      <div className="mt-2 space-y-2">
                        {phase.tasks?.map((task: any, ti: number) => (
                          <button
                            key={ti}
                            onClick={() => toggleTask(r, pi, ti)}
                            className="w-full flex items-start gap-3 text-left p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                          >
                            {task.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />}
                            <span className={`text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-400'}`}>{task.text || task}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
