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
exports.removeFromWishlist = exports.addToWishlist = exports.getMyWishlist = void 0;
const wishlist_1 = __importDefault(require("../models/wishlist"));
// GET /wishlist/me - Get the logged-in user's wishlist
const getMyWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const wishlist = yield wishlist_1.default.findOne({ userId }).populate("items.product");
        if (!wishlist) {
            return res.status(200).json([]); // Return empty array if no wishlist found
        }
        res.status(200).json(wishlist);
    }
    catch (err) {
        res.status(400).json({ message: "Error fetching wishlist", error: err });
    }
});
exports.getMyWishlist = getMyWishlist;
// POST /wishlist/add - Add a product to wishlist
const addToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        let wishlist = yield wishlist_1.default.findOne({ userId });
        if (!wishlist) {
            wishlist = new wishlist_1.default({ userId, items: [] });
        }
        // Check if product already exists in wishlist
        const exists = wishlist.items.some(item => item.product.toString() === productId);
        if (exists) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }
        wishlist.items.push({ product: productId });
        yield wishlist.save();
        res.status(200).json({ message: "Product added to wishlist", wishlist });
    }
    catch (err) {
        res.status(400).json({ message: "Error adding to wishlist", error: err });
    }
});
exports.addToWishlist = addToWishlist;
// DELETE /wishlist/remove/:productId - Remove a product from wishlist
const removeFromWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        const wishlist = yield wishlist_1.default.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        const initialLength = wishlist.items.length;
        wishlist.items = wishlist.items.filter(item => item.product.toString() !== productId);
        if (wishlist.items.length === initialLength) {
            return res.status(404).json({ message: "Product not found in wishlist" });
        }
        yield wishlist.save();
        res.status(200).json({ message: "Product removed from wishlist", wishlist });
    }
    catch (err) {
        res.status(400).json({ message: "Error removing from wishlist", error: err });
    }
});
exports.removeFromWishlist = removeFromWishlist;
