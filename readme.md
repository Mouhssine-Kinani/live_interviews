# Live Interviews — Code Together

A real-time 1-on-1 technical interview platform: live video calls, in-session chat, a collaborative code editor, and a solo practice workspace with multi-language code execution.

## Features

- **Live interview rooms** — 1-on-1 sessions with a shared problem statement, host/participant roles, and session lifecycle (create → join → end)
- **Real-time video calls** — powered by Stream Video (GetStream.io), with participant grid and call controls
- **In-session chat** — Stream Chat channel created per session, opened only to the host and participant
- **Collaborative code editor** — Monaco editor synchronized over Socket.IO (join/update events, debounced sync), with language selection (JavaScript, Python, Java)
- **Code execution** — run code in the browser, executed server-side (`/api/execute`) via sandboxed JS evaluation or local `python3`/`javac` child processes, with test-case comparison and confetti on success
- **Solo practice workspace** — 23 curated LeetCode-style problems (Easy/Medium/Hard) with descriptions, examples, constraints, starter code, and expected outputs
- **Live dashboard** — active sessions list refreshed in real time via Socket.IO (`sessions:changed`), recent session history, and session stats
- **Authentication** — Clerk (sign-in modal, user button, protected routes, webhook-driven user sync)
- **Theme picker** — 35 daisyUI themes persisted to `localStorage`
- **Responsive UI** — resizable panels that adapt to mobile (react-resizable-panels)

## Tech Stack

| Layer | Technology | URL |
|-------|-----------|-----|
| Runtime | Node.js >=22.0.0 | https://nodejs.org |
| Backend | Express 5 | https://expressjs.com |
| Database | MongoDB Atlas + Mongoose 9 | https://www.mongodb.com — https://mongoosejs.com |
| Frontend | React 19 + Vite 8 | https://react.dev — https://vite.dev |
| Auth | Clerk (Express + React SDKs) | https://clerk.com |
| Video | Stream Video SDK (`@stream-io/video-react-sdk`, `@stream-io/node-sdk`) | https://getstream.io |
| Chat | Stream Chat SDK (`stream-chat`, `stream-chat-react`) | https://getstream.io |
| Realtime Editor Sync | Socket.IO | https://socket.io |
| Code Execution | Custom: `node:vm` sandbox + child processes | — |
| Background Jobs | Inngest | https://www.inngest.com |
| Code Editor | Monaco (`@monaco-editor/react`) | https://microsoft.github.io/monaco-editor |
| Styling | Tailwind CSS v4 + DaisyUI | https://tailwindcss.com — https://daisyui.com |
| Data Fetching | TanStack React Query | https://tanstack.com/query |
| HTTP Client | Axios | https://axios-http.com |
| UI Helpers | react-resizable-panels, react-hot-toast, canvas-confetti, date-fns, lucide-react | — |

## Architecture

```
live_interviews/
├── backend/                  # Express 5 API server (ESM)
│   └── src/
│       ├── server.js             # Entry point: Express + HTTP + Socket.IO + Inngest serve + SPA fallback (prod)
│       ├── middleware/
│       │   └── protectRoute.js   # Clerk auth guard (401 if unauthenticated, 404 if user not in DB)
│       ├── controllers/
│       │   ├── sessionController.js  # Session lifecycle + Stream video call/chat channel creation
│       │   ├── chatController.js     # Stream chat token generation
│       │   └── codeController.js     # Code execution (JS sandbox / Python / Java)
│       ├── models/
│       │   ├── User.model.js     # clerkId, name, email, profileImage
│       │   └── Session.model.js  # problem, difficulty, host, participant, status, callId
│       ├── routes/
│       │   ├── session.routes.js # /api/sessions — create, list, join, end
│       │   ├── chat.routes.js    # /api/chat/token — Stream token
│       │   └── code.routes.js    # /api/execute — run code
│       └── lib/
│           ├── env.js            # Environment config (dotenv)
│           ├── db.js             # MongoDB/Mongoose connection
│           ├── socket.js         # Socket.IO server factory (initializeSocket/getIO)
│           ├── inngest.js        # Inngest functions (sync/delete user with Stream)
│           └── stream.js         # Stream Video + Chat SDK clients
├── frontend/                 # React 19 + Vite 8 SPA
│   └── src/
│       ├── main.jsx              # ClerkProvider + BrowserRouter + QueryClientProvider
│       ├── App.jsx               # Routes + auth guards + Toaster
│       ├── index.css             # Tailwind CSS v4 + DaisyUI
│       ├── api/sessions.js       # Axios calls for sessions + Stream token
│       ├── data/problems.js      # 23 problems + LANGUAGE_CONFIG
│       ├── hooks/
│       │   ├── useSessions.js    # React Query hooks for sessions
│       │   └── useStreamClient.js# Stream video call + chat channel init
│       ├── lib/
│       │   ├── axios.js          # Axios instance (baseURL, credentials)
│       │   ├── socket.js         # Socket.IO client factory
│       │   ├── stream.js         # Stream Video client singleton
│       │   ├── piston.js         # Code execution client (/api/execute)
│       │   └── utils.js          # Difficulty badge helper
│       ├── components/           # NavBar, VideoCallUI, CodeEditorPanel, OutputPanel,
│       │                         # ProblemDescription, CreateSessionModal, ActiveSessions,
│       │                         # RecentSessions, StatsCards, WelcomeSection
│       └── pages/
│           ├── HomePage.jsx      # Public landing page
│           ├── DashboardPage.jsx # Stats, active/recent sessions, create session
│           ├── ProblemsPage.jsx  # Problem list
│           ├── ProblemPage.jsx   # Solo practice workspace
│           └── SessionPage.jsx   # Live 1-on-1 interview room
└── package.json              # Root monorepo orchestrator (build, start)
```

## API Reference

All endpoints except the health check and the Inngest webhook require Clerk authentication (`protectRoute`).

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | Health check |
| POST | `/api/inngest` | Inngest dev server (Clerk webhooks) |
| POST | `/api/sessions` | Create a session + Stream video call + chat channel — body `{ problem, difficulty }` |
| GET | `/api/sessions/active` | List up to 20 active sessions (host/participant populated) |
| GET | `/api/sessions/my-recent` | List up to 20 recent sessions of the current user |
| GET | `/api/sessions/:id` | Get one session (populated) |
| POST | `/api/sessions/:id/join` | Join as participant (+ add to Stream channel) |
| POST | `/api/sessions/:id/end` | End session (host only; hard-deletes Stream call + channel) |
| GET | `/api/chat/token` | Stream chat token + user info |
| POST | `/api/execute` | Execute code — body `{ language: "javascript"\|"python"\|"java", code }` |

### Socket.IO events

| Event | Direction | Payload | Purpose |
|-------|-----------|---------|---------|
| `editor:join` | client → server | `{ sessionId }` (ack → current `{ code, language }`) | Join the editor room, get current state |
| `editor:update` | client ↔ server | `{ sessionId, code, language }` | Real-time collaborative code sync (relayed to other peers) |
| `sessions:changed` | server → client | — | Broadcast after create/join/end — tells dashboards to refresh |

### Inngest functions

| Function | Trigger | Actions |
|----------|---------|---------|
| `sync-user` | `clerk/user.created` | Create User in MongoDB + upsert in Stream Chat |
| `delete-user-from-db` | `clerk/user.deleted` | Delete User from MongoDB + Stream Chat |

## Routes (Frontend)

| Route | Page | Access |
|-------|------|--------|
| `/` | HomePage (landing) | Public |
| `/dashboard` | DashboardPage | Authenticated |
| `/problems` | ProblemsPage | Authenticated |
| `/problem/:id` | ProblemPage (practice workspace) | Authenticated |
| `/session/:id` | SessionPage (live interview room) | Authenticated |

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Mouhssine-Kinani/live_interviews.git
cd live_interviews

# 2. Set up environment variables
#    Copy .env.example → .env in both backend/ and frontend/
#    Fill in all required keys (Clerk, MongoDB, Stream, Inngest)
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Install dependencies and build the frontend
npm run build

# 4. Start the backend (serves the built frontend in production)
npm run start
```

### Environment Variables

**Backend (`.env`):**

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default 3000) |
| `NODE_ENV` | `development` or `production` |
| `DB_URL` | MongoDB Atlas connection string |
| `INNGEST_EVENT_KEY` | Inngest app key |
| `INNGEST_SIGNING_KEY` | Inngest signing key |
| `STREAM_API_KEY` | GetStream.io dashboard |
| `STREAM_API_SECRET` | GetStream.io dashboard |
| `CLERK_PUBLISHABLE_KEY` | Clerk dashboard → API Keys |
| `CLERK_SECRET_KEY` | Clerk dashboard → API Keys (server-side) |
| `CLIENT_URL` | `http://localhost:5173` (dev) / deployed frontend URL (prod) |

**Frontend (`.env`):**

| Variable | Description |
|----------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk dashboard → API Keys |
| `VITE_API_URL` | `http://localhost:3000` (dev) / deployed backend URL (prod) |
| `VITE_STREAM_API_KEY` | GetStream.io dashboard |

### Development

Run backend and frontend separately for hot-reload:

```bash
# Terminal 1 — Backend (Express, port 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (Vite dev server, port 5173, proxies /api and /socket.io)
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

## Scripts

### Root
- `npm run build` — install deps for both packages + build frontend
- `npm run start` — start backend in production mode

### Backend
- `npm run dev` — nodemon dev server
- `npm run start` — production start

### Frontend
- `npm run dev` — Vite dev server (HMR)
- `npm run build` — production build
- `npm run lint` — ESLint

## Notes

- **Clerk webhooks**: the Inngest functions are triggered by Clerk webhooks (`clerk/user.created`, `clerk/user.deleted`) — configure them in the Clerk dashboard pointing to `<backend>/api/inngest`, and run `npx inngest-cli dev` locally to test.
- **Code execution**: the backend runs JavaScript in a `node:vm` sandbox, and Python/Java via local `python3`/`javac` binaries — the server host must have those installed. Executions are limited to a 10 s timeout.
- **Editor state** is kept in memory on the server — it resets when the backend restarts.
