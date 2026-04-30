# Election Process Assistant 🗳️🇮🇳

## Overview
The **Election Process Assistant** is an interactive, highly accessible web application designed to simplify and gamify civic education. Built for the **Prompt Wars Virtual Hackathon**, it transforms complex constitutional and electoral processes into engaging digital experiences.

**Live Demo:** [https://election-assistant-738844812831.us-central1.run.app](https://election-assistant-738844812831.us-central1.run.app)

---

## 📌 Submission Requirements

### 1. Chosen Vertical
**Civic Education & Public Information (Challenge 2)**
The goal is to help users understand the Indian election process, timelines, and steps in an interactive and easy-to-follow way, bridging the gap between raw political data and everyday voters.

### 2. Approach and Logic
Our approach prioritizes **efficiency, accessibility, and high performance**:
*   **Zero-Dependency Frontend:** The UI is built entirely using Vanilla HTML5, CSS3, and JavaScript to guarantee instant load times and 100% efficiency scores.
*   **Real Data Integration:** We processed the Kaggle `india-2024-election-dataset-all-candidates` to create a real-time, animated 2024 Lok Sabha Results dashboard.
*   **Modular Architecture:** The logic is strictly separated into data layers (`data.js`, `election2024.js`) and interaction layers (`app.js`).

### 3. How the Solution Works
*   **Interactive Timeline:** Users scroll through the 8 phases of an election (from Nomination to Results), revealing educational "fun facts".
*   **Bento Grid Learning:** Gamified, flippable flashcards teach core concepts like Voter Registration and EVM usage.
*   **Live Data Dashboard:** Users can explore real 2024 election data, including party-wise seat distributions, closest contests, and top vote-getters.
*   **Knowledge Quiz:** An 8-question interactive quiz tests the user's understanding with real-time feedback.
*   **AI Chat Assistant:** Powered by **Google Gemini** (`generativelanguage.googleapis.com`). Users enter their own API key (stored in `localStorage` for this demo only — use a server-side proxy in production). Offline keyword fallbacks work without a key.

### 4. Assumptions Made
*   **Target Audience:** Assumes users are looking for a simplified overview of the process rather than dense legal text.
*   **Network Reliability:** Assumes the user might not always have high-speed internet, which is why the core site relies on static assets with minimal dependencies (Lucide + GIS from CDN for icons and optional sign-in flows).
*   **API Usage:** Assumes the user provides their own **Gemini API key** for the AI chat; otherwise, a robust local fallback system handles common queries. **No API keys are committed in source.**

---

## Security and testing

* **Skill reference:** Repository copy of [security-best-practices](../skills/security-best-practices/SKILL.md) (vendored; install upstream with `npx skills add supercent-io/skills-template@security-best-practices` when GitHub access works).
* **XSS:** Chat and dynamic dashboards escape HTML before `innerHTML`; chat allows only `**bold**` after escaping.
* **Headers:** See [nginx.conf](nginx.conf) for `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and `Permissions-Policy`.
* **Tests:** From repo root, `npm test`, or `cd election-assistant && npm ci && npx playwright install chromium && npm test`.

---

## Evaluation focus (maintenance)

*   **Code Quality:** Modular vanilla JS; data vs DOM separation.
*   **Security:** No secrets in git; escaped DOM sinks; nginx headers; `npm audit` in CI.
*   **Efficiency:** Static-first UI; gzip in nginx.
*   **Testing:** Playwright suite under `election-assistant/tests/`.
*   **Accessibility:** Landmarks, ARIA, keyboard paths (see tests).
*   **Google Services:** Gemini API integration in-app; GIS optional; Cloud Run deploy as documented in your pipeline.
