import db from "../config/db.js";

const Alert = {
  getAll: async () => {
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM Alert", (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error fetching alerts: " + err.message);
    }
  },

  getById: async (id) => {
    if (!id) throw new Error("Alert ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM Alert WHERE alert_id = ?", [id], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error fetching alert: " + err.message);
    }
  },

  create: async (newAlert) => {
    try {
      const insertId = await new Promise((resolve, reject) => {
        db.query("INSERT INTO Alert SET ?", newAlert, (err, results) => {
          if (err) return reject(err);
          resolve(results.insertId);
        });
      });
      return insertId;
    } catch (err) {
      throw new Error("Error creating alert: " + err.message);
    }
  },

  update: async (id, updatedAlert) => {
    if (!id) throw new Error("Alert ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("UPDATE Alert SET ? WHERE alert_id = ?", [updatedAlert, id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error updating alert: " + err.message);
    }
  },

  delete: async (id) => {
    if (!id) throw new Error("Alert ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("DELETE FROM Alert WHERE alert_id = ?", [id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error deleting alert: " + err.message);
    }
  },
};

export default Alert;
