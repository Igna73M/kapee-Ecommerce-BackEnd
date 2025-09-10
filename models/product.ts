import { Schema, model, Document } from 'mongoose';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    category: string;
    features?: string[];
    rating?: number;
    inStock?: boolean;
}

export interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    category: string;
    features?: string[];
    rating?: number;
    inStock?: boolean;
}

const ProductSchema = new Schema<ProductDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: Number },
    image: { type: String, required: true },
    category: { type: String, required: true },
    features: [{ type: String }],
    rating: { type: Number },
    inStock: { type: Boolean, default: true },
}, { timestamps: true });

export const ProductModel = model<ProductDocument>('Product', ProductSchema);
