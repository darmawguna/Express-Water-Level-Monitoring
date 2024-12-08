import db from "../config/db.js";

const WaterLevel = {
  create: async (newWaterLevelData) => {
    try {
      const insertId = await new Promise((resolve, reject) => {
        db.query("INSERT INTO waterlevel SET ?", newWaterLevelData, (err, results) => {
          if (err) return reject(err);
          resolve(results.insertId);
        });
      });
      return insertId;
    } catch (err) {
      throw new Error("Error creating waterlevel Data: " + err.message);
    }
  },
  getDataToModel: async (sensorId) => {
    if (!sensorId) throw new Error("Sensor ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM waterlevel WHERE sensor_id = ? ORDER BY timestamp DESC LIMIT 30", [sensorId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      const timestamps = results.map((row) => row.timestamp);
      const waterlevel = results.map((row) => row.water_level / 100);
      const data = {
        timestamps: timestamps,
        waterlevel: waterlevel,
      };
      return data;
    } catch (err) {
      throw new Error("Error fetching waterlevel data: " + err.message);
    }
  },
};

export default WaterLevel;
