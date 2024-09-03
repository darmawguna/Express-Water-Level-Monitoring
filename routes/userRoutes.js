import express from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

/*
userRoutes digunakan untuk mendaftarkan End Point User
terhubung dengan userController 
contoh : localhost:3000/users
*/

// Route untuk Management USER
// router.get("/", getAllUsers);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;
