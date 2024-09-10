import Sensor from "../models/sensor.js";
import { waterLevelsNamespace } from "../sockets/waterLevelSocket.js";
// import { waterLevelsNamespace } from "../sockets/waterLevelSocket.js";

const shareDataWaterLevel = async (data) => {
  //   const sensorID = data.sensorId;
  console.log("Received water level data:", data);
  try {
    const sensorData = await Sensor.getById(data.sensor_id);
    if (!sensorData || sensorData.length === 0) {
      console.log("Sensor data not found");
      return;
    }

    const waterLevelDate = new Date(data.timestamp);
    const combinedData = {
      location: sensorData[0].location,
      water_level: data.water_level,
      timestamp: waterLevelDate,
      sensorId: data.sensor_id, // Add sensorId to the data
    };
    // Emit data to WebSocket clients yang terhubung ke sensor tertentu
    waterLevelsNamespace.to(data.sensor_id).emit("water-level", combinedData);
    return console.log("Emitting new water level data to clients:", combinedData);
  } catch (err) {
    console.error("Error creating water level:", err);
  }
};

export default shareDataWaterLevel;
