export interface InterviewQuestion {
  question: string;
  rubric: string[];
}

export const INTERVIEW_QUESTIONS: Record<string, InterviewQuestion[]> = {
  technical: [
    { question: 'Explain the difference between a process and a thread.', rubric: ['Mentions memory isolation', 'Shares resources within a process', 'Gives real example like browser tabs'] },
    { question: 'What is the time complexity of binary search and when can you use it?', rubric: ['States O(log n)', 'Requires sorted input', 'Explains divide and conquer'] },
    { question: 'Describe REST API principles.', rubric: ['Statelessness', 'HTTP methods', 'Resource-based URLs'] },
  ],
  dsa: [
    { question: 'Given a sorted array, find the first and last position of a target value.', rubric: ['Uses binary search twice', 'O(log n) solution', 'Handles edge cases'] },
    { question: 'Detect a cycle in a linked list.', rubric: ['Floyd cycle detection', 'O(n) time and O(1) space', 'Explains slow and fast pointers'] },
    { question: 'Find the longest substring without repeating characters.', rubric: ['Sliding window approach', 'O(n) time', 'Uses hash set or map'] },
  ],
  system_design: [
    { question: 'Design a URL shortener like bit.ly.', rubric: ['Estimates scale', 'Hashing or base62 encoding', 'Database choice and trade-offs'] },
    { question: 'Design a rate limiter.', rubric: ['Token bucket or sliding window', 'Distributed considerations', 'Trade-offs'] },
    { question: 'How would you design Twitter feeds?', rubric: ['Push vs pull model', 'Fan-out service', 'Caching strategy'] },
  ],
  hr: [
    { question: 'Tell me about yourself.', rubric: ['Concise and relevant', 'Connects to role', 'Shows enthusiasm'] },
    { question: 'Why do you want to join this company?', rubric: ['Research-based answer', 'Aligns values', 'Specific growth interest'] },
    { question: 'Where do you see yourself in five years?', rubric: ['Realistic ambition', 'Technical growth', 'Leadership interest'] },
  ],
  behavioral: [
    { question: 'Describe a time you faced a tight deadline.', rubric: ['STAR structure', 'Ownership and prioritization', 'Quantified result'] },
    { question: 'Tell me about a conflict with a teammate.', rubric: ['Professional resolution', 'Empathy and communication', 'Outcome focused'] },
    { question: 'Share a failure and what you learned.', rubric: ['Honest reflection', 'Growth mindset', 'Actionable changes'] },
  ],
  ai_ml: [
    { question: 'Explain the bias-variance tradeoff.', rubric: ['Defines bias and variance', 'Explains overfitting/underfitting', 'Mentions model complexity'] },
    { question: 'What is gradient descent?', rubric: ['Optimization algorithm', 'Learning rate', 'Steps toward minima'] },
    { question: 'How would you evaluate a classification model?', rubric: ['Accuracy, precision, recall, F1', 'ROC-AUC', 'Class imbalance consideration'] },
  ],
};

export const INTERVIEW_TYPES = [
  { id: 'technical', label: 'Technical' },
  { id: 'dsa', label: 'DSA Coding' },
  { id: 'system_design', label: 'System Design' },
  { id: 'hr', label: 'HR' },
  { id: 'behavioral', label: 'Behavioral' },
  { id: 'ai_ml', label: 'AI/ML' },
];
