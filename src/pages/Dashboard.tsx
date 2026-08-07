import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, BookOpen, CheckCircle2, Circle } from 'lucide-react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { authFetch } from '../lib/api';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, rRes, iRes, tRes, prRes] = await Promise.all([
          authFetch('/api/profiles'),
          authFetch('/api/roadmaps'),
          authFetch('/api/interviews'),
          authFetch('/api/tasks'),
          authFetch('/api/progress'),
        ]);
        setProfile(await pRes.json());
        setRoadmaps(await rRes.json());
        setInterviews(await iRes.json());
        setTasks(await tRes.json());
        setProgress(await prRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleTask = async (task: any) => {
    const updated = { ...task, completed: !task.completed };
    await authFetch('/api/tasks', { method: 'PUT', body: JSON.stringify(updated) });
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-slate-400">Loading your dashboard...</div>
        </div>
      </Layout>
    );
  }

  const avgScore = interviews.length ? Math.round(interviews.reduce((a, b) => a + (b.score || 0), 0) / interviews.length) : 0;
  const roadmapProgress = roadmaps.length ? Math.round(roadmaps.reduce((a, b) => a + (b.progress || 0), 0) / roadmaps.length) : 0;

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back, {user?.email?.split('@')[0] || 'learner'}. Here is your progress.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={TrendingUp} label="Roadmap Progress" value={`${roadmapProgress}%`} />
          <MetricCard icon={Award} label="Avg Interview Score" value={`${avgScore}/100`} />
          <MetricCard icon={BookOpen} label="Completed Courses" value={progress.filter((p) => p.level === 'completed').length.toString()} />
          <MetricCard icon={Target} label="Pending Tasks" value={tasks.filter((t) => !t.completed).length.toString()} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Section title="Career Recommendation">
              {profile?.recommended_career ? (
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">
                  <div className="text-indigo-300 font-medium text-lg">{profile.recommended_career}</div>
                  <p className="text-slate-400 text-sm mt-2">{profile.career_reason || 'Based on your assessment responses.'}</p>
                </div>
              ) : (
                <p className="text-slate-400 text-sm">Complete a career assessment to see your recommendation.</p>
              )}
            </Section>

            <Section title="Your Roadmaps">
              {roadmaps.length ? (
                <div className="space-y-3">
                  {roadmaps.slice(0, 3).map((r) => (
                    <div key={r.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-slate-200 font-medium">{r.title}</div>
                        <div className="text-indigo-400 text-sm">{r.progress || 0}%</div>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${r.progress || 0}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">No roadmaps yet. Generate one from the Roadmap page.</p>
              )}
            </Section>

            <Section title="Recent Interview Scores">
              {interviews.length ? (
                <div className="space-y-3">
                  {interviews.slice(0, 3).map((i) => (
                    <div key={i.id} className="flex items-center justify-between bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                      <div>
                        <div className="text-slate-200 font-medium">{i.type.replace('_', ' ')} Interview</div>
                        <div className="text-slate-500 text-xs">{i.company || 'General'} {i.role ? `\u2022 ${i.role}` : ''}</div>
                      </div>
                      <div className="text-xl font-semibold text-emerald-400">{i.score || 0}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">No interviews yet. Try a mock interview.</p>
              )}
            </Section>
          </div>

          <div>
            <Section title="Daily Tasks">
              <div className="space-y-2">
                {tasks.length ? (
                  tasks.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTask(t)}
                      className="w-full flex items-start gap-3 text-left p-3 rounded-xl hover:bg-slate-900/50 transition-colors group"
                    >
                      {t.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <Circle className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 shrink-0" />}
                      <span className={`text-sm ${t.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{t.title}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">No tasks yet.</p>
                )}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5"
    >
      <Icon className="w-5 h-5 text-indigo-400 mb-3" />
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-slate-500 text-xs mt-1">{label}</div>
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-5">
      <h2 className="text-lg font-medium text-slate-100 mb-4">{title}</h2>
      {children}
    </div>
  );
}
