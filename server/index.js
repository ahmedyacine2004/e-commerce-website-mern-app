// index.js
import app from "./app.js";
import { createServer } from "http";
import { initSocket } from "./src/config/socket.js";

const PORT = process.env.PORT || 3000;

// Create HTTP server from Express app
const server = createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start the HTTP server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
  console.log(`📄 OpenAPI JSON available at http://localhost:${PORT}/api-docs.json`);
});