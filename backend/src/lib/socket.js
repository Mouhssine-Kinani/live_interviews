import { Server } from "socket.io";
import { ENV } from "./env.js";

let io;

export function initializeSocket(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: ENV.CLIENT_URL || "http://localhost:5173", credentials: true },
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error("Socket.IO has not been initialized");
  return io;
}
