import { Schema, model, Document } from 'mongoose';

export interface BrandCategory {
    name: string;
    tagline: string;
    initial: string;
    bgColor: string;
}

export interface BrandCategoryDocument extends Document {
    name: string;
    tagline: string;
    initial: string;
    bgColor: string;
}

const BrandCategorySchema = new Schema<BrandCategoryDocument>({
    name: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    initial: { type: String, required: true },
    bgColor: { type: String, required: true },
}, { timestamps: true });

export const BrandCategoryModel = model<BrandCategoryDocument>('BrandCategory', BrandCategorySchema);
