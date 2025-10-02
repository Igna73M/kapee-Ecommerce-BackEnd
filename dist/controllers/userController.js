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
exports.sendLoginEmail = exports.changePassword = exports.verifyOtpAndResetPassword = exports.forgotPassword = exports.getUsers = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = require("../models/userModel");
const tokenGeneration_1 = require("../utils/tokenGeneration");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const mailSender_1 = __importDefault(require("../utils/mailSender"));
// Helper to sanitize and validate user input
function sanitizeUserInput({ email, username, userRole, firstname, lastname }) {
    // Validate email
    if (!validator_1.default.isEmail(email)) {
        throw new Error("Invalid email format");
    }
    // Sanitize username
    const cleanUsername = validator_1.default.escape(validator_1.default.trim(username));
    // Whitelist userRole
    const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(userRole)) {
        throw new Error("Invalid user role");
    }
    return {
        email: validator_1.default.normalizeEmail(email) || "",
        username: cleanUsername,
        userRole,
        firstname: validator_1.default.escape(validator_1.default.trim(firstname)),
        lastname: validator_1.default.escape(validator_1.default.trim(lastname)),
    };
}
// Register user
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password, username, userRole, firstname, lastname } = req.body;
        // Sanitize and validate input
        ({ email, username, userRole, firstname, lastname } = sanitizeUserInput({ email, username, userRole, firstname, lastname }));
        const existingUser = yield userModel_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Prevent multiple admins
        if (userRole === "admin") {
            const adminExists = yield userModel_1.User.findOne({ userRole: "admin" });
            if (adminExists) {
                return res.status(403).json({ message: "Unauthorized action! Admin user already exists." });
            }
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 16);
        const newUser = new userModel_1.User({ username, email, password: hashedPassword, userRole, firstname, lastname });
        const token = (0, tokenGeneration_1.generateAccessToken)(newUser);
        newUser.accessToken = token;
        yield newUser.save();
        return res.status(201).json({ message: "User created successfully", newUser });
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : String(error);
        return res.status(400).json({ message: "Error in user signin", error: errorMessage });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        // Validate email
        if (!validator_1.default.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        email = validator_1.default.normalizeEmail(email) || "";
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = (0, tokenGeneration_1.generateAccessToken)(user);
        user.accessToken = token;
        yield user.save();
        return res.status(200).json({
            message: "Login successful",
            user: {
                username: user.username,
                userRole: user.userRole,
                accessToken: user.accessToken,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : String(error);
        return res.status(400).json({ message: "Error in user login", error: errorMessage });
    }
});
exports.loginUser = loginUser;
// Logout user
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield userModel_1.User.findOne({ email: validator_1.default.normalizeEmail(email) });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        user.accessToken = "";
        yield user.save();
        return res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        return res.status(400).json({ message: "Error in user logout", error });
    }
});
exports.logoutUser = logoutUser;
// get list of users
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find().select('-password -accessToken'); // Exclude password and accessToken from the response
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(400).json({ message: "Error in fetching users", error });
    }
});
exports.getUsers = getUsers;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }
        const user = yield userModel_1.User.findOne({ email: validator_1.default.normalizeEmail(email) });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Generate OTP code (6 digits)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Hash OTP and store in user document (add otp and otpExpires fields to userModel if needed)
        const hashedOtp = yield bcryptjs_1.default.hash(otp, 10);
        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
        yield user.save();
        // Send OTP to user's email
        yield (0, mailSender_1.default)(process.env.Email_User || "", email, "Your OTP Code for Password Reset", `<div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Password Reset Request</h2>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <br>
        <p>Best regards,<em>Mugabe Ignace</em>
        <br>Kapee Support Team</p>

    </div>`);
        return res.status(200).json({ message: "OTP sent to your email.", email, hashedOtp });
    }
    catch (error) {
        return res.status(500).json({ message: "Error sending OTP.", error: error instanceof Error ? error.message : String(error) });
    }
});
exports.forgotPassword = forgotPassword;
const verifyOtpAndResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "Email, OTP, and new password are required." });
        }
        const user = yield userModel_1.User.findOne({ email: validator_1.default.normalizeEmail(email) });
        if (!user || !user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: "OTP not requested or expired." });
        }
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired." });
        }
        const isOtpValid = yield bcryptjs_1.default.compare(otp, user.otp);
        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP." });
        }
        // Update password
        user.password = yield bcryptjs_1.default.hash(newPassword, 16);
        user.otp = undefined;
        user.otpExpiry = undefined;
        yield user.save();
        return res.status(200).json({ message: "Password reset successful." });
    }
    catch (error) {
        return res.status(500).json({ message: "Error resetting password.", error: error instanceof Error ? error.message : String(error) });
    }
});
exports.verifyOtpAndResetPassword = verifyOtpAndResetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Current and new password are required." });
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized." });
        }
        const user = yield userModel_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const isMatch = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect." });
        }
        user.password = yield bcryptjs_1.default.hash(newPassword, 16);
        yield user.save();
        return res.status(200).json({ message: "Password changed successfully." });
    }
    catch (error) {
        return res.status(500).json({ message: "Error changing password.", error: error instanceof Error ? error.message : String(error) });
    }
});
exports.changePassword = changePassword;
const sendLoginEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
    }
    try {
        yield (0, mailSender_1.default)(process.env.Email_User || "", email, "Login Notification", `<h2>Login Alert</h2><p>Your account was just logged in. If this wasn't you, please reset your password immediately.</p>`);
        res.status(200).json({ success: true, message: "Login email sent." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to send email.", error: err });
    }
});
exports.sendLoginEmail = sendLoginEmail;
