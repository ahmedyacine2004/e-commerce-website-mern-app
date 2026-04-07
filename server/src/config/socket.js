// server/src/config/socket.js
import { Server } from "socket.io";
import Client from "../models/client.model.js";

let io;
const onlineClients = {}; // { clientId: { socketId, ipAddress } }

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Client login or heartbeat
    socket.on("client-online", async ({ clientId, ipAddress }) => {
      onlineClients[clientId] = { socketId: socket.id, ipAddress };

      try {
        await Client.findByIdAndUpdate(clientId, {
          status: "online",
          lastActiveAt: new Date(),
          ipAddress,
        });

        io.emit("update-client-status", {
          clientId,
          status: "online",
          ipAddress,
        });
      } catch (err) {
        console.error("Error updating client online status:", err);
      }
    });

    // Client logout
    socket.on("client-logout", async ({ clientId }) => {
      try {
        if (!clientId) return;

        // Remove from onlineClients
        delete onlineClients[clientId];

        // Update DB
        await Client.findByIdAndUpdate(clientId, {
          status: "offline",
          lastActiveAt: new Date(),
        });

        // Notify admin dashboard
        io.emit("update-client-status", { clientId, status: "offline" });
      } catch (err) {
        console.error("Error logging out client via socket:", err);
      }
    });

    // Handle disconnect
    socket.on("disconnect", async () => {
      const clientId = Object.keys(onlineClients).find(
        (id) => onlineClients[id].socketId === socket.id,
      );

      if (clientId) {
        delete onlineClients[clientId];

        try {
          await Client.findByIdAndUpdate(clientId, {
            status: "offline",
            lastActiveAt: new Date(),
          });

          io.emit("update-client-status", { clientId, status: "offline" });
        } catch (err) {
          console.error("Socket disconnect error:", err);
        }
      }
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
