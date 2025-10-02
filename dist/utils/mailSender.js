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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// create a nodemailer transporter using Gmail SMTP
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email_User,
        pass: process.env.Email_Password,
    },
    tls: { rejectUnauthorized: false }
});
// function to send email
const mailSender = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (from = process.env.Email_User || '', to, subject, htmlContent) {
    const mailOptions = {
        from,
        to,
        subject,
        html: htmlContent, // this sets content-type to text/html
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
        return true;
    }
    catch (error) {
        console.error(`Error sending email to ${to}:`, error);
        throw error;
    }
});
exports.default = mailSender;
