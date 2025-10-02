"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: Number },
    image: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'BrandCategory', required: true },
    features: [{ type: String }],
    rating: { type: Number },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 },
}, { timestamps: true });
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
