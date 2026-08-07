import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Loader2, DollarSign, Briefcase, ListChecks, TrendingUp } from 'lucide-react';
import Layout from '../components/Layout';
import { COMPANY_INTEL_FALLBACK, fetchCompanyIntel } from '../lib/companyIntel';

export default function CompanyIntel() {
  const [company, setCompany] = useState('Amazon');
  const [role, setRole] = useState('SDE');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchCompanyIntel(company, role);
    setResult(data);
    setLoading(false);
  };

  const fallback = COMPANY_INTEL_FALLBACK[company] || COMPANY_INTEL_FALLBACK.Amazon;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white flex items-center justify-center gap-2">
            <Building2 className="w-7 h-7 text-indigo-400" />
            Real-Time Company Intelligence
          </h1>
          <p className="text-slate-400 mt-2">Get updated salary ranges, hiring processes, and interview insights.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (e.g. Amazon)"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/60"
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role (e.g. SDE)"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/60"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Search
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-medium text-white mb-6">{company} &bull; {role}</h2>

            {result.results && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Latest Web Results</h3>
                <div className="space-y-3">
                  {result.results.slice(0, 3).map((item: any, i: number) => (
                    <a key={i} href={item.link} target="_blank" rel="noreferrer" className="block p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-indigo-500/40 transition-colors">
                      <div className="text-indigo-300 font-medium text-sm">{item.title}</div>
                      <p className="text-slate-400 text-sm mt-1">{item.snippet}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard icon={DollarSign} title="Fresher Salary Range" value={fallback.salary} />
              <InfoCard icon={Briefcase} title="Required Skills" value={fallback.skills.join(', ')} />
              <InfoCard icon={ListChecks} title="Hiring Process" value={fallback.process} />
              <InfoCard icon={TrendingUp} title="Career Growth" value={fallback.growth} />
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Interview Rounds</h3>
              <div className="flex flex-wrap gap-2">
                {fallback.rounds.map((r: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-sm border border-indigo-500/20">{r}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

function InfoCard({ icon: Icon, title, value }: { icon: any; title: string; value: string }) {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-indigo-400" />
        <h3 className="text-slate-400 text-sm">{title}</h3>
      </div>
      <p className="text-slate-200 text-sm leading-relaxed">{value}</p>
    </div>
  );
}
