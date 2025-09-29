import { Request, Response } from "express";
import ContactModel from "../models/contact";

export const contactSupport = async (req: Request & { user?: any }, res: Response) => {
    try {
        const { email, message } = req.body;
        const userId = req.user?._id; // Get user ID if authenticated

        if (!email || !message) {
            return res.status(400).json({ message: "Email and message are required." });
        }

        const contact = new ContactModel({ userId, email, message });
        await contact.save();

        res.status(200).json({ message: "Message sent successfully." });
    } catch (err) {
        res.status(500).json({
            message: "Failed to send message.",
            error: err instanceof Error ? err.message : String(err)
        });
    }
};

// GET /support/messages - Admin: Get all contact messages
export const getAllContacts = async (req: Request & { user?: any }, res: Response) => {
    try {
        // Check for authentication and admin access
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin access required." });
        }

        const contacts = await ContactModel.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch messages.",
            error: err instanceof Error ? err.message : String(err)
        });
    }
};