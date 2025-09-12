import { Schema, model, Document } from 'mongoose';

export interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    highlight: string;
    discount: string;
    image: string;
    buttonText: string;
}

export interface HeroSlideDocument extends Document {
    title: string;
    subtitle: string;
    highlight: string;
    discount: string;
    image: string;
    buttonText: string;
}

const HeroSlideSchema = new Schema<HeroSlideDocument>({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    highlight: { type: String, required: true },
    discount: { type: String, required: true },
    image: { type: String, required: true },
    buttonText: { type: String, required: true },
}, { timestamps: true });

export const HeroSlideModel = model<HeroSlideDocument>('HeroSlide', HeroSlideSchema);
