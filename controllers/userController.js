import User from "../models/user.js";
import createResponse from "../utils/responseFormat.js";

/*
user controller berguna untuk mengelola logika untuk management USER

*/

// Get all users
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.getAll();
//     res.json(createResponse("Users fetched successfully", users));
//   } catch (err) {
//     res.status(500).json(createResponse("Error fetching users", err.message));
//   }
// };

// paginated data
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const users = await User.getPaginated(page, limit);
    const totalItems = await User.count();

    res.json(
      createResponse("Users fetched successfully", {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        users,
      })
    );
  } catch (err) {
    res.status(500).json(createResponse("Error fetching users", err.message));
  }
};

// Get a single user
export const getUser = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json(createResponse("User not found", null));
    }
    res.json(createResponse("User successfully founded", user));
  } catch (err) {
    res.status(500).json(createResponse("Error fetching user", err.message));
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const newUser = req.body;

  // Validate request body
  if (!newUser.name || !newUser.email || !newUser.phone_number || !newUser.location || !newUser.latitude || !newUser.longitude) {
    return res.status(400).json(createResponse("All fields are required"));
  }

  try {
    const insertId = await User.create(newUser);
    res.status(201).json(createResponse("User created successfully", { userId: insertId }));
  } catch (err) {
    console.error("Error creating user:", err); // Log error for debugging
    res.status(500).json(createResponse("Error creating user", err.message));
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  try {
    const result = await User.update(id, updatedUser);
    if (!result) {
      return res.status(404).json(createResponse("User not found", null));
    }
    res.json(createResponse("User updated successfully", { updatedId: id }));
  } catch (err) {
    res.status(500).json(createResponse("Error updating user", err.message));
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.delete(id);
    if (!result) {
      return res.status(404).json(createResponse("User not found", null));
    }
    res.json(createResponse("User deleted successfully", { deletedId: id }));
  } catch (err) {
    res.status(500).json(createResponse("Error deleting user", err.message));
  }
};
