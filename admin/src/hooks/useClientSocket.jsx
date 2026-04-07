import { useEffect } from "react";
import socket from "../utils/socket";
import axios from "axios";

export const useClientSocket = (clientId) => {
  useEffect(() => {
    if (!clientId) return;

    // Connect socket
    if (!socket.connected) socket.connect();

    const sendOnlineStatus = async () => {
      try {
        const res = await axios.get("https://api.ipify.org?format=json");
        const ipAddress = res.data.ip;

        socket.emit("client-online", { clientId, ipAddress });
      } catch (err) {
        console.error("Failed to fetch IP:", err);
      }
    };

    sendOnlineStatus();

    return () => {
      // Emit logout before disconnecting
      if (socket.connected) {
        socket.emit("client-logout", { clientId });
        socket.disconnect();
      }
    };
  }, [clientId]);
};