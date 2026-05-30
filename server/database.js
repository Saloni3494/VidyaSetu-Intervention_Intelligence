import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getDb() {
  const sqlite3Verbose = sqlite3.verbose();
  const db = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3Verbose.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT,
      grade TEXT,
      concern TEXT,
      tone TEXT,
      ring INTEGER,
      avatar TEXT,
      attendance TEXT,
      math TEXT,
      language TEXT,
      behavior TEXT
    );

    CREATE TABLE IF NOT EXISTS warnings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT,
      category TEXT,
      reason TEXT,
      action TEXT,
      status TEXT,
      severity TEXT,
      FOREIGN KEY(student_id) REFERENCES students(id)
    );

    CREATE TABLE IF NOT EXISTS interventions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT,
      problem TEXT,
      action TEXT,
      follow_up TEXT,
      outcome TEXT,
      status TEXT,
      step INTEGER,
      tone TEXT,
      FOREIGN KEY(student_id) REFERENCES students(id)
    );
  `);

  return db;
}
