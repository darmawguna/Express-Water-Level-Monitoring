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
};

export default WaterLevel;
