// src/controllers/socketAdmin.controller.js
import Client from "../models/client.model.js";
import { getIO } from "../config/socket.js";

// Emit client status manually (if needed in other controllers)
export const emitClientStatus = async (clientId, status) => {
  const io = getIO();
  const client = await Client.findById(clientId);
  if (client) {
    io.emit("update-client-status", {
      clientId,
      status,
      ipAddress: client.ipAddress || null,
    });
  }
};