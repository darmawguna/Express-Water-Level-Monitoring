import Sensor from "../models/sensor.js";
import createResponse from "../utils/responseFormat.js";



export const getAllSensors = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const sensors = await Sensor.getPaginated(page, limit);
    const totalItems = await Sensor.count();
    res.json(
      createResponse("Sensors fetched successfully", {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        sensors,
      })
    );
  } catch (err) {
    res.status(500).json(createResponse("Error fetching sensors", err.message));
  }
};

export const getSensor = async (req, res) => {
  try {
    const sensor = await Sensor.getById(req.params.id);
    if (!sensor) {
      return res.status(404).json(createResponse("Sensor not found", null));
    }
    res.json(createResponse("Sensor successfully founded", sensor));
  } catch (err) {
    res.status(500).json(createResponse("Error fetching sensors", err.message));
  }
};

export const createSensor = async (req, res) => {
  const newSensor = req.body;
  console.log(newSensor);
  if (
    !newSensor.description ||
    !newSensor.installation_date ||
    !newSensor.status ||
    !newSensor.location ||
    !newSensor.latitude ||
    !newSensor.longitude
  ) {
    return res.status(400).json(createResponse("All fields are required"));
  }
  try {
    const insertId = await Sensor.create(newSensor);
    res.status(201).json(createResponse("Sensor created successfully", { sensorId: insertId }));
  } catch (err) {
    res.status(500).json(createResponse("Error creating sensor", err.message));
  }
};

export const updateSensor = async (req, res) => {
  const { id } = req.params;
  const updateSensor = req.body;
  try {
    const result = await Sensor.update(id, updateSensor);
    if (!result) {
      return res.status(404).json(createResponse("Sensor not found", null));
    }
    res.json(createResponse("Sensor updated successfully", { updatedId: id }));
  } catch (err) {
    res.status(500).json(createResponse("Error updating sensor" + err.message));
  }
};

export const deleteSensor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Sensor.delete(id);
    if (!result) {
      return res.status(404).json(createResponse("Sensor not found", null));
    }
    res.json(createResponse("Sensor deleted successfully", { deletedId: id }));
  } catch (err) {
    res.status(500).json(createResponse("Error deleting sensor" + err.message));
  }
};
