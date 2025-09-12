import { User } from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "../utils/tokenGeneration";

import bcryptjs from "bcryptjs";

// Register user
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, username, userRole } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        const newUser = new User({ username, email, password: hashedPassword, userRole });

        const token = generateAccessToken(newUser);
        newUser.accessToken = token;
        await newUser.save();
        return res.status(201).json({ message: "User created successfully", newUser });

    }
    catch (error) {
        return res.status(400).json({ message: "Error in user signin", error });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateAccessToken(user);
        user.accessToken = token;
        await user.save();

        return res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        return res.status(400).json({ message: "Error in user login", error });
    }
};

// Logout user
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.accessToken = "";
        await user.save();

        return res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        return res.status(400).json({ message: "Error in user logout", error });
    }
};
