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
exports.getAllContacts = exports.contactSupport = void 0;
const contact_1 = __importDefault(require("../models/contact"));
const mailSender_1 = __importDefault(require("../utils/mailSender"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const adminEmail = process.env.Admin_Email || "";
const contactSupport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { email, message } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!email || !message) {
            return res.status(400).json({ message: "Email and message are required." });
        }
        const contact = new contact_1.default({ userId, email, message });
        yield contact.save();
        // Notify user
        yield (0, mailSender_1.default)(process.env.Email_User || "", // from
        email, // to user
        "Your support request has been received!", `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Hi${((_b = req.user) === null || _b === void 0 ? void 0 : _b.name) ? " " + req.user.name : ""},</p>
            <p>Thank you for reaching out to <strong>Kapee Support</strong>!</p>
            <p>We have received your message:</p>
            <blockquote style="background: #f9f9f9; border-left: 4px solid #007bff; margin: 10px 0; padding: 10px;">
                ${message}
            </blockquote>
            <p>Our support team is reviewing your request and will get back to you as soon as possible. If you have any additional information or questions, feel free to reply to this email.</p>
            <p>Best regards,<br/>Kapee Support Team</p>
            </div>
            `);
        // Notify admin
        yield (0, mailSender_1.default)(email, adminEmail, // to admin
        "New Support Request Received", `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>New Support Message</h2>
            <p><strong>From:</strong> ${email}${((_c = req.user) === null || _c === void 0 ? void 0 : _c.name) ? " (" + req.user.name + ")" : ""}</p>
            <p><strong>User ID:</strong> ${userId || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; border-left: 4px solid #007bff; margin: 10px 0; padding: 10px;">
                ${message}
            </blockquote>
            <p>View more details in the <a href="https://your-admin-dashboard-url">admin dashboard</a>.</p>
            </div>
            `);
        res.status(200).json({ message: "Message sent successfully." });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to send message.",
            error: err instanceof Error ? err.message : String(err)
        });
    }
});
exports.contactSupport = contactSupport;
// GET /support/messages - Admin: Get all contact messages
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }
        if (req.user.userRole !== "admin") {
            return res.status(403).json({ message: "Admin access required." });
        }
        const contacts = yield contact_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to fetch messages.",
            error: err instanceof Error ? err.message : String(err)
        });
    }
});
exports.getAllContacts = getAllContacts;
