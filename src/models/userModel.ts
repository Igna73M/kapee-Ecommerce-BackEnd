import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    accessToken: string;
    userRole?: string;
    otp?: string;
    otpExpiry?: number;
}

const userSchema = new Schema<IUser>({
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

export const User = model<IUser>('User', userSchema);
