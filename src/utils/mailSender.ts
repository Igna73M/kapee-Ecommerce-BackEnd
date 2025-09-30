import nodemailer from 'nodemailer';
import { Transporter, SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


// create a nodemailer transporter using Gmail SMTP
const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email_User,
        pass: process.env.Email_Password,
    },
    tls: { rejectUnauthorized: false }
});

// function to send email
const mailSender = async (
    from: string = process.env.Email_User || '',
    to: string,
    subject: string,
    htmlContent?: string,
): Promise<boolean> => {
    const mailOptions: SendMailOptions = {
        from,
        to,
        subject,
        html: htmlContent, // this sets content-type to text/html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
        return true;
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
        throw error;
    }
};

export default mailSender;