import type { LanguageCode } from './voice';
import { ROADMAP_TEMPLATES } from './roadmaps';
import { LEARNING_TOPICS, CODING_CHALLENGES } from './learningHub';
import { INTERVIEW_QUESTIONS } from './interviewEngine';

export interface LunaContext {
  lastTopic?: string;
  assessment?: {
    step: number;
    interests?: string;
    skills?: string;
    experience?: string;
    dreamCompanies?: string;
    goals?: string;
  };
  interview?: {
    type: string;
    company?: string | null;
    role?: string | null;
    questionIndex: number;
    answers: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    attempts?: number;
  };
  language: LanguageCode;
}

const CAREERS = [
  'Software Engineer',
  'AI/ML Engineer',
  'Data Scientist',
  'Data Analyst',
  'Cybersecurity Engineer',
  'Cloud Engineer',
  'Product Engineer',
  'Research Scientist',
];

const GREETINGS: Record<LanguageCode, string> = {
  'en-US': "Hi, I'm Luna, your AI career mentor. How can I guide your tech journey today?",
  'hi-IN': "नमस्ते, मैं लुना हूँ, आपकी AI कैरियर मेंटोर। आज मैं आपकी टेक यात्रा में कैसे मदद कर सकती हूं?",
  'ta-IN': "வணக்கம், என் பெயர் லுனா, உங்கள் AI கரியர் மேலாத்திப் பயன்றேற்றாளர். இன்று என் தெரியாவிய பயணத்தில் எங்கே உதவ முடியும்?",
  'te-IN': "నమస్తే, నేను లూనా, మీ మీరు AI కరియర్ మెంటార్. ఇరోజు నేను మీ టెక్ ప్రయాణాన్ని ఎలా సాగదీస్తాను?",
  'ml-IN': "നമസ്കാരം, ഞാൻ ലൂണാ ആണ്, നിങ്ങളുടെ AI കരിදർ മെൻടർcbൽ. ഇന്ന് എൻതാണ് നിങ്ങളെ ടെക്ക് മേഖലയത്തിലേക്ക് എന്നെ സഹായിക്കാൻ കഴിയും?",
  'kn-IN': "ನಮಸ್ಕಾರ, ನಾನು ಲೂನಾ, ನಿಮ್ಮ AI ಕ್ಯಾರಿಯರ್ ಮಂಟೋರ್. ಇಂದು ನಾನು ನಿಮ್ಮ ಟೆಕ್ ಪ್ರಯಾಣಾನ್ನು ಹೇಗೆ ಮಾರ್ಗದರಶನ ನಿಡಲು?",
};

const FAREWELLS: Record<LanguageCode, string> = {
  'en-US': "You're doing great. I'm here whenever you need me. Keep building!",
  'hi-IN': "आप बहुत अच्छा कर रहे हैं। जब भी आपको ज़रुरत हो, मैं यहाँ हूँ। निर्माण ज़ारी रखें!",
  'ta-IN': "நீங்கள் மிகவும் நன்றாக செய்கிறீர்கள். உங்களுக்கு என்ன தேவையோ என்னையோ இவிட்டால், நான் இருப்பேன்.",
  'te-IN': "మీరు చాలా బాగుననారు. మీకు ఎప్పుడైనా కావాలి, నేను ఇక్కడ ఉన్నాను. నిర్మాణాన్ని కొనసాగించండి!",
  'ml-IN': "നീങ്ങൻ വളരെ ഉണ്ട്. എന്നെ വേണമെങ്കിലും എന്ന് സമയം വർണ്ണു, ഞാൻ ഇവിടെ ഉംഡാവും.",
  'kn-IN': "ನೀವು ತುಂಬಾ ಚನ್ನಾಗಿ ಮಾಡುತ್ತಿದ್ದೀರಿ. ನಿಮ್ಮಗೆ ಎಂದಾದರು ಬೇಕು ಬರಬೇಕು, ನಾನು ಇಲ್ಲಿ ಇರುತ್ತೆನೆ. ನಿರ್ಮಿಸುತ ತನ್ನ ಉಲ್ಲಾಸೆಯನ್ನು ಮುಂದುವರಿಯರಿ!",
};

const TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  language_switched: {
    'en-US': "I've switched to English. How can I help?",
    'hi-IN': "मैंने हिन्दी में स्विच कर दिया है। मैं कैसे मदद कर सकता हूं?",
    'ta-IN': "என்னை தமிழில் மாற்றியுள்ளேன். எங்கே உதவ முடியும்?",
    'te-IN': "నేను తెలుగులోకి మార్చాను. నేను ఎలా సాగదీస్తాను?",
    'ml-IN': "ഞാൻ മലയാളത്തിലേക്ക് മാറിදിരിക്കുന്നു. എൻതാണ് സഹായിക്കാൻ?",
    'kn-IN': "ನಾನು ಕನ್ನಡಗೆ ಕ್ಯಾನ್ ಮಾಡಿದ್ದೇನೆ. ನಾನು ಹೇಗೆ ಎಂದు ಸಹಾಯ ಮಾಡಬಹುದು?",
  },
};

export function detectLanguageSwitch(input: string): LanguageCode | null {
  const lowered = input.toLowerCase();
  if (lowered.includes('tamil') || lowered.includes('தமிழ்') || lowered.includes('தமிழில்')) return 'ta-IN';
  if (lowered.includes('hindi') || lowered.includes('हिन्दी') || lowered.includes('हिन्दी‌में')) return 'hi-IN';
  if (lowered.includes('telugu') || lowered.includes('తెలుగు')) return 'te-IN';
  if (lowered.includes('malayalam') || lowered.includes('മലയാളം')) return 'ml-IN';
  if (lowered.includes('kannada') || lowered.includes('ಕನ್ನಡ')) return 'kn-IN';
  if (lowered.includes('english')) return 'en-US';
  return null;
}

export function detectIntent(input: string): string {
  const lowered = input.toLowerCase();
  if (/hi|hello|hey|namaste|vanakkam|namaskaram/.test(lowered)) return 'greeting';
  if (/assess|career match|which career|what job|suitable career|recommend career/.test(lowered)) return 'career_assessment';
  if (/roadmap|plan|prepare for|how to become|study plan|learning path/.test(lowered)) return 'roadmap';
  if (/salary|hiring|interview process|company|amazon|google|microsoft|nvidia/.test(lowered)) return 'company_info';
  if (/mock interview|interview me|ask me questions|practice interview/.test(lowered)) return 'mock_interview';
  if (/learn|tutorial|dsa|dbms|os|network|ai\/ml|concept|cheat sheet|notes/.test(lowered)) return 'learning';
  if (/focus|distracted|sleepy|tired|brain game|puzzle|challenge/.test(lowered)) return 'focus';
  if (/bye|goodbye|see you/.test(lowered)) return 'farewell';
  return 'unknown';
}

function extractCareer(input: string): string | null {
  for (const career of CAREERS) {
    if (input.toLowerCase().includes(career.toLowerCase()) || input.toLowerCase().includes(career.toLowerCase().replace(' engineer', ''))) {
      return career;
    }
  }
  return null;
}

function extractCompany(input: string): string | null {
  const companies = ['amazon', 'google', 'microsoft', 'nvidia', 'meta', 'apple', 'netflix', 'adobe', 'salesforce', 'oracle', 'ibm', 'intel', 'qualcomm'];
  for (const c of companies) {
    if (input.toLowerCase().includes(c)) return c.charAt(0).toUpperCase() + c.slice(1);
  }
  return null;
}

function extractRole(input: string): string | null {
  const roles = ['sde', 'software engineer', 'software developer', 'ai engineer', 'ml engineer', 'data scientist', 'data analyst', 'cloud engineer', 'cybersecurity', 'product engineer', 'research'];
  for (const r of roles) {
    if (input.toLowerCase().includes(r)) {
      if (r === 'sde') return 'Software Development Engineer';
      if (r === 'ai engineer' || r === 'ml engineer') return 'AI/ML Engineer';
      if (r === 'cybersecurity') return 'Cybersecurity Engineer';
      return r.charAt(0).toUpperCase() + r.slice(1);
    }
  }
  return null;
}

function matchRoadmapGoal(input: string): string {
  const goals = Object.keys(ROADMAP_TEMPLATES);
  for (const g of goals) {
    if (input.toLowerCase().includes(g.toLowerCase())) return g;
  }
  if (input.toLowerCase().includes('amazon') && input.toLowerCase().includes('sde')) return 'Amazon SDE';
  if (input.toLowerCase().includes('google')) return 'Google SWE';
  if (input.toLowerCase().includes('data scientist')) return 'Data Scientist';
  if (input.toLowerCase().includes('ai') || input.toLowerCase().includes('ml')) return 'AI/ML Engineer';
  if (input.toLowerCase().includes('cyber')) return 'Cybersecurity Engineer';
  return 'Software Engineer';
}

function recommendCareer(assessment: any): string {
  const txt = `${assessment.interests || ''} ${assessment.skills || ''} ${assessment.goals || ''}`.toLowerCase();
  if (/ai|machine learning|deep learning|nlp|model/.test(txt)) return 'AI/ML Engineer';
  if (/data|analytics|statistics|python|sql/.test(txt) && /science|scientist/.test(txt)) return 'Data Scientist';
  if (/data|sql|excel|tableau|power bi|analytics/.test(txt)) return 'Data Analyst';
  if (/security|hacking|network|firewall|pentest/.test(txt)) return 'Cybersecurity Engineer';
  if (/cloud|aws|azure|gcp|devops|kubernetes/.test(txt)) return 'Cloud Engineer';
  if (/research|phd|paper|algorithm/.test(txt)) return 'Research Scientist';
  if (/product|feature|ux|users/.test(txt)) return 'Product Engineer';
  return 'Software Engineer';
}

function careerReason(career: string, assessment: any): string {
  const reasons: Record<string, string> = {
    'Software Engineer': "You enjoy building products and solving problems with code. This role offers broad opportunities and strong foundational growth.",
    'AI/ML Engineer': "Your interest in algorithms, patterns, and intelligent systems aligns perfectly with AI/ML engineering.",
    'Data Scientist': "You like deriving insights from data and have analytical curiosity. Data Science blends statistics, coding, and business impact.",
    'Data Analyst': "You prefer working with data to drive decisions. This role is a great entry point into analytics and business intelligence.",
    'Cybersecurity Engineer': "Your mindset for defense, networks, and risk makes cybersecurity a natural fit.",
    'Cloud Engineer': "You are drawn to infrastructure, scalability, and modern deployment platforms.",
    'Product Engineer': "You combine technical skills with user empathy, ideal for building user-facing products end-to-end.",
    'Research Scientist': "You love exploring unknowns and advancing knowledge. Research roles suit deep thinkers.",
  };
  return reasons[career] || `${career} matches your stated interests and skills.`;
}

function answerLearningQuery(input: string): string {
  const lowered = input.toLowerCase();
  for (const topic of LEARNING_TOPICS) {
    if (lowered.includes(topic.id) || topic.keywords.some((k) => lowered.includes(k))) {
      return `${topic.title}: ${topic.summary}\n\nKey concepts: ${topic.concepts.join(', ')}.\n\nExample: ${topic.example}`;
    }
  }
  if (lowered.includes('challenge') || lowered.includes('coding')) {
    const challenge = CODING_CHALLENGES[Math.floor(Math.random() * CODING_CHALLENGES.length)];
    return `Try this challenge: ${challenge.title}\n${challenge.description}\nHint: ${challenge.hint}`;
  }
  return "I can teach DSA, DBMS, OS, Computer Networks, AI/ML, System Design, and more. Which topic would you like to explore?";
}

function startMockInterview(input: string): { type: string; company?: string | null; role?: string | null } {
  const lowered = input.toLowerCase();
  let type = 'technical';
  if (lowered.includes('hr')) type = 'hr';
  else if (lowered.includes('behavior')) type = 'behavioral';
  else if (lowered.includes('system design')) type = 'system_design';
  else if (lowered.includes('dsa')) type = 'dsa';
  else if (lowered.includes('ai') || lowered.includes('ml')) type = 'ai_ml';
  const company = extractCompany(input);
  const role = extractRole(input);
  return { type, company, role };
}

export function generateResponse(input: string, context: LunaContext): { text: string; context: LunaContext; action?: string; data?: any } {
  const langSwitch = detectLanguageSwitch(input);
  if (langSwitch) {
    const nextContext = { ...context, language: langSwitch };
    return { text: TRANSLATIONS.language_switched[langSwitch], context: nextContext };
  }

  const intent = detectIntent(input);
  const lang = context.language || 'en-US';

  if (intent === 'greeting') {
    return { text: GREETINGS[lang], context: { ...context, lastTopic: 'greeting' } };
  }

  if (intent === 'farewell') {
    return { text: FAREWELLS[lang], context: { ...context, lastTopic: 'farewell' } };
  }

  if (intent === 'career_assessment') {
    const assessment = context.assessment || { step: 0 };
    if (assessment.step === 0) {
      return {
        text: "Let's discover your ideal tech career. First, what are your main interests? For example: AI, web development, data, security, cloud, or product design.",
        context: { ...context, assessment: { ...assessment, step: 1 }, lastTopic: 'career_assessment' },
      };
    }
    if (assessment.step === 1) {
      return {
        text: "Got it. What programming skills do you already have? Mention languages, frameworks, or tools you're comfortable with.",
        context: { ...context, assessment: { ...assessment, interests: input, step: 2 }, lastTopic: 'career_assessment' },
      };
    }
    if (assessment.step === 2) {
      return {
        text: "Nice. How much experience do you have? Student, fresher, 1-2 years, or more?",
        context: { ...context, assessment: { ...assessment, skills: input, step: 3 }, lastTopic: 'career_assessment' },
      };
    }
    if (assessment.step === 3) {
      return {
        text: "Which companies do you dream of working at? For example: Google, Amazon, NVIDIA, Microsoft, or startups.",
        context: { ...context, assessment: { ...assessment, experience: input, step: 4 }, lastTopic: 'career_assessment' },
      };
    }
    if (assessment.step === 4) {
      const fullAssessment = { ...assessment, dreamCompanies: input, step: 5 };
      const career = recommendCareer(fullAssessment);
      const reason = careerReason(career, fullAssessment);
      return {
        text: `Based on your answers, I recommend: ${career}. ${reason}\n\nWould you like me to create a personalized roadmap for this career?`,
        context: { ...context, assessment: fullAssessment, lastTopic: 'career_recommendation' },
        action: 'career_recommendation',
        data: { career, assessment: fullAssessment },
      };
    }
    const career = extractCareer(input) || recommendCareer(assessment);
    return {
      text: `I recommend ${career}. ${careerReason(career, assessment)}. Say 'create roadmap for ${career}' to get started.`,
      context: { ...context, lastTopic: 'career_recommendation' },
      action: 'career_recommendation',
      data: { career, assessment },
    };
  }

  if (intent === 'roadmap') {
    const goal = matchRoadmapGoal(input);
    const template: import('./roadmaps').RoadmapTemplate = ROADMAP_TEMPLATES[goal] || ROADMAP_TEMPLATES['Software Engineer'];
    return {
      text: `Here is your ${template.title} roadmap (${template.durationWeeks} weeks). I have broken it into phases: ${template.phases.map((p) => p.name).join(', ')}. Open the Roadmap page to track your progress.`,
      context: { ...context, lastTopic: 'roadmap' },
      action: 'roadmap',
      data: template,
    };
  }

  if (intent === 'company_info') {
    const company = extractCompany(input);
    const role = extractRole(input);
    return {
      text: company
        ? `I'll fetch the latest intelligence for ${role || 'roles'} at ${company}. One moment.`
        : "Tell me a company and role, like 'Google software engineer fresher salary', and I'll gather real-world insights.",
      context: { ...context, lastTopic: 'company_info' },
      action: 'company_info',
      data: { company, role },
    };
  }

  if (intent === 'mock_interview') {
    const { type, company, role } = startMockInterview(input);
    const questionSet = INTERVIEW_QUESTIONS[type] || INTERVIEW_QUESTIONS.technical;
    const firstQuestion = questionSet[0];
    return {
      text: `Starting a ${type.replace('_', ' ')} interview${company ? ` for ${company}` : ''}${role ? ` (${role})` : ''}.\n\nQuestion 1: ${firstQuestion.question}`,
      context: { ...context, interview: { type, company, role, questionIndex: 0, answers: [], difficulty: 'medium', attempts: 0 }, lastTopic: 'mock_interview' },
      action: 'mock_interview_start',
      data: { type, company, role, question: firstQuestion },
    };
  }

  if (context.lastTopic === 'mock_interview' && context.interview) {
    const interview = context.interview;
    const questionSet = INTERVIEW_QUESTIONS[interview.type] || INTERVIEW_QUESTIONS.technical;
    const currentQuestion = questionSet[interview.questionIndex];
    
    const inputLower = input.toLowerCase();
    let matchedKeywords = 0;
    const requiredMatches = Math.max(1, Math.floor(currentQuestion.rubric.length / 2));
    
    currentQuestion.rubric.forEach(r => {
      const keywords = r.toLowerCase().split(' ').filter(w => w.length > 3);
      const isMatch = keywords.some(kw => inputLower.includes(kw));
      if (isMatch) matchedKeywords++;
    });

    const isCorrect = matchedKeywords >= requiredMatches;
    const attempts = (interview.attempts || 0) + 1;
    
    let text = '';
    let moveNext = false;
    let newAnswers = interview.answers;
    
    if (isCorrect) {
      text = `Good job. You covered the main points. Let's move on.`;
      moveNext = true;
      newAnswers = [...interview.answers, input];
    } else if (attempts === 1) {
      text = `That's not quite right. You missed some important concepts. Think about it carefully and try again. I'm not going to spoon-feed you the answer.`;
      moveNext = false;
    } else {
      const feedback = currentQuestion.rubric.reduce((acc: string, r: string) => `${acc}\n- ${r}`, 'The key points I was looking for are:');
      text = `You're still missing the core concepts. ${feedback}\n\nLet's move on to the next question. Make sure to review this topic later.`;
      moveNext = true;
      newAnswers = [...interview.answers, input];
    }

    if (moveNext) {
      const nextIndex = interview.questionIndex + 1;
      if (nextIndex >= questionSet.length) {
        const score = Math.min(100, 60 + newAnswers.length * 8);
        return {
          text: `${text}\n\nThat was the final question. Your estimated score is ${score}/100. Keep practicing structure and clarity.`,
          context: { ...context, interview: undefined, lastTopic: 'mock_interview_done' },
          action: 'mock_interview_done',
          data: { score, feedback: text, transcript: newAnswers },
        };
      }
      const nextQuestion = questionSet[nextIndex];
      return {
        text: `${text}\n\nQuestion ${nextIndex + 1}: ${nextQuestion.question}`,
        context: { ...context, interview: { ...interview, questionIndex: nextIndex, answers: newAnswers, attempts: 0 } },
        action: 'mock_interview_next',
        data: { question: nextQuestion },
      };
    } else {
      return {
        text,
        context: { ...context, interview: { ...interview, attempts } },
        action: 'mock_interview_retry',
        data: { question: currentQuestion },
      };
    }
  }

  if (intent === 'learning') {
    return {
      text: answerLearningQuery(input),
      context: { ...context, lastTopic: 'learning' },
      action: 'learning',
    };
  }

  if (intent === 'focus') {
    return {
      text: "Feeling distracted? Let's refocus. I can give you a 2-minute coding puzzle, a brain game, or a quick stretch break. Which would you like?",
      context: { ...context, lastTopic: 'focus' },
      action: 'focus',
    };
  }

  if (context.lastTopic === 'focus') {
    const lowered = input.toLowerCase();
    if (lowered.includes('puzzle') || lowered.includes('coding')) {
      const challenge = CODING_CHALLENGES[Math.floor(Math.random() * CODING_CHALLENGES.length)];
      return {
        text: `Focus challenge: ${challenge.title}\n${challenge.description}\nHint: ${challenge.hint}`,
        context: { ...context, lastTopic: 'focus_puzzle' },
      };
    }
    if (lowered.includes('stretch') || lowered.includes('break')) {
      return {
        text: "Take a 2-minute break. Stand up, roll your shoulders, drink water, and look 20 feet away for 20 seconds. Your brain will thank you.",
        context: { ...context, lastTopic: 'focus_break' },
      };
    }
    if (lowered.includes('game')) {
      return {
        text: "Brain game: Name 5 data structures in 15 seconds. Ready? Go!\n(Array, Linked List, Stack, Queue, Hash Map)",
        context: { ...context, lastTopic: 'focus_game' },
      };
    }
  }

  return {
    text: "I'm here to help with career guidance, roadmaps, mock interviews, company insights, and learning. You can also talk to me in English, Hindi, Tamil, Telugu, Malayalam, or Kannada.",
    context: { ...context, lastTopic: 'unknown' },
  };
}

export { CAREERS, recommendCareer };
