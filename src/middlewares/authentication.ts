import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export const requireSignin = async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
        let decoded: any;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token." });
        }
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found." });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error during authentication.", error: error instanceof Error ? error.message : String(error) });
    }
};

export const isAdmin = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    if (req.user && (req.user.userRole === "admin" || req.user.role === "admin")) {
        next();
    } else {
        return res.status(403).json({ message: "Admin access required." });
    }
};