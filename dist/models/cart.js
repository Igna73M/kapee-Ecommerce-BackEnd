"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = require("mongoose");
const CartItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
const CartSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    items: { type: [CartItemSchema], required: true },
    total: { type: Number, required: true },
}, { timestamps: true });
exports.CartModel = (0, mongoose_1.model)('Cart', CartSchema);
