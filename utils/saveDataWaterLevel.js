import WaterLevel from "../models/waterlevel.js";

const saveDataWaterLevel = async (data) => {
  const newWaterLevel = data;
  //   console.log("data dari saveDataWaterLevel:", newWaterLevel);

  if (!newWaterLevel.sensor_id || !newWaterLevel.timestamp || !newWaterLevel.water_level) {
    return console.log("data not completed");
  }
  const insertId = await WaterLevel.create(newWaterLevel);
  console.log("insertId:", insertId);

  return;
};

export default saveDataWaterLevel;
