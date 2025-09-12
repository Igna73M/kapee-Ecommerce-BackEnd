import { Schema, model, Document } from 'mongoose';

export interface Banner {
    id: number;
    title: string;
    subtitle: string;
    discount: string;
    image: string;
    buttonText: string;
}

export interface BannerDocument extends Document {
    title: string;
    subtitle: string;
    discount: string;
    image: string;
    buttonText: string;
}

const BannerSchema = new Schema<BannerDocument>({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    discount: { type: String, required: true },
    image: { type: String, required: true },
    buttonText: { type: String, required: true },
}, { timestamps: true });

export const BannerModel = model<BannerDocument>('Banner', BannerSchema);
