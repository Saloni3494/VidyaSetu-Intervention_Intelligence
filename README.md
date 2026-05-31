<div align="center">
  <img src="public/icon-512x512.png" alt="VidyaSetu Logo" width="120" />
  <h1>VidyaSetu AI</h1>
  <h3>A warm, human-centered operating system for every Indian school.</h3>
  
  <p>
    <b>Hackathon:</b> SahAI for Shiksha Hackathon 2026<br/>
    <b>Team Name:</b> Team Spectra
  </p>

  <p>
    <a href="https://vidyasetu-intervention-intelligence.onrender.com"><strong>View Live Demo (Frontend)</strong></a> ·
    <a href="#features"><strong>Explore Features</strong></a> ·
    <a href="#agentic-ai"><strong>Agentic AI</strong></a>
  </p>
</div>

---

## 🎯 Problem Statement
In the vast and diverse landscape of Indian education, teachers are often overwhelmed by administrative tasks and large classroom sizes, making it extremely difficult to provide personalized attention to every student. Warning signs of students falling behind—whether due to academic struggles, absenteeism, or emotional distress—are often noticed too late. There is a critical lack of an interconnected, empathetic, and data-driven system that connects teachers, principals, and state administrators to identify and assist struggling students *before* they slip through the cracks.

## 💡 Solution in Short
**VidyaSetu AI (Intervention Intelligence)** is a multilingual, offline-first educational platform that acts as a caring daily companion for educators. Rather than just tracking grades, VidyaSetu focuses on student **wellbeing and early intervention**. It uses advanced Agentic AI to analyze classroom data, spot struggling students early, and proactively suggest gentle, actionable "nudges" (like paired reading or parent check-ins). It provides tailored, interconnected dashboards for every stakeholder—from the rural teacher to the State Administrator.

---

## 🚀 All the Features

- **Early Warning System:** Proactively flags students based on attendance dips, learning gaps, or behavioral changes.
- **Multilingual Voice Assistant (Saarthi):** Teachers can ask questions in their native language (e.g., *"Mujhe Rohan ke liye kya karna chahiye?"*) and receive immediate, actionable advice.
- **Smart Nudges & Action Plans:** Automatically suggests low-effort, high-impact interventions tailored to individual student needs.
- **Offline-First Architecture:** Built as a Progressive Web App (PWA) that works beautifully even in schools with poor or intermittent internet connectivity.
- **Health Rings & Wellbeing Tracking:** Visualizes classroom and student health using empathetic metrics (good, watch, urgent) instead of cold statistics.
- **Automated Task Management:** The AI dynamically schedules follow-ups, creates tasks, and drafts parent outreach letters on the fly.

---

## 📊 Dedicated Dashboards

VidyaSetu provides tailored experiences based on the user's role in the education system:

1. **🧑‍🏫 Teacher Dashboard:** The daily classroom companion. Offers a holistic overview of class health, flags students needing extra care, provides personalized daily plans, and offers AI-driven suggestions for classroom activities.
2. **🏫 Principal Dashboard:** The pulse of the school. Tracks health metrics across different grades, monitors overall attendance trends, and helps allocate teacher resources where they are needed most.
3. **📍 District Officer Dashboard:** The bird's-eye view. Maps out hundreds of schools in the district, identifying regions that require immediate administrative or financial intervention.
4. **🏛️ State Administrator Dashboard:** The policy engine. Translates district-by-district progress into high-level policy insights and budget recommendations for millions of students.

---

## 🌟 Innovations

1. **Human-Centric Metrics:** Moving away from traditional GPA tracking to holistic "Wellbeing Rings" and empathetic tones.
2. **Zero-Latency Feel (Offline-First):** Uses advanced Service Workers and caching strategies to ensure teachers never lose access to their data, syncing seamlessly when back online.
3. **Seamless Role-Switching:** A unified ecosystem where a localized teacher intervention automatically bubbles up as anonymized statistical data for State Administrators.

---

## 🧠 Highlight: Use of AI

VidyaSetu is fundamentally driven by **LLaMA 3.1 8B** (via Groq's ultra-fast inference). The AI is not just a chatbot; it acts as an analytical engine. 
- **Contextual Explanations:** When a student is flagged, the AI processes their recent academic, attendance, and behavioral context to generate exactly *why* they were flagged.
- **Personalized Recommendations:** The AI generates highly specific, culturally relevant interventions (e.g., suggesting a 5-minute Marathi reading game).

---

## 🤖 Highlight: Agentic AI in the Project

VidyaSetu takes AI a step further with **VidyaSetu Saarthi**, an **Agentic AI Assistant**. 
Unlike standard chatbots that only answer questions, Saarthi has *agency*:
- **Role-Aware Personalities:** The Agent dynamically shifts its focus based on who is logged in. It assists teachers with classroom nudges, while it assists Principals with school-wide action plans.
- **Autonomous Task Execution:** Saarthi can listen to a teacher's voice request and autonomously trigger system actions. If a teacher asks to schedule a meeting, the Agentic AI injects `[ACTION: SCHEDULED]` into the system pipeline, directly updating the user's pending tasks.
- **Dynamic Document Generation:** The Agent can autonomously draft official documents, parent outreach letters, or district resource plans, outputting them in beautifully formatted markdown blocks ready for printing or sending.

---

## 💻 Technologies Used

Built with a state-of-the-art, highly performant modern web stack:

*   **Frontend Framework:** React 19 + Vite (Blazing fast HMR and optimized builds)
*   **Routing:** TanStack Router (Fully typed, file-based client-side routing)
*   **Data Management:** TanStack Query (Intelligent caching and asynchronous state management)
*   **Styling & UI:** Tailwind CSS v4, shadcn/ui, Radix UI (Accessible, premium, unstyled components)
*   **Offline Capabilities:** Vite PWA (Service workers, manifest, offline caching)
*   **Backend API:** Node.js + Express.js
*   **Artificial Intelligence:** Groq SDK utilizing **Meta's Llama-3.1-8b-instant** model for lightning-fast Agentic AI inference.
*   **Deployment:** Render (Automated CI/CD pipelines)

---

## 🔗 Hosted Live Links

*   **🌐 Live Application (Frontend):** [https://vidyasetu-intervention-intelligence.onrender.com](https://vidyasetu-intervention-intelligence.onrender.com)
*   **⚙️ Live API (Backend):** [https://vidyasetu-backend.onrender.com](https://vidyasetu-backend.onrender.com) *(Update this with your actual backend URL)*
*   **🐙 GitHub Repository:** [https://github.com/Saloni3494/VidyaSetu-Intervention_Intelligence](https://github.com/Saloni3494/VidyaSetu-Intervention_Intelligence)

---
<div align="center">
  <i>Built with ❤️ for Indian Schools by Team Spectra</i>
</div>
