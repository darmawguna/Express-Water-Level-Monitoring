import express from "express";
// import bodyParser from "body-parser";
import { initWaterLevelWebSocket } from "./sockets/waterLevelSocket.js";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
// import { WebSocketServer } from "ws";
import websocketSetup from "./sockets/websocket.js";

dotenv.config();

const app = express();
// Daftar asal (origin) yang diizinkan
const allowedOrigins = [
  "http://localhost:5173", // Aplikasi Web saat pengembangan
  "http://192.168.100.126:5173", // alamat IP laptop Nanda
  "http://192.168.100.126", // alamat IP laptop klien
];

// Opsi CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Memeriksa apakah asal (origin) termasuk dalam daftar yang diizinkan
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

// Gunakan middleware CORS dengan opsi yang disesuaikan
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
import sensorRoutes from "./routes/sensorRoutes.js";
import waterLevelRoutes from "./routes/waterlevelRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
app.use("/api/sensors", sensorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/waterlevels", waterLevelRoutes);
app.use("/alerts", alertRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3030;
// export default server;

// Start WebSocket server
// startWebSocketServer(WS_PORT);
websocketSetup(WS_PORT);
initWaterLevelWebSocket(server);

server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
