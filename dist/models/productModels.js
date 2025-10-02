"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = exports.CartSchema = exports.ServiceModel = exports.HeroSlideModel = exports.BrandCategoryModel = exports.BlogPostModel = exports.BannerModel = exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
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
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
const BannerSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    discount: { type: String, required: true },
    image: { type: String, required: true },
    buttonText: { type: String, required: true },
}, { timestamps: true });
exports.BannerModel = (0, mongoose_1.model)('Banner', BannerSchema);
const BlogPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });
exports.BlogPostModel = (0, mongoose_1.model)('BlogPost', BlogPostSchema);
const BrandCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    initial: { type: String, required: true },
    bgColor: { type: String, required: true },
}, { timestamps: true });
exports.BrandCategoryModel = (0, mongoose_1.model)('BrandCategory', BrandCategorySchema);
const HeroSlideSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    highlight: { type: String, required: true },
    discount: { type: String, required: true },
    image: { type: String, required: true },
    buttonText: { type: String, required: true },
}, { timestamps: true });
exports.HeroSlideModel = (0, mongoose_1.model)('HeroSlide', HeroSlideSchema);
const ServiceSchema = new mongoose_1.Schema({
    icon: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
}, { timestamps: true });
exports.ServiceModel = (0, mongoose_1.model)('Service', ServiceSchema);
const CartItemSchema = new mongoose_1.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
}, { _id: false });
exports.CartSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: true },
    items: [CartItemSchema]
}, { timestamps: true });
exports.CartModel = (0, mongoose_1.model)('Cart', exports.CartSchema);
