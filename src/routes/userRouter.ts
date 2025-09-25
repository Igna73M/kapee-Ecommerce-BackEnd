import { registerUser, loginUser, logoutUser, getUsers } from "../controllers/userController";
import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authentication";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", requireSignin, logoutUser);
router.get("/users", requireSignin, isAdmin, getUsers); // New route to get list of users

export default router;
