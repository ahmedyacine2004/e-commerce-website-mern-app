// index.js
import app from "./app.js";
import { createServer } from "http";
import { initSocket } from "./src/config/socket.js";

const server = createServer(app);

// Initialize Socket.IO
initSocket(server);

// IMPORTANT: start the HTTP server, not express
server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
