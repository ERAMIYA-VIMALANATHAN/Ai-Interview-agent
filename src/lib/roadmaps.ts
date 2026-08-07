export interface RoadmapPhase {
  name: string;
  weeks: string;
  tasks: string[];
}

export interface RoadmapTemplate {
  title: string;
  durationWeeks: number;
  phases: RoadmapPhase[];
}

export const ROADMAP_TEMPLATES: Record<string, RoadmapTemplate> = {
  'Amazon SDE': {
    title: 'Amazon SDE Preparation Roadmap',
    durationWeeks: 24,
    phases: [
      {
        name: 'Foundations',
        weeks: 'Weeks 1-4',
        tasks: [
          'Pick Java or Python and master syntax, OOP, collections, and exception handling.',
          'Solve 2 easy array/string problems daily on LeetCode.',
          'Learn time and space complexity analysis.',
          'Study Linked Lists, Stacks, Queues, and Hash Maps.',
        ],
      },
      {
        name: 'DSA Core',
        weeks: 'Weeks 5-10',
        tasks: [
          'Deep dive into Trees, BST, Heaps, Graphs, and Tries.',
          'Practice recursion, backtracking, and dynamic programming patterns.',
          'Solve 3 medium problems daily; review Amazon tagged questions.',
          'Learn sorting and searching algorithms thoroughly.',
        ],
      },
      {
        name: 'CS Fundamentals',
        weeks: 'Weeks 11-14',
        tasks: [
          'Study DBMS: SQL, normalization, indexing, transactions, and joins.',
          'Operating Systems: processes, threads, memory, scheduling, synchronization.',
          'Computer Networks: OSI model, TCP/IP, HTTP, DNS, and sockets.',
          'Object-Oriented Design and SOLID principles.',
        ],
      },
      {
        name: 'System Design',
        weeks: 'Weeks 15-18',
        tasks: [
          'Learn system design basics: scalability, load balancing, caching, databases.',
          'Design URL shortener, rate limiter, and key-value store.',
          'Study Amazon leadership principles and behavioral questions.',
          'Practice explaining trade-offs and high-level architecture.',
        ],
      },
      {
        name: 'Projects & Interview',
        weeks: 'Weeks 19-24',
        tasks: [
          'Build 2 strong projects: one full-stack and one scalable backend.',
          'Contribute to open source or write technical blogs.',
          'Mock interviews 3 times a week with STAR answers.',
          'Revise Amazon leadership principles with real examples.',
        ],
      },
    ],
  },
  'Google SWE': {
    title: 'Google Software Engineer Roadmap',
    durationWeeks: 28,
    phases: [
      { name: 'Language & Basics', weeks: 'Weeks 1-4', tasks: ['Master Python, Java, C++, or Go.', 'Arrays, strings, hash maps, and two-pointer techniques.', 'Big-O analysis and problem decomposition.'] },
      { name: 'Advanced DSA', weeks: 'Weeks 5-12', tasks: ['Graph algorithms, BFS/DFS, shortest paths.', 'Dynamic programming: memoization, tabulation, common patterns.', 'Trees, tries, heaps, segment trees.', 'Practice Google-tagged LeetCode problems.'] },
      { name: 'CS Subjects', weeks: 'Weeks 13-16', tasks: ['DBMS, OS, and Networks in depth.', 'Concurrency and distributed systems basics.'] },
      { name: 'System Design', weeks: 'Weeks 17-22', tasks: ['Design distributed systems and Google-scale problems.', 'CAP theorem, consensus, sharding, replication.', 'Mock system design rounds.'] },
      { name: 'Behavioral & Projects', weeks: 'Weeks 23-28', tasks: ['Prepare Googliness stories using STAR.', 'Build impactful projects.', 'Multiple mock interviews and code reviews.'] },
    ],
  },
  'Data Scientist': {
    title: 'Data Scientist Roadmap',
    durationWeeks: 20,
    phases: [
      { name: 'Math & Python', weeks: 'Weeks 1-3', tasks: ['Python, NumPy, Pandas, Matplotlib.', 'Statistics, probability, and linear algebra basics.'] },
      { name: 'Data Wrangling', weeks: 'Weeks 4-6', tasks: ['Data cleaning, EDA, feature engineering.', 'SQL for data extraction.'] },
      { name: 'Machine Learning', weeks: 'Weeks 7-12', tasks: ['Supervised and unsupervised algorithms.', 'Model evaluation, cross-validation, hyperparameter tuning.', 'Scikit-learn and introductory XGBoost.'] },
      { name: 'Deep Learning & NLP', weeks: 'Weeks 13-16', tasks: ['Neural networks, CNNs, RNNs, transformers.', 'NLP basics with Hugging Face.'] },
      { name: 'Portfolio', weeks: 'Weeks 17-20', tasks: ['Build 3 end-to-end projects.', 'Deploy models with Flask/Streamlit.', 'Kaggle competitions and GitHub portfolio.'] },
    ],
  },
  'AI/ML Engineer': {
    title: 'AI/ML Engineer Roadmap',
    durationWeeks: 24,
    phases: [
      { name: 'Foundations', weeks: 'Weeks 1-4', tasks: ['Python, linear algebra, calculus, probability.', 'NumPy, Pandas, data visualization.'] },
      { name: 'ML Core', weeks: 'Weeks 5-10', tasks: ['Regression, classification, clustering.', 'Feature engineering, model selection, pipelines.', 'TensorFlow or PyTorch basics.'] },
      { name: 'Deep Learning', weeks: 'Weeks 11-16', tasks: ['Neural networks, CNN, RNN, LSTM, attention.', 'Transfer learning and fine-tuning.', 'Build image and text classifiers.'] },
      { name: 'MLOps', weeks: 'Weeks 17-20', tasks: ['Model deployment with FastAPI/Flask.', 'Docker, experiment tracking, monitoring.', 'Vector databases and LLM apps.'] },
      { name: 'Projects', weeks: 'Weeks 21-24', tasks: ['End-to-end ML project on cloud.', 'Open-source contribution.', 'Publish blogs or notebooks.'] },
    ],
  },
  'Cybersecurity Engineer': {
    title: 'Cybersecurity Engineer Roadmap',
    durationWeeks: 20,
    phases: [
      { name: 'Networking & OS', weeks: 'Weeks 1-4', tasks: ['TCP/IP, DNS, HTTP, routing, switching.', 'Linux administration and command line.'] },
      { name: 'Security Fundamentals', weeks: 'Weeks 5-8', tasks: ['Cryptography, authentication, access control.', 'Threats, vulnerabilities, and risk management.'] },
      { name: 'Offensive & Defensive', weeks: 'Weeks 9-14', tasks: ['Penetration testing basics, OWASP Top 10.', 'SIEM, incident response, forensics introduction.', 'TryHackMe and Hack The Box labs.'] },
      { name: 'Cloud & Certifications', weeks: 'Weeks 15-18', tasks: ['Cloud security basics: AWS/Azure/GCP.', 'CompTIA Security+ or CEH preparation.'] },
      { name: 'Practical Experience', weeks: 'Weeks 19-20', tasks: ['Build a home lab.', 'Bug bounty or CTF participation.', 'Document findings and build a portfolio.'] },
    ],
  },
  'Cloud Engineer': {
    title: 'Cloud Engineer Roadmap',
    durationWeeks: 20,
    phases: [
      { name: 'Basics', weeks: 'Weeks 1-3', tasks: ['Linux, networking, and scripting (Bash/Python).', 'Git and CI/CD concepts.'] },
      { name: 'Core Cloud', weeks: 'Weeks 4-9', tasks: ['Choose AWS/Azure/GCP and learn core services.', 'Compute, storage, networking, IAM, and databases.', 'Infrastructure as Code with Terraform.'] },
      { name: 'DevOps & Containers', weeks: 'Weeks 10-14', tasks: ['Docker, Kubernetes, Helm.', 'CI/CD pipelines with GitHub Actions or Jenkins.', 'Monitoring with Prometheus/Grafana.'] },
      { name: 'Certifications', weeks: 'Weeks 15-18', tasks: ['Prepare for AWS Solutions Architect or Azure Administrator.', 'Practice exam questions and labs.'] },
      { name: 'Projects', weeks: 'Weeks 19-20', tasks: ['Deploy scalable app on cloud.', 'Set up CI/CD, monitoring, and cost optimization.'] },
    ],
  },
  'Software Engineer': {
    title: 'Software Engineer Roadmap',
    durationWeeks: 24,
    phases: [
      { name: 'Programming Basics', weeks: 'Weeks 1-5', tasks: ['Learn a language deeply: Java/Python/C++.', 'Data structures: arrays, linked lists, stacks, queues, hash maps.', 'Basic problem solving on LeetCode.'] },
      { name: 'Intermediate DSA', weeks: 'Weeks 6-12', tasks: ['Trees, graphs, recursion, backtracking, DP.', 'Solve medium problems daily.', 'Participate in coding contests.'] },
      { name: 'CS Fundamentals', weeks: 'Weeks 13-16', tasks: ['DBMS, OS, networks, and OOP design.', 'SQL practice and schema design.'] },
      { name: 'System Design', weeks: 'Weeks 17-20', tasks: ['High-level design fundamentals.', 'Design common systems and APIs.'] },
      { name: 'Projects & Interviews', weeks: 'Weeks 21-24', tasks: ['Build full-stack projects.', 'Behavioral interview prep.', 'Mock interviews and resume review.'] },
    ],
  },
};

export function roadmapToItems(template: RoadmapTemplate) {
  return template.phases.map((phase, index) => ({
    id: `phase-${index}`,
    title: phase.name,
    subtitle: phase.weeks,
    completed: false,
    tasks: phase.tasks.map((text: string) => ({ text, completed: false })),
  }));
}
