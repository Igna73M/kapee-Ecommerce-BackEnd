import { Request, Response } from "express";
import ContactModel from "../models/contact";
import mailSender from "../utils/mailSender";
import dotenv from "dotenv";

dotenv.config();

const adminEmail = process.env.Admin_Email || "";

export const contactSupport = async (req: Request & { user?: any }, res: Response) => {
    try {
        const { email, message } = req.body;
        const userId = req.user?._id;

        if (!email || !message) {
            return res.status(400).json({ message: "Email and message are required." });
        }

        const contact = new ContactModel({ userId, email, message });
        await contact.save();


        // Notify user
        await mailSender(
            process.env.Email_User || "", // from
            email, // to user
            "Your support request has been received!",
            `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Hi${req.user?.name ? " " + req.user.name : ""},</p>
            <p>Thank you for reaching out to <strong>Kapee Support</strong>!</p>
            <p>We have received your message:</p>
            <blockquote style="background: #f9f9f9; border-left: 4px solid #007bff; margin: 10px 0; padding: 10px;">
                ${message}
            </blockquote>
            <p>Our support team is reviewing your request and will get back to you as soon as possible. If you have any additional information or questions, feel free to reply to this email.</p>
            <p>Best regards,<br/>Kapee Support Team</p>
            </div>
            `
        );

        // Notify admin
        await mailSender(
            email,
            adminEmail, // to admin
            "New Support Request Received",
            `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>New Support Message</h2>
            <p><strong>From:</strong> ${email}${req.user?.name ? " (" + req.user.name + ")" : ""}</p>
            <p><strong>User ID:</strong> ${userId || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; border-left: 4px solid #007bff; margin: 10px 0; padding: 10px;">
                ${message}
            </blockquote>
            <p>View more details in the <a href="https://your-admin-dashboard-url">admin dashboard</a>.</p>
            </div>
            `
        );

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
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }
        if (req.user.userRole !== "admin") {
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