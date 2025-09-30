import { User } from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "../utils/tokenGeneration";

import bcryptjs from "bcryptjs";
import validator from "validator";
import mailSender from "../utils/mailSender";

// Helper to sanitize and validate user input
function sanitizeUserInput({ email, username, userRole, firstname, lastname }: { email: string, username: string, userRole: string, firstname: string, lastname: string }) {
    // Validate email
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format");
    }
    // Sanitize username
    const cleanUsername = validator.escape(validator.trim(username));
    // Whitelist userRole
    const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(userRole)) {
        throw new Error("Invalid user role");
    }
    return {
        email: validator.normalizeEmail(email) || "",
        username: cleanUsername,
        userRole,
        firstname: validator.escape(validator.trim(firstname)),
        lastname: validator.escape(validator.trim(lastname)),
    };
}

// Register user
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { email, password, username, userRole, firstname, lastname } = req.body;
        // Sanitize and validate input
        ({ email, username, userRole, firstname, lastname } = sanitizeUserInput({ email, username, userRole, firstname, lastname }));

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Prevent multiple admins
        if (userRole === "admin") {
            const adminExists = await User.findOne({ userRole: "admin" });
            if (adminExists) {
                return res.status(403).json({ message: "Unauthorized action! Admin user already exists." });
            }
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        const newUser = new User({ username, email, password: hashedPassword, userRole, firstname, lastname });

        const token = generateAccessToken(newUser);
        newUser.accessToken = token;
        await newUser.save();
        return res.status(201).json({ message: "User created successfully", newUser });

    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : String(error);
        return res.status(400).json({ message: "Error in user signin", error: errorMessage });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { email, password } = req.body;
        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        email = validator.normalizeEmail(email) || "";

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

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : String(error);
        return res.status(400).json({ message: "Error in user login", error: errorMessage });
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


// get list of users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find().select('-password -accessToken'); // Exclude password and accessToken from the response
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(400).json({ message: "Error in fetching users", error });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate OTP code (6 digits)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP and store in user document (add otp and otpExpires fields to userModel if needed)
        const hashedOtp = await bcryptjs.hash(otp, 10);
        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
        await user.save();

        // Send OTP to user's email
        await mailSender(
            process.env.Email_User || "",
            email,
            "Your OTP Code for Password Reset",
            `<div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Password Reset Request</h2>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <br>
        <p>Best regards,<em>Mugabe Ignace</em>
        <br>Kapee Support Team</p>

    </div>`
        );

        return res.status(200).json({ message: "OTP sent to your email.", email, hashedOtp });
    } catch (error) {
        return res.status(500).json({ message: "Error sending OTP.", error: error instanceof Error ? error.message : String(error) });
    }
};

export const verifyOtpAndResetPassword = async (req: Request, res: Response) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "Email, OTP, and new password are required." });
        }
        const user = await User.findOne({ email });
        if (!user || !user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: "OTP not requested or expired." });
        }
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired." });
        }
        const isOtpValid = await bcryptjs.compare(otp, user.otp);
        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        // Update password
        user.password = await bcryptjs.hash(newPassword, 16);
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        return res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        return res.status(500).json({ message: "Error resetting password.", error: error instanceof Error ? error.message : String(error) });
    }
};


export const changePassword = async (req: Request & { user?: any }, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Current and new password are required." });
        }
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized." });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const isMatch = await bcryptjs.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect." });
        }
        user.password = await bcryptjs.hash(newPassword, 16);
        await user.save();
        return res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Error changing password.", error: error instanceof Error ? error.message : String(error) });
    }
};

export const sendLoginEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
    }
    try {
        await mailSender(
            process.env.Email_User || "",
            email,
            "Login Notification",
            `<h2>Login Alert</h2><p>Your account was just logged in. If this wasn't you, please reset your password immediately.</p>`
        );
        res.status(200).json({ success: true, message: "Login email sent." });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to send email.", error: err });
    }
};