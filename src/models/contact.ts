import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
    userId?: mongoose.Types.ObjectId;
    email: string;
    message: string;
    createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
    userId: { type: Schema.Types.ObjectId, ref: "User" }, // Add user reference
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model<IContact>("Contact", ContactSchema);

export default ContactModel;