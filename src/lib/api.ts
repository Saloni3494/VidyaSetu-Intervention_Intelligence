const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function fetchStudents() {
  const res = await fetch(`${API_BASE}/students`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

export async function fetchStudentById(id: string) {
  const res = await fetch(`${API_BASE}/students/${id}`);
  if (!res.ok) throw new Error('Failed to fetch student');
  return res.json();
}

export async function fetchInterventions(studentId?: string) {
  const url = studentId ? `${API_BASE}/interventions?student_id=${studentId}` : `${API_BASE}/interventions`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch interventions');
  return res.json();
}

export async function fetchAiExplanation(studentContext: any) {
  const res = await fetch(`${API_BASE}/ai/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentContext })
  });
  if (!res.ok) throw new Error('Failed to fetch AI explanation');
  return res.json();
}

export async function sendSaarthiMessage(messages: any[], role: string) {
  const res = await fetch(`${API_BASE}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, role })
  });
  if (!res.ok) throw new Error('Failed to send Saarthi message');
  return res.json();
}
