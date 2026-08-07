export interface FocusGame {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const FOCUS_GAMES: FocusGame[] = [
  {
    id: 'memory',
    title: 'Data Structure Recall',
    description: 'Name as many data structures as you can in 30 seconds.',
    content: 'Array, Linked List, Stack, Queue, Hash Map, Set, Tree, BST, Heap, Graph, Trie, Segment Tree...',
  },
  {
    id: 'pattern',
    title: 'Pattern Recognition',
    description: 'Complete the sequence: 1, 1, 2, 3, 5, 8, ...',
    content: '13 (Fibonacci: each number is the sum of the two preceding ones).',
  },
  {
    id: 'logic',
    title: 'Logic Gate',
    description: 'What is the output of AND gate when both inputs are 1?',
    content: '1',
  },
  {
    id: 'big-o',
    title: 'Complexity Snap',
    description: 'What is the time complexity of finding an element in a balanced BST?',
    content: 'O(log n)',
  },
  {
    id: 'binary',
    title: 'Binary Convert',
    description: 'Convert binary 1010 to decimal.',
    content: '10',
  },
];

export const STRETCH_BREAKS = [
  'Stand up and reach for the sky for 10 seconds.',
  'Roll your shoulders backward 5 times, then forward 5 times.',
  'Look at something 20 feet away for 20 seconds.',
  'Do 5 neck stretches slowly and gently.',
  'Take 5 deep breaths, inhaling for 4 seconds and exhaling for 6.',
];

export function getRandomGame() {
  return FOCUS_GAMES[Math.floor(Math.random() * FOCUS_GAMES.length)];
}

export function getRandomStretch() {
  return STRETCH_BREAKS[Math.floor(Math.random() * STRETCH_BREAKS.length)];
}
