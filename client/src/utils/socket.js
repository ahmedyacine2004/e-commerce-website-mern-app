// src/utils/socket.js
import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
const socketUrl = apiUrl?.replace(/\/api\/?$/i, "") || "http://localhost:5000";

// Singleton Socket.IO client for the user app
// Do NOT auto-connect until login/refresh restores the user
const socket = io(socketUrl, {
  autoConnect: false,
  reconnection: true,
});

export default socket;
