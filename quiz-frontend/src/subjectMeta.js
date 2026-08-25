export const SUBJECT_META = {
  Aptitude: { icon: '🧠', accent: '#f59e0b', tagline: 'Numbers, series & reasoning' },
  DBMS: { icon: '🗄️', accent: '#22d3ee', tagline: 'SQL, transactions & keys' },
  OS: { icon: '🖥️', accent: '#a78bfa', tagline: 'Processes, memory & deadlock' },
  CN: { icon: '🌐', accent: '#34d399', tagline: 'TCP/IP, OSI & protocols' },
  OOPS: { icon: '🧩', accent: '#fb7185', tagline: 'Classes, objects & polymorphism' },
}

export function subjectMeta(category) {
  return SUBJECT_META[category] || { icon: '📘', accent: '#6366f1', tagline: 'Test your knowledge' }
}
