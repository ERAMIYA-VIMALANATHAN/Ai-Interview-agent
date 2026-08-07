export type LanguageCode = 'en-US' | 'hi-IN' | 'ta-IN' | 'te-IN' | 'ml-IN' | 'kn-IN';

export const LANGUAGES: { code: LanguageCode; label: string; labelNative: string }[] = [
  { code: 'en-US', label: 'English', labelNative: 'English' },
  { code: 'hi-IN', label: 'Hindi', labelNative: 'हिन्दी' },
  { code: 'ta-IN', label: 'Tamil', labelNative: 'தமிழ்' },
  { code: 'te-IN', label: 'Telugu', labelNative: 'తెలుగు' },
  { code: 'ml-IN', label: 'Malayalam', labelNative: 'മലയാളം' },
  { code: 'kn-IN', label: 'Kannada', labelNative: 'ಕನ್ನಡ' },
];

export interface VoiceController {
  listen: (onResult: (text: string) => void, onEnd?: () => void) => void;
  stopListening: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSupported: boolean;
  setLanguage: (code: LanguageCode) => void;
}

export function createVoiceController(initialLang: LanguageCode = 'en-US'): VoiceController {
  const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const synth = window.speechSynthesis;
  let recognition: any = null;
  let currentLang = initialLang;

  const isSupported = !!(SpeechRecognitionAPI && synth);

  const setLanguage = (code: LanguageCode) => {
    currentLang = code;
    if (recognition) recognition.lang = code;
  };

  const listen = (onResult: (text: string) => void, onEnd?: () => void) => {
    if (!SpeechRecognitionAPI) return;
    try {
      recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLang;
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };
      recognition.onerror = () => {
        if (onEnd) onEnd();
      };
      recognition.onend = () => {
        if (onEnd) onEnd();
      };
      recognition.start();
    } catch (e) {
      console.error('Speech recognition error', e);
      if (onEnd) onEnd();
    }
  };

  const stopListening = () => {
    if (recognition) {
      try { recognition.stop(); } catch {}
      recognition = null;
    }
  };

  const speak = (text: string) => {
    if (!synth) return;
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang;
    utterance.rate = 1;
    utterance.pitch = 1.05;
    const voices = synth.getVoices();
    const preferred = voices.find((v) => v.lang.startsWith(currentLang.split('-')[0]));
    if (preferred) utterance.voice = preferred;
    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth) synth.cancel();
  };

  return { listen, stopListening, speak, stopSpeaking, isSupported, setLanguage };
}
