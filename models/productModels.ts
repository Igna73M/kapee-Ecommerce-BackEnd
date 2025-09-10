
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

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
}

export interface BlogPostDocument extends Document {
    title: string;
    excerpt: string;
    date: string;
    image: string;
}

const BlogPostSchema = new Schema<BlogPostDocument>({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

export const BlogPostModel = model<BlogPostDocument>('BlogPost', BlogPostSchema);


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


export interface CartItem {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Cart {
    userId: string;
    items: CartItem[];
}

export interface CartDocument extends Document {
    userId: string;
    items: CartItem[];
}

const CartItemSchema = new Schema<CartItem>({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

export const CartSchema = new Schema<CartDocument>({
    userId: { type: String, required: true, unique: true },
    items: [CartItemSchema]
}, { timestamps: true });

export const CartModel = model<CartDocument>('Cart', CartSchema);