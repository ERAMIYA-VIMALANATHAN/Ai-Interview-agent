export interface LearningTopic {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  summary: string;
  concepts: string[];
  example: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  hint: string;
}

export const LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    category: 'Core CS',
    keywords: ['array', 'linked list', 'tree', 'graph', 'sorting', 'searching', 'dsa'],
    summary: 'DSA is the foundation of problem solving in computer science. It helps you organize data efficiently and solve problems with optimal time and space complexity.',
    concepts: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & BST', 'Graphs', 'Dynamic Programming', 'Greedy Algorithms', 'Sorting & Searching'],
    example: 'To find an element in a sorted array, binary search reduces time from O(n) to O(log n) by halving the search space each step.',
  },
  {
    id: 'dbms',
    title: 'Database Management Systems',
    category: 'Core CS',
    keywords: ['dbms', 'sql', 'database', 'normalization', 'indexing', 'transaction'],
    summary: 'DBMS manages how data is stored, retrieved, and manipulated. Relational databases use tables, SQL, and ACID properties to ensure reliable data operations.',
    concepts: ['SQL Queries', 'Normalization', 'Indexing', 'Transactions & ACID', 'Joins', 'ER Diagrams', 'Concurrency Control'],
    example: 'An index on a user_email column makes login lookups nearly instant instead of scanning the entire table.',
  },
  {
    id: 'os',
    title: 'Operating Systems',
    category: 'Core CS',
    keywords: ['os', 'process', 'thread', 'memory', 'scheduling', 'deadlock'],
    summary: 'Operating systems manage hardware resources and provide services to applications. Understanding OS helps you write efficient and concurrent programs.',
    concepts: ['Processes & Threads', 'CPU Scheduling', 'Memory Management', 'Virtual Memory', 'File Systems', 'Deadlocks', 'Synchronization'],
    example: 'A web browser uses multiple processes so that if one tab crashes, the entire browser does not go down.',
  },
  {
    id: 'networks',
    title: 'Computer Networks',
    category: 'Core CS',
    keywords: ['network', 'tcp', 'ip', 'http', 'dns', 'osi'],
    summary: 'Networks connect devices and enable communication. Protocols like TCP/IP and HTTP power the internet and distributed applications.',
    concepts: ['OSI & TCP/IP Models', 'HTTP/HTTPS', 'DNS', 'TCP vs UDP', 'Routing & Switching', 'Sockets', 'Load Balancing'],
    example: 'When you type google.com, DNS resolves the domain to an IP address, then HTTP sends a request to fetch the page.',
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    category: 'Emerging Tech',
    keywords: ['ai', 'ml', 'machine learning', 'neural network', 'model'],
    summary: 'Machine learning enables systems to learn patterns from data and make predictions. AI/ML powers search, recommendations, language models, and computer vision.',
    concepts: ['Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Model Evaluation', 'Feature Engineering', 'Transformers', 'LLMs'],
    example: 'A spam filter is trained on labeled emails to classify new messages as spam or not spam.',
  },
  {
    id: 'system-design',
    title: 'System Design',
    category: 'Advanced',
    keywords: ['system design', 'scalability', 'microservices', 'load balancer', 'cache'],
    summary: 'System design is about architecting scalable, reliable, and maintainable software systems for real-world products.',
    concepts: ['Scalability', 'Load Balancing', 'Caching', 'Databases & Sharding', 'Microservices', 'Message Queues', 'CAP Theorem'],
    example: 'Designing Twitter involves feeds, tweets, followers, and timelines, requiring efficient reads and writes at massive scale.',
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    category: 'Programming',
    keywords: ['oop', 'object oriented', 'class', 'inheritance', 'polymorphism'],
    summary: 'OOP organizes code into objects that combine data and behavior. It promotes reuse, modularity, and maintainability.',
    concepts: ['Classes & Objects', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction', 'SOLID Principles'],
    example: 'A Vehicle superclass can have Car and Bike subclasses, each overriding the drive method differently.',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Programming',
    keywords: ['web', 'html', 'css', 'javascript', 'react', 'frontend', 'backend'],
    summary: 'Web development builds applications that run in browsers. It spans frontend interfaces, backend APIs, databases, and deployment.',
    concepts: ['HTML/CSS/JS', 'React/Vue/Angular', 'REST APIs', 'Node.js', 'Databases', 'Authentication', 'Deployment'],
    example: 'A todo app uses React for the UI, a Node API for logic, and a database to persist tasks across sessions.',
  },
];

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers and a target, return indices of two numbers that add up to the target.',
    hint: 'Use a hash map to store seen values and check for complement in one pass.',
  },
  {
    id: '2',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    description: 'Reverse a singly linked list iteratively.',
    hint: 'Track previous, current, and next pointers while iterating.',
  },
  {
    id: '3',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string of brackets, determine if it is valid.',
    hint: 'Use a stack to match opening and closing brackets.',
  },
  {
    id: '4',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: 'Merge all overlapping intervals in a list.',
    hint: 'Sort by start time, then iterate and merge when overlapping.',
  },
  {
    id: '5',
    title: 'LRU Cache',
    difficulty: 'Medium',
    description: 'Design a Least Recently Used cache with O(1) get and put operations.',
    hint: 'Combine a hash map with a doubly linked list.',
  },
  {
    id: '6',
    title: 'Word Break',
    difficulty: 'Medium',
    description: 'Determine if a string can be segmented into dictionary words.',
    hint: 'Use dynamic programming: dp[i] means s[0:i] can be segmented.',
  },
];

export const INTERVIEW_CHEAT_SHEETS = [
  {
    title: 'Amazon Leadership Principles',
    points: ['Customer Obsession', 'Ownership', 'Invent and Simplify', 'Are Right, A Lot', 'Learn and Be Curious', 'Hire and Develop the Best', 'Insist on the Highest Standards', 'Think Big', 'Bias for Action', 'Frugality', 'Earn Trust', 'Dive Deep', 'Have Backbone; Disagree and Commit', 'Deliver Results'],
  },
  {
    title: 'STAR Method',
    points: ['Situation: Set the context.', 'Task: Describe your responsibility.', 'Action: Explain what you did.', 'Result: Share the outcome with metrics.'],
  },
  {
    title: 'Big-O Complexity',
    points: ['O(1) - constant time', 'O(log n) - logarithmic', 'O(n) - linear', 'O(n log n) - linearithmic', 'O(n^2) - quadratic', 'O(2^n) - exponential'],
  },
];
