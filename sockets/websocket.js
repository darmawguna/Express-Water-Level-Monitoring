import { WebSocketServer } from "ws";

const websocketSetup = (port) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", (message) => {
      const data = JSON.parse(message);
      console.log(data);
      ws.send("Message received");
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  console.log(`WebSocket server running on ws://localhost:${port}`);
};

export default websocketSetup;

export function startWebSocketServer(port) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", (message) => {
      console.log("Received:", message);
      const data = JSON.parse(message);
      console.log(data);
      ws.send("Message received");
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  console.log(`WebSocket server running on ws://localhost:${port}`);
}
