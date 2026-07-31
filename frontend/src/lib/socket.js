import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") || undefined;

export function createSocket() {
  return io(socketUrl, { withCredentials: true });
}
