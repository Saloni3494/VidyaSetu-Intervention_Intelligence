import dotenv from 'dotenv';
import Groq from 'groq-sdk';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function test() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Say hello in JSON format containing 'message' key." }],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
    });
    console.log(chatCompletion.choices[0]?.message?.content);
  } catch (err) {
    console.error("GROQ ERROR:", err);
  }
}
test();
