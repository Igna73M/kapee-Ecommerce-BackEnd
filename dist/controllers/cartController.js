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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCartById = void 0;
const cart_1 = require("../models/cart");
const product_1 = require("../models/product");
// Helper to ensure user is authenticated
function getUserId(req) {
    if (!req.user || !req.user._id) {
        throw new Error('Unauthorized: user not authenticated');
    }
    return req.user._id.toString();
}
// Get the cart for the logged-in user
const getCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = getUserId(req);
        const cart = yield cart_1.CartModel.findOne({ userId }).populate('items.product');
        if (!cart)
            return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message || err });
    }
});
exports.getCartById = getCartById;
// Add a product to the cart (or create cart if not exists)
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = getUserId(req);
        const { productId, quantity = 1 } = req.body;
        if (!productId || typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).json({ success: false, message: 'productId and valid quantity are required' });
        }
        const product = yield product_1.ProductModel.findById(productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        if (!product.inStock || (typeof product.quantity === 'number' && product.quantity < quantity)) {
            return res.status(400).json({ success: false, message: 'Not enough stock available' });
        }
        let cart = yield cart_1.CartModel.findOne({ userId });
        if (!cart) {
            cart = new cart_1.CartModel({ userId, items: [], total: 0 });
        }
        // Check if product already in cart
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex > -1) {
            const newQuantity = cart.items[itemIndex].quantity + quantity;
            if (typeof product.quantity === 'number' && product.quantity < newQuantity) {
                return res.status(400).json({ success: false, message: 'Not enough stock available' });
            }
            cart.items[itemIndex].quantity = newQuantity;
            cart.items[itemIndex].price = product.price * cart.items[itemIndex].quantity;
        }
        else {
            cart.items.push({
                product: product._id,
                price: product.price * quantity,
                quantity
            });
        }
        // Update total
        cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
        yield cart.save();
        res.status(200).json({
            success: true,
            message: "Item added to cart",
            data: cart,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: 'Error adding to cart', error: err.message || err });
    }
});
exports.addToCart = addToCart;
// Update quantity of a product in the cart
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = getUserId(req);
        const { productId, quantity = 1 } = req.body;
        if (!productId || typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).json({ success: false, message: 'productId and valid quantity are required' });
        }
        const cart = yield cart_1.CartModel.findOne({ userId });
        if (!cart)
            return res.status(404).json({ success: false, message: 'Cart not found' });
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex === -1)
            return res.status(404).json({ success: false, message: 'Product not in cart' });
        const product = yield product_1.ProductModel.findById(productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        if (!product.inStock || (typeof product.quantity === 'number' && product.quantity < quantity)) {
            return res.status(400).json({ success: false, message: 'Not enough stock available' });
        }
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].price = product.price * quantity;
        // Update total
        cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
        yield cart.save();
        res.status(200).json({
            success: true,
            message: "Cart item updated",
            data: cart,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: 'Error updating cart item', error: err.message || err });
    }
});
exports.updateCartItem = updateCartItem;
// Remove a product from the cart
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = getUserId(req);
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: 'productId is required' });
        }
        const cart = yield cart_1.CartModel.findOne({ userId });
        if (!cart)
            return res.status(404).json({ success: false, message: 'Cart not found' });
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        // Update total
        cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
        yield cart.save();
        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            data: cart,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: 'Error removing from cart', error: err.message || err });
    }
});
exports.removeFromCart = removeFromCart;
