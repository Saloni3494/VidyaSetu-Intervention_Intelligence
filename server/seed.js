import { getDb } from './database.js';

const mockStudents = [
  { id: "anita-001", name: "Rohan Patil", grade: "5B", concern: "Missed 3 days · Reading slowed", tone: "urgent", ring: 52, avatar: "रो", attendance: "78%", math: "65%", language: "50%", behavior: "Quiet" },
  { id: "s2", name: "Pooja Kale", grade: "5B", concern: "Math fluency dipping", tone: "watch", ring: 68, avatar: "पू", attendance: "92%", math: "58%", language: "85%", behavior: "Active" },
  { id: "s3", name: "Imran Shaikh", grade: "5B", concern: "Hasn't spoken much this week", tone: "watch", ring: 72, avatar: "इ", attendance: "88%", math: "70%", language: "68%", behavior: "Withdrawn" },
  { id: "s4", name: "Sneha Joshi", grade: "5B", concern: "Improving steadily ✨", tone: "good", ring: 88, avatar: "स्ने", attendance: "98%", math: "90%", language: "88%", behavior: "Engaged" },
];

const mockInterventions = [
  { student_id: "anita-001", problem: "Reading fluency dropped from 45 → 28 wpm", action: "Paired reading with Sneha · 15 min daily", follow_up: "Reassess on 18 Sep", outcome: "", status: "Improving", step: 5, tone: "good" },
  { student_id: "s2", problem: "Math fluency dipping", action: "5-min daily number game · home practice card", follow_up: "Reassess Friday", outcome: "", status: "Just started", step: 1, tone: "watch" },
  { student_id: "s3", problem: "Quiet and withdrawn this week", action: "Counselor short check-in · seating change", follow_up: "Tomorrow", outcome: "", status: "Resolved", step: 6, tone: "good" },
];

async function seed() {
  const db = await getDb();
  
  // Clear existing
  await db.exec('DELETE FROM students; DELETE FROM warnings; DELETE FROM interventions;');

  for (const s of mockStudents) {
    await db.run(
      `INSERT INTO students (id, name, grade, concern, tone, ring, avatar, attendance, math, language, behavior) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [s.id, s.name, s.grade, s.concern, s.tone, s.ring, s.avatar, s.attendance, s.math, s.language, s.behavior]
    );
  }

  for (const i of mockInterventions) {
    await db.run(
      `INSERT INTO interventions (student_id, problem, action, follow_up, outcome, status, step, tone) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [i.student_id, i.problem, i.action, i.follow_up, i.outcome, i.status, i.step, i.tone]
    );
  }

  console.log("Database seeded successfully.");
}

seed().catch(console.error);
