import { Server as WebSocketServer } from "socket.io";

export let waterLevelsNamespace;

export function initWaterLevelWebSocket(server) {
    const io = new WebSocketServer(server);

  // Namespace untuk WebSocket di route /water-levels
  waterLevelsNamespace = io.of("/water-levels");

  let connectedClients = 0;

  waterLevelsNamespace.on("connection", (socket) => {
    connectedClients++;
    console.log(`User connected to /water-levels. Total clients: ${connectedClients}`);

    waterLevelsNamespace.emit("clientCount", connectedClients);

    socket.on("disconnect", () => {
      connectedClients--;
      console.log(`User disconnected from /water-levels. Total clients: ${connectedClients}`);
      waterLevelsNamespace.emit("clientCount", connectedClients);
    });

    // Ketika client memilih sensor
    socket.on("selectSensor", (sensorId) => {
      console.log(`Client ${socket.id} selected sensor: ${sensorId}`);
      socket.join(sensorId); // Masukkan client ke room berdasarkan sensorId
      // Emit pesan selamat datang dengan sensor yang dipilih
      socket.emit("sensorSelected", `You have joined the room for sensor: ${sensorId}`);
    });

    socket.on("waterLevel", (msg) => {
      console.log("Received water level on /water-levels: " + msg);
      socket.emit("response", "water level received: " + msg);
    });
  });

  return io;
}
