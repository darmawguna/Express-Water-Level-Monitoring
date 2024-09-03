// app.js
import express from "express";
import server from "./app.js";
import http from "http";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3030;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create HTTP server
const server = http.createServer(app);

// Start WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.on("message", (message) => {
    console.log("Received:", message);
    ws.send("Message received");
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log(`WebSocket server running on ws://localhost:${WS_PORT}`);

server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
