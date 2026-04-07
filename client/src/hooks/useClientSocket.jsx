// client/hooks/useClientSocket.jsx
import { useEffect } from "react";
import socket from "../utils/socket";
import axios from "axios";

/**
 * Hook to emit client online status on demand.
 * Optional: Only use if you need heartbeat or real-time updates.
 * @param {string} clientId - MongoDB client _id
 */
export const useClientSocket = (clientId) => {
  useEffect(() => {
    if (!clientId) return;

    // Ensure socket is connected once
    if (!socket.connected) socket.connect();

    const sendOnlineStatus = async () => {
      try {
        const res = await axios.get("https://api.ipify.org?format=json");
        const ipAddress = res.data.ip || "::1";

        socket.emit("client-online", { clientId, ipAddress });
      } catch (err) {
        console.error("Failed to fetch IP:", err);
        socket.emit("client-online", { clientId, ipAddress: "::1" });
      }
    };

    sendOnlineStatus();

    // Cleanup: emit logout on unmount
    return () => {
      if (socket.connected) {
        socket.emit("client-logout", { clientId });
        socket.disconnect();
      }
    };
  }, [clientId]);
};
