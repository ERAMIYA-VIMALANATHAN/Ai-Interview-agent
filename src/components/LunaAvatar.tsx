import { motion } from 'framer-motion';

interface Props {
  state?: 'idle' | 'listening' | 'speaking' | 'thinking';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-24 h-24',
  lg: 'w-40 h-40',
  xl: 'w-56 h-56',
};

const ringSizes = {
  sm: 'w-16 h-16',
  md: 'w-32 h-32',
  lg: 'w-52 h-52',
  xl: 'w-72 h-72',
};

export default function LunaAvatar({ state = 'idle', size = 'md' }: Props) {
  const isActive = state === 'listening' || state === 'speaking';

  return (
    <div className="relative flex items-center justify-center">
      {isActive && (
        <>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 ${ringSizes[size]}`}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 ${ringSizes[size]}`}
          />
        </>
      )}
      <motion.div
        animate={state === 'thinking' ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`relative rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl flex items-center justify-center overflow-hidden ${sizeClasses[size]}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10" />
        <div className="relative flex flex-col items-center justify-center gap-2">
          <div className="flex gap-3">
            <motion.div
              animate={state === 'listening' ? { scaleY: [1, 2, 1] } : {}}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-cyan-400"
            />
            <motion.div
              animate={state === 'speaking' ? { scaleY: [1, 2.5, 1] } : {}}
              transition={{ duration: 0.4, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-indigo-400"
            />
            <motion.div
              animate={state === 'listening' ? { scaleY: [1, 2, 1] } : {}}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-violet-400"
            />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Luna</span>
        </div>
      </motion.div>
    </div>
  );
}
