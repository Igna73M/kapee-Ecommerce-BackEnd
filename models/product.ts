
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    category: Types.ObjectId;
    features?: string[];
    rating?: number;
    inStock?: boolean;
    quantity?: number;
}

export interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    category: Types.ObjectId;
    features?: string[];
    rating?: number;
    inStock?: boolean;
    quantity?: number;
}

import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    category: Types.ObjectId;
    features?: string[];
    rating?: number;
    inStock?: boolean;
    quantity?: number;
}

export interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    category: Types.ObjectId;
    features?: string[];
    rating?: number;
    inStock?: boolean;
    quantity?: number;
}

const ProductSchema = new Schema<ProductDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: Number },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'BrandCategory', required: true },
    features: [{ type: String }],
    rating: { type: Number },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 },
}, { timestamps: true });

export const ProductModel = model<ProductDocument>('Product', ProductSchema);
