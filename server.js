import server from "./app.js";
import { initWaterLevelWebSocket } from "./sockets/waterLevelSocket.js";
import { WebSocketServer } from "ws";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3030;

initWaterLevelWebSocket(server);
// Start WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });
wss.on("connection", (ws) => {
  connectedClients++;
  console.log(`Client connected. Total clients: ${connectedClients}`);

  // Kirim jumlah klien yang terhubung ke semua klien
  broadcast(`Client count: ${connectedClients}`);

  ws.on("message", (message) => {
    console.log("Received: %s", message);

    // Kirim balasan ke klien
    ws.send("Message received");

    // Broadcast pesan ke semua klien (misalnya, untuk update data)
    broadcast(message);
  });

  ws.on("close", () => {
    connectedClients--;
    console.log(`Client disconnected. Total clients: ${connectedClients}`);

    // Kirim jumlah klien yang terhubung ke semua klien
    broadcast(`Client count: ${connectedClients}`);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
