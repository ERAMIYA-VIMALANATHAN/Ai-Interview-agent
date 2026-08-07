export const COMPANY_INTEL_FALLBACK: Record<string, any> = {
  Amazon: {
    role: 'SDE',
    salary: '$110,000 - $140,000 base + stocks + signing bonus (US fresher range)',
    skills: ['Java/Python/C++', 'DSA', 'OOP', 'System Design', 'OS', 'DBMS', 'Networks'],
    process: 'Online Assessment, Technical Phone Screen, Onsite/Virtual Loop (4-5 interviews), Bar Raiser',
    rounds: ['Coding (2)', 'System Design', 'Behavioral/Leadership Principles', 'Bar Raiser'],
    growth: 'SDE I -> SDE II -> SDE III -> Principal Engineer',
  },
  Google: {
    role: 'Software Engineer',
    salary: '$130,000 - $170,000 base + equity + bonus (US fresher range)',
    skills: ['Python/Java/C++', 'DSA', 'Algorithms', 'System Design', 'Googliness'],
    process: 'Resume Screen, Online Assessment, Phone Screen, Onsite (4-5 rounds), Hiring Committee',
    rounds: ['Coding (2)', 'System Design', 'Behavioral/Googliness', 'Potentially domain-specific'],
    growth: 'L3 -> L4 -> L5 -> Staff -> Senior Staff -> Principal',
  },
  Microsoft: {
    role: 'Software Engineer',
    salary: '$110,000 - $145,000 base + stocks + bonus (US fresher range)',
    skills: ['C# / C++ / Java', 'DSA', 'OOP', 'System Design', 'Azure basics'],
    process: 'Online Assessment, Phone Screen, Onsite (4 rounds)',
    rounds: ['Coding', 'System Design', 'Behavioral', 'Hiring Manager'],
    growth: 'SDE -> SDE II -> Senior SDE -> Principal -> Partner',
  },
  NVIDIA: {
    role: 'AI Engineer / Deep Learning Engineer',
    salary: '$120,000 - $160,000 base + equity (US fresher range)',
    skills: ['Python', 'PyTorch/TensorFlow', 'CUDA', 'Linear Algebra', 'Deep Learning', 'C++'],
    process: 'Resume Screen, Coding/ML Assessment, Technical Interviews, Hiring Manager',
    rounds: ['Coding', 'Machine Learning/Deep Learning', 'System Design for ML', 'Behavioral'],
    growth: 'Engineer -> Senior Engineer -> Principal Engineer -> Distinguished Engineer',
  },
};

export async function fetchCompanyIntel(company: string, role?: string) {
  try {
    const query = `${company} ${role || 'software engineer'} fresher salary interview process`;
    const res = await fetch(`/api/company-search?${new URLSearchParams({ query, company, role: role || '' })}`);
    if (!res.ok) throw new Error('Search failed');
    const data = await res.json();
    return data;
  } catch (e) {
    return { results: null, fallback: COMPANY_INTEL_FALLBACK[company] || null };
  }
}
