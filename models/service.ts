import { Schema, model, Document } from 'mongoose';

export interface Service {
    icon: string; // Icon name or path
    title: string;
    description: string;
}

export interface ServiceDocument extends Document {
    icon: string;
    title: string;
    description: string;
}

const ServiceSchema = new Schema<ServiceDocument>({
    icon: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
}, { timestamps: true });

export const ServiceModel = model<ServiceDocument>('Service', ServiceSchema);
