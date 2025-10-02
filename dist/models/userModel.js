"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: false },
    accessToken: { type: String },
    userRole: { type: String, enum: ['user', 'admin'], default: 'user' },
    otp: { type: String },
    otpExpiry: { type: Number },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
