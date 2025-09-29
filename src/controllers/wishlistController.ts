import { Request, Response } from "express";
import WishlistModel from "../models/wishlist";

// GET /wishlist/me - Get the logged-in user's wishlist
export const getMyWishlist = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = req.user._id;
        const wishlist = await WishlistModel.findOne({ userId }).populate("items.product");
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        res.status(200).json(wishlist);
    } catch (err) {
        res.status(400).json({ message: "Error fetching wishlist", error: err });
    }
};

// POST /wishlist/add - Add a product to wishlist
export const addToWishlist = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        let wishlist = await WishlistModel.findOne({ userId });
        if (!wishlist) {
            wishlist = new WishlistModel({ userId, items: [] });
        }

        // Check if product already exists in wishlist
        const exists = wishlist.items.some(item => item.product.toString() === productId);
        if (exists) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        wishlist.items.push({ product: productId });
        await wishlist.save();
        res.status(200).json({ message: "Product added to wishlist", wishlist });
    } catch (err) {
        res.status(400).json({ message: "Error adding to wishlist", error: err });
    }
};

// DELETE /wishlist/remove/:productId - Remove a product from wishlist
export const removeFromWishlist = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const wishlist = await WishlistModel.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        const initialLength = wishlist.items.length;
        wishlist.items = wishlist.items.filter(item => item.product.toString() !== productId);

        if (wishlist.items.length === initialLength) {
            return res.status(404).json({ message: "Product not found in wishlist" });
        }

        await wishlist.save();
        res.status(200).json({ message: "Product removed from wishlist", wishlist });
    } catch (err) {
        res.status(400).json({ message: "Error removing from wishlist", error: err });
    }
};