import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { createVoiceController, LANGUAGES, type LanguageCode } from '../lib/voice';
import { generateResponse, type LunaContext } from '../lib/aiEngine';
import LunaAvatar from './LunaAvatar';

interface Props {
  onResponse?: (text: string, action?: string, data?: any, updatedContext?: LunaContext) => void;
  context?: LunaContext;
  onContextChange?: (ctx: LunaContext) => void;
  compact?: boolean;
}

export default function VoiceOrb({ onResponse, context, onContextChange, compact = false }: Props) {
  const [state, setState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [language, setLanguage] = useState<LanguageCode>(context?.language || 'en-US');
  const [muted, setMuted] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const voiceRef = useRef(createVoiceController(language));
  const transcriptRef = useRef('');

  useEffect(() => {
    voiceRef.current.setLanguage(language);
  }, [language]);

  useEffect(() => {
    if (context?.language && context.language !== language) {
      setLanguage(context.language);
    }
  }, [context?.language]);

  const handleListen = () => {
    if (state === 'listening') {
      voiceRef.current.stopListening();
      setState('idle');
      return;
    }
    transcriptRef.current = '';
    setState('listening');
    voiceRef.current.listen(
      (text) => {
        transcriptRef.current = text;
        handleUserInput(text);
      },
      () => {
        if (!transcriptRef.current) setState('idle');
      }
    );
  };

  const handleUserInput = (text: string) => {
    voiceRef.current.stopListening();
    setState('thinking');
    const ctx = context || { language };
    const result = generateResponse(text, ctx);

    setTimeout(() => {
      setState('speaking');
      if (!muted) voiceRef.current.speak(result.text);
      if (onResponse) onResponse(result.text, result.action, result.data, result.context);
      if (onContextChange) onContextChange(result.context);
      if (result.context.language !== language) setLanguage(result.context.language);

      const duration = Math.max(2000, Math.min(8000, result.text.length * 60));
      setTimeout(() => setState('idle'), duration);
    }, 600);
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('textInput') as HTMLInputElement;
    if (!input.value.trim()) return;
    handleUserInput(input.value.trim());
    input.value = '';
  };

  return (
    <div className={`flex flex-col items-center ${compact ? 'gap-4' : 'gap-6'}`}>
      <div className="relative">
        <LunaAvatar state={state} size={compact ? 'md' : 'lg'} />
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-700/50 text-slate-300 text-xs px-3 py-1 rounded-full whitespace-nowrap"
          >
            {state === 'idle' && 'Tap to speak'}
            {state === 'listening' && 'Listening...'}
            {state === 'thinking' && 'Thinking...'}
            {state === 'speaking' && 'Speaking...'}
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleListen}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
            state === 'listening'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse'
              : 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white hover:from-indigo-400 hover:to-violet-500'
          }`}
        >
          {state === 'listening' ? <Square className="w-5 h-5" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={() => setMuted(!muted)}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
            muted ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-slate-800 text-cyan-400 border-slate-700 hover:border-cyan-400/50'
          }`}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowLang(!showLang)}
            className="h-10 px-3 rounded-full border border-slate-700 bg-slate-800 text-slate-300 text-sm hover:border-indigo-500/50 transition-colors"
          >
            {LANGUAGES.find((l) => l.code === language)?.label}
          </button>
          {showLang && (
            <div className="absolute top-12 right-0 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-2 z-20 w-40">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    if (onContextChange) onContextChange({ ...(context || { language }), language: l.code });
                    setShowLang(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${language === l.code ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  {l.labelNative} <span className="text-slate-500">({l.label})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleTextSubmit} className="w-full max-w-md flex gap-2">
        <input
          name="textInput"
          type="text"
          placeholder="Type to Luna..."
          className="flex-1 bg-slate-900/80 border border-slate-700 rounded-full px-5 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-full bg-slate-800 text-slate-200 text-sm border border-slate-700 hover:border-indigo-500/50 transition-colors"
        >
          Send
        </button>
      </form>

      {state === 'listening' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-slate-400"
        >
          Speak now in {LANGUAGES.find((l) => l.code === language)?.label}
        </motion.div>
      )}
    </div>
  );
}
