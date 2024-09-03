import db from "../config/db.js";

const User = {
  getPaginated: async (page, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM user LIMIT ? OFFSET ?", [limit, offset], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error fetching paginated users: " + err.message);
    }
  },
  count: async () => {
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) AS total FROM user", (err, results) => {
          if (err) return reject(err);
          resolve(results[0].total);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error counting users: " + err.message);
    }
  },

  getAll: async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM user", (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return result;
    } catch (err) {
      throw new Error("Error fetching user: " + err.message);
    }
  },
  getById: async (id) => {
    if (!id) throw new Error("User ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM user WHERE id = ?", [id], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error fetching alert: " + err.message);
    }
  },
  create: async (newUser) => {
    try {
      const insertId = await new Promise((resolve, reject) => {
        db.query("INSERT INTO user SET ?", newUser, (err, results) => {
          if (err) return reject(err);
          resolve(results.insertId);
        });
      });
      return insertId;
    } catch (err) {
      throw new Error("Error creating user: " + err.message);
    }
  },
  update: async (id, updateUser) => {
    if (!id) throw new Error("Sensor ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("UPDATE user SET ? WHERE id = ?", [updateUser, id], (err, results) => {
          if (err) return reject(err);
          console.log(results);
          resolve(results);
        });
      });
      return id;
    } catch (err) {
      throw new Error("Error updating user: " + err.message);
    }
  },
  delete: async (id) => {
    if (!id) throw new Error("User ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("DELETE FROM user WHERE id = ?", [id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error deleting user: " + err.message);
    }
  },
};

export default User;
