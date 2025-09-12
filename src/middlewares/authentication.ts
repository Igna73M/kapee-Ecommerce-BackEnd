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
        if (req.headers.authorization) {
            const authHeader = req.headers.authorization;
            const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
            const decoded: any = jwt.verify(token, JWT_SECRET); //verify token
            const user = await User.findOne({
                _id: decoded._id,
                "tokens.token": token,
            });
            if (!user) {
                throw new Error("User not found");
            }
            req.user = user;
            next();
        } else {
            throw new Error("Authentication is required");
        }
    } catch (error) {
        return res.status(401).json({ message: "Authorization required" });
    }
};

export const isAdmin = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    if (req.user && req.user.userRole === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Admin access required" });
    }
};
