# Live Interviews

A real-time live interview platform with video streaming, chat, authentication, and background job processing.

## Architecture

```
live_interviews/
├── backend/                  # Express 5 API server
│   └── src/
│       ├── server.js             # Entry point, middleware, Inngest endpoint, routes
│       ├── middleware/
│       │   └── protectRoute.js   # Clerk auth guard middleware
│       ├── controllers/
│       │   ├── sessionController.js  # Session CRUD (create, join, end, list)
│       │   └── chatController.js     # Stream chat token generation
│       ├── models/
│       │   ├── User.model.js     # Mongoose User schema (clerkId, name, email, profileImage)
│       │   └── Session.model.js  # Mongoose Session schema (problem, difficulty, host, participant, callId)
│       ├── routes/
│       │   ├── session.routes.js # /api/sessions — create, list, join, end
│       │   └── chat.routes.js    # /api/chat/token — Stream token
│       └── lib/
│           ├── env.js            # Environment config (dotenv)
│           ├── db.js             # MongoDB/Mongoose connection
│           ├── inngest.js        # Inngest functions (sync/delete user with Stream)
│           └── stream.js         # Stream Chat & Video SDK clients
├── frontend/                 # React 19 + Vite 8 SPA
│   └── src/
│       ├── main.jsx              # Root with ClerkProvider, BrowserRouter, QueryClientProvider
│       ├── App.jsx               # Routes (/, /about, /problems), Toaster, auth guard
│       ├── index.css             # Tailwind CSS v4 + DaisyUI
│       ├── lib/
│       │   └── axios.js          # Axios instance (baseURL, credentials)
│       └── pages/
│           ├── HomePage.jsx      # Home with Clerk auth buttons (SignIn, SignOut, UserButton)
│           ├── AboutPage.jsx     # About placeholder
│           └── ProblemsPage.jsx  # Problems placeholder (protected route)
└── package.json              # Root monorepo orchestrator (build, start)
```

## Tech Stack

| Layer | Technology | URL |
|-------|-----------|-----|
| Runtime | Node.js >=22.0.0 | https://nodejs.org |
| Backend | Express 5 | https://expressjs.com |
| Database | MongoDB Atlas + Mongoose 9 | https://www.mongodb.com — https://mongoosejs.com |
| Frontend | React 19 + Vite 8 | https://react.dev — https://vite.dev |
| Auth | Clerk (Express + React SDKs) | https://clerk.com |
| Video/Chat | Stream (GetStream.io) — Chat SDK + Video SDK | https://getstream.io |
| Background Jobs | Inngest | https://www.inngest.com |
| Styling | Tailwind CSS v4 + DaisyUI | https://tailwindcss.com — https://daisyui.com |
| Data Fetching | TanStack React Query | https://tanstack.com/query |
| HTTP Client | Axios | https://axios-http.com |

## Implemented

### Backend
- Express server with CORS, JSON middleware, Clerk auth middleware
- MongoDB connection via Mongoose
- **Clerk authentication** — `clerkMiddleware` on all requests, `protectRoute` guard on API routes
- **User model** — persisted to MongoDB with `clerkId`, `name`, `email`, `profileImage`
- **Session model** — `problem`, `difficulty`, `host`, `participant`, `status`, `callId`
- **Session API** — `POST /api/sessions` (create), `GET /api/sessions/active`, `GET /api/sessions/my-recent`, `GET /api/sessions/:id`, `POST /api/sessions/:id/join`, `POST /api/sessions/:id/end`
- **Chat API** — `GET /api/chat/token` (generate Stream user token)
- **Inngest integration** — `sync-user` (create User in DB + upsert in Stream on `clerk/user.created`), `delete-user-from-db` (delete from DB + Stream on `clerk/user.deleted`)
- **Stream integration** — video call creation/deletion on session lifecycle, chat channel creation with members, user sync via Inngest
- Production build workflow (backend serves built frontend)

### Frontend
- React 19 with Vite 8 (HMR)
- **Clerk authentication** — `ClerkProvider`, `useUser`, `SignedIn`/`SignedOut`, `SignInButton` (modal), `SignOutButton`, `UserButton`
- **React Router** v8 — routes for `/` (HomePage), `/about`, `/problems` (auth-protected)
- **TanStack React Query** — `QueryClientProvider` wrapping the app
- **react-hot-toast** — toast notifications with `<Toaster />`
- **Axios instance** — pre-configured with `baseURL` and `withCredentials: true`
- **Tailwind CSS v4 + DaisyUI** — utility-first styling

## Planned

- Full interview workspace UI (code editor, video panel, chat)
- Additional Inngest functions
- Deployment configuration

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

## Quick Start

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

### Development

Run backend and frontend separately for hot-reload:

```bash
# Terminal 1 — Backend (Express, port 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (Vite dev server, port 5173)
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

## Setup Details

1. **Clone** the repo and `cd` into it.
2. Copy `.env.example` → `.env` in both `backend/` and `frontend/`.
3. Fill in the required credentials in each `.env` file (see comments in `.env.example` for where to get each key).
4. Run `npm run build` (root) to install all dependencies and build the frontend.
5. Run `npm run start` (root) to start the production server.
