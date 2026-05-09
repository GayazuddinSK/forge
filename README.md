# 🛡️ Forge OS - Personal Productivity Dashboard (V2)

Welcome to **Forge OS**, Version 2 of my personal productivity dashboard! This project has been entirely reimagined and rebuilt from the ground up to act as a complete "Personal Productivity Operating System". 

Designed with a sleek, Marvel/JARVIS-inspired aesthetic, it features deep dark backgrounds, glowing arc-reactor cyan accents, and glassmorphism UI elements to make productivity look and feel incredibly satisfying.

## ✨ Features

- **Modern UI Architecture**: Built with React, Vite, and Tailwind CSS. Fully responsive for all mobile and desktop devices.
- **Attendance Protocol**: A robust attendance tracker ported from custom Python logic. It automatically calculates percentages, warns you when subjects drop below 75%, and securely persists data in the browser's local storage.
- **Task Directive (To-Do List)**: A complete task management system featuring priority tags, categorizations, and completion filters.
- **Network & Profile Widgets**: Integrated quick-access modules for GitHub statistics, LinkedIn networking, and one-click Resume downloading.
- **Real-Time System Clock**: A dynamic Hero section greeting that tracks live local time and date.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v3)
- **Icons**: Lucide React
- **Hosting / Deployment**: Vercel (or Netlify)
- **Database / Auth (Upcoming)**: Supabase

## 🗺️ Roadmap

Here is the plan for evolving Forge OS into a full-scale cloud platform:

- [x] **Phase 1: V2 UI Overhaul** - Complete rewrite from vanilla HTML/JS to React/Vite. Establish the JARVIS-inspired design system and client-side widgets.
- [ ] **Phase 2: Authentication** - Integrate **Supabase Auth** to implement a secure login system with session persistence, locking down the dashboard behind an admin wall.
- [ ] **Phase 3: Cloud Database Migration** - Move all local storage data (Attendance, Tasks) into a scalable Supabase PostgreSQL database for cross-device syncing.
- [ ] **Phase 4: Backend Integrations** - Re-integrate Python/Google Apps Script endpoints for dynamic data fetching and background task automation.
- [ ] **Phase 5: AI & Analytics** - Implement basic AI summaries of daily tasks and advanced productivity analytics graphs.

## 🚀 Getting Started

If you want to clone and run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/GayazuddinSK/forge.git
   ```
2. Navigate to the project directory:
   ```bash
   cd forge
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---
*Built with ❤️ by a Student Developer.*
