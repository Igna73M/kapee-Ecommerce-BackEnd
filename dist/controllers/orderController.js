"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOrders = exports.getMyOrders = exports.placeOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const product_1 = require("../models/product");
const cart_1 = require("../models/cart");
// Place a new order with stock check (from items or cartId)
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        let items = req.body.items;
        let total = 0;
        // Support creating order from cartId
        if (req.body.cartId) {
            const cart = yield cart_1.CartModel.findById(req.body.cartId);
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            if (cart.userId.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'Unauthorized: cart does not belong to user' });
            }
            // Filter out invalid items (products that do not exist)
            const validItems = [];
            const invalidProductIds = [];
            for (const item of cart.items) {
                const product = yield product_1.ProductModel.findById(item.product);
                if (product) {
                    validItems.push({
                        product: item.product,
                        quantity: item.quantity,
                        price: item.price
                    });
                }
                else {
                    invalidProductIds.push(item.product.toString());
                }
            }
            // If there are invalid items, update the cart to remove them
            if (invalidProductIds.length > 0) {
                cart.items = cart.items.filter(item => !invalidProductIds.includes(item.product.toString()));
                yield cart.save();
            }
            items = validItems;
        }
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'No valid items to place order. Please update your cart.' });
        }
        // Check stock for each item and calculate total
        for (const item of items) {
            const product = yield product_1.ProductModel.findById(item.product);
            if (!product) {
                // This should not happen now, but just in case
                continue;
            }
            if (!product.inStock || (typeof product.quantity === 'number' && product.quantity < item.quantity)) {
                return res.status(400).json({ message: `Not enough stock for product: ${product.name}` });
            }
            total += product.price * item.quantity;
        }
        // Deduct stock and update inStock
        for (const item of items) {
            yield product_1.ProductModel.findByIdAndUpdate(item.product, {
                $inc: { quantity: -item.quantity }
            });
            const updatedProduct = yield product_1.ProductModel.findById(item.product);
            if (updatedProduct) {
                yield product_1.ProductModel.findByIdAndUpdate(item.product, {
                    $set: { inStock: updatedProduct.quantity && updatedProduct.quantity > 0 }
                });
            }
        }
        const order = new order_1.default({
            userId,
            items,
            total,
            status: 'pending',
        });
        yield order.save();
        const populatedOrder = yield order.populate('items.product');
        res.status(201).json(populatedOrder);
    }
    catch (err) {
        res.status(400).json({ message: 'Error placing order', error: err });
    }
});
exports.placeOrder = placeOrder;
// Get all orders for the logged-in user
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const orders = yield order_1.default.find({ userId }).populate('items.product');
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json({ message: 'Error fetching orders', error: err });
    }
});
exports.getMyOrders = getMyOrders;
// (Optional) Get all orders for a user by userId (admin/legacy)
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = yield order_1.default.find({ userId }).populate('items.product');
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json({ message: 'Error fetching orders', error: err });
    }
});
exports.getUserOrders = getUserOrders;
