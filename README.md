<div align="center">
  <img src="public/icon-512x512.png" alt="VidyaSetu Logo" width="100" />
  <h1>VidyaSetu AI</h1>
  
  <p>
    <b>Hackathon:</b> SahAI for Shiksha Hackathon 2026<br/>
    <b>Team:</b> Team Spectra
  </p>

  <p>
    <a href="https://vidyasetu02.onrender.com/"><strong>Live Frontend</strong></a> ·
    <a href="https://vidyasetu-intervention-intelligence.onrender.com"><strong>Live Backend</strong></a>
  </p>
</div>

---

### 🎯 Problem Statement
Teachers in India are overwhelmed by large class sizes, making it hard to track individual student wellbeing. Struggling students often slip through the cracks due to a lack of interconnected, early-warning data across the school system.

### 💡 Solution
**VidyaSetu AI** is a multilingual, offline-first operating system for Indian schools. It uses Agentic AI to spot struggling students early, suggest gentle interventions, and provide tailored dashboards from the classroom to the state level.

---

### 🚀 Key Features
*   **Early Warning System:** Automatically flags students based on attendance dips and learning gaps.
*   **Multilingual Voice Assistant (Saarthi):** Allows teachers to ask for help in their native language (e.g., *"Rohan ke liye kya karein?"*).
*   **Smart Nudges:** Suggests highly personalized, low-effort daily interventions (e.g., 5-min reading games).
*   **Peer-Learning Matchmaker:** AI dynamically pairs strong students with struggling students for collaborative micro-learning.
*   **Automated Parent Outreach:** Drafts and queues WhatsApp/SMS messages to parents for attendance drops or praise.
*   **Daily Mood Check-ins:** Simple, gamified mood trackers for students to alert teachers of emotional distress before class begins.
*   **Micro-Learning Bites:** Delivers 2-minute pedagogical tips to teachers based on the specific challenges their class is facing that week.
*   **Inclusive Education Tracking:** Dedicated flags and support suggestions for students with learning disabilities or special needs.
*   **Offline-First (PWA):** Works seamlessly in remote schools without internet, syncing data when online.
*   **Wellbeing Health Rings:** Replaces cold statistics with empathetic visual indicators (Good, Watch, Urgent).
*   **Automated Task Management:** AI automatically schedules follow-ups and drafts parent outreach letters.

### 📊 Role-Based Dashboards
*   **🧑‍🏫 Teacher:** Daily companion for class health, nudges, and tasks.
*   **🏫 Principal:** Tracks school-wide health and attendance trends.
*   **📍 District Officer:** Maps hundreds of schools for targeted resource allocation.
*   **🏛️ State Admin:** Aggregates district data for high-level policy insights.

---

### 🌟 Core Innovations
*   **Agentic AI Automation:** Saarthi isn't just a chatbot; it autonomously executes system tasks `[ACTION: SCHEDULED]` and drafts documents on its own.
*   **Human-Centric Metrics:** Prioritizes emotional and academic wellbeing over traditional GPA tracking.
*   **Zero-Latency Sync:** Ambient data syncing designed to save battery and bandwidth in remote areas.
*   **AI Cultural Contextualization:** AI responses are dynamically tailored to the specific local culture and language nuances of the school.
*   **Predictive Resource Allocation:** AI analyzes trends to predict potential teacher or material shortages before they happen.
*   **Edge-Ready Architecture:** Designed with lightweight capabilities to eventually support on-device AI inference for total offline autonomy.

---

### 🤖 Agentic AI Integration (Llama 3.1)
Powered by **Llama 3.1 8B** (via Groq), the AI acts as an autonomous analytical engine:
*   **Dynamic Role-Awareness:** The Agent changes its behavior entirely depending on if it's speaking to a Teacher vs. a State Admin.
*   **Contextual Reasoning:** Instantly reads a student's history to explain *why* they were flagged, instead of just providing generic advice.

### 💻 Technologies Used
*   **Frontend:** React 19, Vite, TanStack Router, Tailwind CSS v4, shadcn/ui.
*   **Backend:** Node.js, Express.js.
*   **AI Integration:** Groq SDK (Meta's Llama-3.1-8b-instant).
*   **Deployment:** Render (Automated CI/CD).
*   **Architecture:** Progressive Web App (PWA), Offline-First.

---

### 📂 Directory Structure
```text
VidyaSetu-Intervention_Intelligence/
├── server/                 # Backend Node.js / Express API
│   ├── index.js            # Main Express server and Groq AI routes
│   └── database.js         # SQLite database configuration
├── src/                    # Frontend React SPA
│   ├── components/         # Reusable UI components (shadcn/ui, AppShell)
│   ├── contexts/           # Global state (Auth, Role management)
│   ├── lib/                # API clients and utility functions
│   ├── routes/             # TanStack file-based routing pages
│   │   ├── __root.tsx      # Main application layout and providers
│   │   ├── index.tsx       # Landing/Role selection page
│   │   ├── teacher.tsx     # Teacher dashboard
│   │   ├── principal.tsx   # Principal dashboard
│   │   └── district.tsx    # District officer dashboard
│   ├── main.tsx            # Vite application entry point
│   └── styles.css          # Tailwind CSS definitions
├── public/                 # Static assets (icons, manifest)
├── index.html              # Frontend HTML shell
├── package.json            # Dependencies and npm scripts
└── vite.config.ts          # Vite configuration and PWA setup
```

---

### 🔗 Hosted Live Links

*   **🌐 Live Application (Frontend):** [https://vidyasetu02.onrender.com/](https://vidyasetu02.onrender.com/)
*   **⚙️ Live API (Backend):** [https://vidyasetu-intervention-intelligence.onrender.com](https://vidyasetu-intervention-intelligence.onrender.com)
*   **🐙 GitHub Repository:** [https://github.com/Saloni3494/VidyaSetu-Intervention_Intelligence](https://github.com/Saloni3494/VidyaSetu-Intervention_Intelligence)

<div align="center">
  <i>Built with ❤️ for Indian Schools by Team Spectra</i>
</div>
