import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    accessToken: string;
    userRole: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: false },
    accessToken: { type: String },
    userRole: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
