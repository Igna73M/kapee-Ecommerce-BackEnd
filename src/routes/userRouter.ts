import { registerUser, loginUser, logoutUser, getUsers } from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users", getUsers); // New route to get list of users

export default router;
