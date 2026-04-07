// src/utils/socket.js
import { io } from "socket.io-client";

// Singleton Socket.IO client for admin
const socket = io(import.meta.env.VITE_API_BASE_URL, {
  autoConnect: true, // admin dashboard connects immediately
});

export default socket;
