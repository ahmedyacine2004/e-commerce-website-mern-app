import Client from "../models/client.model.js";

// GET all clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().select(
      "fullName email phone gender profilePicture isVerified ipAddress status blockedIPs createdAt updatedAt",
    );

    const clientsWithStatus = clients.map((c) => ({
      ...c.toObject(),
      blockedIPs: c.blockedIPs || [],
      status: c.status || "offline",
    }));

    res.json(clientsWithStatus);
  } catch (error) {
    console.error("Get clients error:", error);
    res.status(500).json({ message: error.message });
  }
};

// BLOCK / UNBLOCK IP
export const toggleBlockedIP = async (req, res) => {
  try {
    const { id } = req.params;
    const { ip } = req.body;

    if (!ip) return res.status(400).json({ message: "IP required" });

    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    // Ensure array exists
    if (!Array.isArray(client.blockedIPs)) {
      client.blockedIPs = [];
    }

    if (client.blockedIPs.includes(ip)) {
      client.blockedIPs = client.blockedIPs.filter((blocked) => blocked !== ip);
    } else {
      client.blockedIPs.push(ip);
    }

    await client.save();

    res.json({
      message: "Blocked IP updated",
      blockedIPs: client.blockedIPs,
    });
  } catch (error) {
    console.error("Toggle IP error:", error);
    res.status(500).json({ message: error.message });
  }
};
