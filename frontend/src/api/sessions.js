import axios from "../lib/axios";

export const sessionApi = {
  createSession: (data) => axios.post("/sessions", data).then((res) => res.data),

  getActiveSessions: () => axios.get("/sessions/active").then((res) => res.data),

  getMyRecentSessions: () => axios.get("/sessions/my-recent").then((res) => res.data),

  getSessionById: (id) => axios.get(`/sessions/${id}`).then((res) => res.data),

  joinSession: (id) => axios.post(`/sessions/${id}/join`).then((res) => res.data),

  endSession: (id) => axios.post(`/sessions/${id}/end`).then((res) => res.data),

  getStreamToken: () => axios.get("/chat/token").then((res) => res.data),
};
