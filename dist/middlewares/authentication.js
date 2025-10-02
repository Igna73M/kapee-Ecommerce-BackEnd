"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.requireSignin = exports.JWT_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = require("../models/userModel");
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const requireSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
        }
        catch (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token." });
        }
        const user = yield userModel_1.User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found." });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: "Server error during authentication.", error: error instanceof Error ? error.message : String(error) });
    }
});
exports.requireSignin = requireSignin;
const isAdmin = (req, res, next) => {
    if (req.user && (req.user.userRole === "admin" || req.user.role === "admin")) {
        next();
    }
    else {
        return res.status(403).json({ message: "Admin access required." });
    }
};
exports.isAdmin = isAdmin;
