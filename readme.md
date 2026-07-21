# Live Interviews

A real-time live interview platform with video streaming, authentication, and background job processing.

## Architecture

Monorepo with two packages:

```
live_interviews/
├── backend/                  # Express 5 API server
│   └── src/
│       ├── server.js             # Entry point, middleware, Inngest endpoint
│       ├── models/
│       │   └── User.model.js     # Mongoose User schema
│       └── lib/
│           ├── env.js            # Environment config (dotenv)
│           ├── db.js             # MongoDB/Mongoose connection
│           └── inngest.js        # Inngest functions (user sync/delete)
├── frontend/                 # React 19 + Vite 8 SPA
│   └── src/
│       ├── main.jsx              # Root with ClerkProvider
│       ├── App.jsx               # SignInButton / SignUpButton
│       └── index.css             # Global styles
└── package.json              # Root monorepo orchestrator
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js >=22.0.0 |
| Backend | Express 5 |
| Database | MongoDB Atlas + Mongoose 9 |
| Frontend | React 19 + Vite 8 |
| Auth | Clerk |
| Video/Chat | Stream (GetStream.io) — env configured |
| Background Jobs | Inngest — implemented |

## Implemented

- Express backend with CORS, JSON middleware, MongoDB connection
- React frontend with Clerk authentication (Sign In / Sign Up)
- **Inngest integration** — `sync-user` and `delete-user-from-db` functions triggered by Clerk webhooks (`clerk/user.created`, `clerk/user.deleted`)
- **User model** — persisted to MongoDB with `clerkId`, `name`, `email`, `profileImage`
- Production build workflow (backend serves built frontend)

## Planned

- Real-time video/chat via Stream
- Additional Inngest functions (sync with Stream)

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

## Setup

1. Copy `.env.example` files in both `backend/` and `frontend/` to `.env` and fill in credentials.
2. `npm run build` (root) — installs deps and builds frontend.
3. `npm run start` (root) — starts the server on the configured port.
