import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDb } from './database.js';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Initialize Groq AI
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy_key' });

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const db = await getDb();
    const students = await db.all('SELECT * FROM students');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const db = await getDb();
    const student = await db.get('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (!student) return res.status(404).json({ error: "Not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get interventions for a student
app.get('/api/interventions', async (req, res) => {
  try {
    const db = await getDb();
    let query = 'SELECT * FROM interventions';
    let params = [];
    if (req.query.student_id) {
       query += ' WHERE student_id = ?';
       params.push(req.query.student_id);
    }
    const interventions = await db.all(query, params);
    res.json(interventions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// AI Endpoint: Generate Explanations and Recommendations
app.post('/api/ai/explain', async (req, res) => {
  try {
    const { studentContext } = req.body;
    
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      // Fallback for hackathon if no key is set yet
      return res.json({
        reasons: [
          "Attendance dropped: Missed 3 Mondays in a row.",
          "Learning gaps detected: Reading fluency fell."
        ],
        recommendations: [
          { title: "Parent Meeting", desc: "Discuss the impact of recent migration on attendance." },
          { title: "Peer Learning Group", desc: "Pair with Sneha for 15 minutes of daily reading practice." }
        ]
      });
    }

    const prompt = `You are VidyaSetu, a caring educational AI assistant.
Given the following student context, provide exactly 2 reasons why they might be flagged for intervention, and 2 actionable recommendations for the teacher. 
Format your response exactly as valid JSON with no markdown blocks:
{
  "reasons": ["reason 1", "reason 2"],
  "recommendations": [
    { "title": "Rec 1", "desc": "Desc 1" },
    { "title": "Rec 2", "desc": "Desc 2" }
  ]
}

Student Context: ${JSON.stringify(studentContext)}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    const text = responseContent ? responseContent.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '') : "{}";
    
    res.json(JSON.parse(text));
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate AI response." });
  }
});

// AI Endpoint: Chat (VidyaSetu Saarthi)
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, role } = req.body;

    const rolePrompts = {
      teacher: "You are a Teacher Assistant. Focus on student care, classroom nudges, and parental engagement. If they ask to generate a parent letter, respond with the letter enclosed in a markdown code block starting with ```document.",
      principal: "You are a Principal Assistant. Focus on school health, teacher allocation, and overall attendance. If asked for a school action plan, return it in a ```document block.",
      district: "You are a District Assistant. Focus on district-wide metrics, struggling schools, and resource allocation.",
      state: "You are a State Administrator Assistant. Focus on policy insights, budget recommendations, and inclusion monitoring.",
    };

    const systemMessage = {
      role: "system",
      content: `You are VidyaSetu Saarthi, a caring, multilingual educational AI assistant.
${rolePrompts[role] || "You are an educational assistant."}
Be concise, practical, and empathetic. 
If the user asks you to "create a task", "schedule a follow-up", or "notify a teacher", you MUST include a special line in your response exactly like this:
[ACTION: TASK_CREATED] or [ACTION: NOTIFIED] or [ACTION: SCHEDULED].
If asked to generate a report, letter, or plan, format it inside a markdown block: \`\`\`document\n(content here)\n\`\`\`.`
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [systemMessage, ...messages],
      model: "llama-3.1-8b-instant",
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    res.json({ text: responseContent });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: "Failed to process chat." });
  }
});

app.listen(port, () => {
  console.log(`VidyaSetu API running on http://localhost:${port}`);
});
