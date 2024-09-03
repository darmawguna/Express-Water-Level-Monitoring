import Alert from "../models/alert.js";
import createResponse from "../utils/responseFormat.js";

export const getAllAlerts = async (req, res) => {
  try {
    const results = await Alert.getAll();
    res.json(createResponse("Alerts fetched successfully", results));
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json(createResponse("Error fetching alerts", err.message));
  }
};

export const getSelectedAlert = async (req, res) => {
  const { id } = req.params;
  // Simple validation
  if (!id) {
    return res.status(400).json(createResponse("Alert ID is required", null));
  }

  try {
    const result = await Alert.getById(id);
    if (!result) {
      return res.status(404).json(createResponse("Alert not found", null));
    }
    res.json(createResponse("Alert successfully found", result));
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json(createResponse("Error fetching alert", err.message));
  }
};

// Implement other controller methods similarly...
