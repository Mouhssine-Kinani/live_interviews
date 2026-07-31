import express from "express";
import { createServer } from "node:http";
import path from "path";
import cors from "cors";
import { Server } from "socket.io";
import { serve } from "inngest/express"
import { clerkMiddleware } from '@clerk/express'

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest , functions} from "./lib/inngest.js";

import chatRoutes from "./routes/chat.routes.js"
import sessionRoutes from "./routes/session.routes.js"
import codeRoutes from "./routes/code.routes.js"

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ENV.CLIENT_URL || "http://localhost:5173", credentials: true },
});
const editorStates = new Map();

const __dirname = path.resolve();

//middelware
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware())

app.use("/api/inngest", serve({ client: inngest, functions}))
app.use("/api/chat", chatRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/api", codeRoutes)

//make my app ready for deployment :
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/", "dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "sucess from backend" });
});

io.on("connection", (socket) => {
  socket.on("editor:join", ({ sessionId }, acknowledge) => {
    if (typeof sessionId !== "string" || !sessionId) return;

    const room = `editor:${sessionId}`;
    socket.join(room);
    acknowledge?.(editorStates.get(sessionId) || null);
  });

  socket.on("editor:update", ({ sessionId, code, language }) => {
    if (
      typeof sessionId !== "string" ||
      typeof code !== "string" ||
      code.length > 1_000_000 ||
      typeof language !== "string" ||
      language.length > 40
    ) {
      return;
    }

    const room = `editor:${sessionId}`;
    if (!socket.rooms.has(room)) return;

    const editor = { code, language };
    editorStates.set(sessionId, editor);
    socket.to(room).emit("editor:update", editor);
  });
});

const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(ENV.PORT, () => {
      console.log(`server is running ✅🌐 on http://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    console.error("⛔⛔ error starting the server");
  }
};

startServer();
