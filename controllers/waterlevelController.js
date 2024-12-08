import WaterLevel from "../models/waterlevel.js";
import createResponse from "../utils/responseFormat.js";
import { waterLevelsNamespace } from "../sockets/waterLevelSocket.js";
import axios from "axios";
export const createWaterLevel = async (req, res) => {
  const newWaterLevel = req.body;

  if (!newWaterLevel.sensor_id || !newWaterLevel.timestamp || !newWaterLevel.water_level) {
    return res.status(400).json(createResponse("All fields are required"));
  }

  try {
    const sensorData = await Sensor.getById(newWaterLevel.sensor_id);
    if (!sensorData || sensorData.length === 0) {
      return res.status(404).json(createResponse("Sensor data not found"));
    }

    const waterLevelDate = new Date(newWaterLevel.timestamp);
    const combinedData = {
      location: sensorData[0].location,
      water_level: newWaterLevel.water_level,
      timestamp: waterLevelDate,
      sensorId: newWaterLevel.sensor_id, // Add sensorId to the data
    };

    const insertId = await WaterLevel.create(newWaterLevel);
    res.status(201).json(createResponse("Water Level created successfully", { WaterId: insertId }));
    console.log("Emitting new water level data to clients:", combinedData);

    // Emit data to WebSocket clients yang terhubung ke sensor tertentu
    waterLevelsNamespace.to(newWaterLevel.sensor_id).emit("water-level", combinedData);
  } catch (err) {
    console.error("Error creating water level:", err);
    res.status(500).json(createResponse("Error creating water level", err.message));
  }
};

export const getDataToModel = async (req, res) => {
  try {
    const waterLevelData = await WaterLevel.getDataToModel(req.params.id);
    if (!waterLevelData || waterLevelData.length === 0) {
      return res.status(404).json(createResponse("Data not found", null));
    }

    // Memproses data untuk mendapatkan format yang diinginkan
    const inputData = waterLevelData.waterlevel.map((level) => [level]);

    // Menyiapkan data untuk dikirim ke API lain
    const dataToSend = { input: inputData };
    console.log(dataToSend);

    // Mengirimkan data ke API lain
    const response = await axios.post("https://tdkdiketahui64-flood-monitoring.hf.space/predict", dataToSend);
    const dataPrediction = response.data;

    // Menghitung timestamp 10 jam ke depan
    const currentTimestamp = new Date();
    const timePrediction = [];
    for (let i = 1; i <= 10; i++) {
      const futureTimestamp = new Date(currentTimestamp);
      futureTimestamp.setHours(futureTimestamp.getHours() + i);
      timePrediction.push(futureTimestamp.toISOString());
    }

    const result = {
      ...waterLevelData,
      dataPrediction: {
        ...dataPrediction,
        time_prediction: timePrediction,
      },
    };

    // Mengirimkan respon dari API lain kembali ke klien
    // res.json(response.data);
    res.json(createResponse("Water Level successfully found", result));
  } catch (err) {
    res.status(500).json(createResponse("Error fetching Data", err.message));
  }
};
