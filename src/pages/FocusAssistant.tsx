import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Gamepad2, Dumbbell, Brain, Coffee } from 'lucide-react';
import Layout from '../components/Layout';
import { getRandomGame, getRandomStretch } from '../lib/focusGames';

export default function FocusAssistant() {
  const [mode, setMode] = useState<'menu' | 'game' | 'stretch' | 'camera'>('menu');
  const [game, setGame] = useState(getRandomGame());
  const [stretch, setStretch] = useState(getRandomStretch());
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (cameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(() => setCameraOn(false));
    } else if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  }, [cameraOn]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white flex items-center justify-center gap-2">
            <Target className="w-7 h-7 text-indigo-400" />
            Smart Focus Assistant
          </h1>
          <p className="text-slate-400 mt-2">Beat distraction, recharge, and stay productive with Luna.</p>
        </div>

        {mode === 'menu' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FocusCard
              icon={Brain}
              title="Brain Game"
              desc="Quick recall and logic puzzles"
              onClick={() => { setGame(getRandomGame()); setMode('game'); }}
            />
            <FocusCard
              icon={Dumbbell}
              title="Stretch Break"
              desc="Recharge with a quick movement"
              onClick={() => { setStretch(getRandomStretch()); setMode('stretch'); }}
            />
            <FocusCard
              icon={Gamepad2}
              title="Coding Puzzle"
              desc="Solve a mini challenge"
              onClick={() => { setGame(getRandomGame()); setMode('game'); }}
            />
            <FocusCard
              icon={Coffee}
              title="Focus Camera"
              desc="Enable webcam mirror (permission required)"
              onClick={() => { setCameraOn(true); setMode('camera'); }}
            />
          </div>
        )}

        {mode === 'game' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 text-center"
          >
            <Brain className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-white mb-2">{game.title}</h2>
            <p className="text-slate-400 mb-6">{game.description}</p>
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 mb-6">
              <p className="text-slate-300 text-lg">{game.content}</p>
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={() => { setGame(getRandomGame()); }} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm transition-colors">Next Challenge</button>
              <button onClick={() => setMode('menu')} className="px-5 py-2.5 border border-slate-700 text-slate-300 rounded-xl text-sm hover:border-indigo-500/50 transition-colors">Back</button>
            </div>
          </motion.div>
        )}

        {mode === 'stretch' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 text-center"
          >
            <Dumbbell className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-white mb-6">Stretch Break</h2>
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 mb-6">
              <p className="text-slate-300 text-lg">{stretch}</p>
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={() => { setStretch(getRandomStretch()); }} className="px-5 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded-xl text-sm transition-colors">Next Stretch</button>
              <button onClick={() => setMode('menu')} className="px-5 py-2.5 border border-slate-700 text-slate-300 rounded-xl text-sm hover:border-indigo-500/50 transition-colors">Back</button>
            </div>
          </motion.div>
        )}

        {mode === 'camera' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 text-center"
          >
            <h2 className="text-2xl font-medium text-white mb-2">Focus Camera</h2>
            <p className="text-slate-400 text-sm mb-6">This mirror helps you stay aware of your posture. Data never leaves your device.</p>
            <div className="max-w-md mx-auto aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 mb-6">
              {cameraOn ? <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-slate-600">Camera off</div>}
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setCameraOn(!cameraOn)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm transition-colors"
              >
                {cameraOn ? 'Stop Camera' : 'Start Camera'}
              </button>
              <button onClick={() => { setCameraOn(false); setMode('menu'); }} className="px-5 py-2.5 border border-slate-700 text-slate-300 rounded-xl text-sm hover:border-indigo-500/50 transition-colors">Back</button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

function FocusCard({ icon: Icon, title, desc, onClick }: { icon: any; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900 text-left transition-all group"
    >
      <Icon className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-slate-100 font-medium mb-1">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
    </button>
  );
}
