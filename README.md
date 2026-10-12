# Belief — A System to Keep Your Belief Intact

Belief is a progressive web application designed to help users preserve and restore their self-belief through daily voice/text check-ins, visual timelines, and Balu the supportive guide mascot.

---

## 🌟 Key Features

1. **Logo & Splash Screen**:
   - Signature yellow brand palette with smooth scale/fade logo reveal animation.
   - Tap/click anywhere to skip directly to authentication.

2. **3D Mascot (Balu)**:
   - High-fidelity 3D mascot poses: `wave`, `peek`, `point`, `listen`, `think`, `talk`, `soft`, `nod`, `fly`, `surprised`.
   - Responsive speech-bubble dialogs with emotional awareness and conversational check-ins.

3. **Walkthrough & Interactive Timeline**:
   - Meera's visual story and onboarding flow.
   - Dedicated "Build Your Timeline" system restoring personalized timeline questions.
   - Audio and text responses with voice recording.

4. **Home Dashboard & Widgets**:
   - Daily affirmation cards and streak trackers.
   - "Keep me close" Add Widget prompt with step-by-step instructions for iOS Safari and Android Chrome.
   - Bad Day / Rough Patch mode (`/playback`) and Silence Check-ins.

5. **Safety & Crisis Support**:
   - Instant 24/7 crisis support route (`/crisis`) with emergency helpline numbers, grounding exercises, and immediate assistance.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Vanilla CSS design system, Lucide React icons, Motion animations.
- **Backend / Serverless**: Vercel Serverless Functions (`/api/*`), Node.js, In-memory token bucket rate limiting (30 requests/hour/IP).
- **Storage & PWA**: IndexedDB (`idb`), Vite PWA Plugin with offline service worker.
- **Audio & AI Integration**: Web Speech API (`webkitSpeechRecognition`), optional Sarvam AI transcription, Gemini API fallbacks.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The app will start at `http://localhost:5173`.

### Running Tests

```bash
# Run all unit tests and Vitest suites
npm test

# Run safety evals
npm run eval
```

### Production Build & Deployment

```bash
# Typecheck and build for production
npm run build

# Deploy to Vercel (CLI)
npx vercel --prod
```

---

## 📂 Project Structure

```
├── api/                   # Vercel Serverless Function endpoints
│   ├── analyze.js         # Text/voice emotion & safety analysis
│   ├── balu.js            # Balu conversational companion handler
│   ├── checkin-reply.js   # Automated check-in responders
│   ├── cron.js            # Scheduled background jobs
│   ├── heartbeat.js       # System health & uptime check
│   ├── push-subscribe.js  # Web push notification registration
│   ├── send-push.js       # Push notification dispatcher
│   └── transcribe.js      # Speech-to-text processing endpoint
├── public/                # Static assets, audio, icons, Balu poses
│   ├── balu/              # 3D Balu pose WebP images
│   ├── logo.jpg           # Belief logo
│   └── manifest.webmanifest # PWA Web App Manifest
├── server/                # Backend shared libraries
│   ├── lib/
│   │   ├── auth.js        # Authentication helpers
│   │   ├── db.js          # PostgreSQL / mock database adapter
│   │   └── rateLimit.js   # IP-based rate limiting
├── src/                   # React frontend application
│   ├── components/        # UI components by domain
│   │   ├── auth/          # Login, signup, timeline setup
│   │   ├── badday/        # Bad Day playback mode
│   │   ├── balu/          # Balu interactive mascot screens
│   │   ├── crisis/        # Crisis intervention & resources
│   │   ├── home/          # Main dashboard, widget prompts
│   │   ├── mascot/        # Walkthrough bear, visual storytelling
│   │   ├── opening/       # Splash & animated logo screen
│   │   ├── signals/       # Silence check-ins & mood signals
│   │   └── timeline/      # Timeline builder, walkthrough end, view
│   ├── hooks/             # Custom React hooks (speech, audio, etc.)
│   ├── services/          # Client API & offline storage services
│   ├── App.jsx            # Main app router & state orchestrator
│   ├── main.jsx           # Application entry point
│   └── index.css          # Design tokens & global stylesheet
├── tests/                 # Automated test suite
├── vercel.json            # Vercel routing & serverless configuration
└── package.json           # Scripts & dependency definitions
```

---

## 🔒 Security & Privacy

- Client demo path operates with zero API keys required.
- Endpoints are protected with IP rate limiting.
- Sensitive environment files (`.env`, `.env.local`) are excluded from version control and Vercel deployments.
