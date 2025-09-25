import { Request, Response } from 'express';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';
import { Types } from 'mongoose';

// Helper to ensure user is authenticated
function getUserId(req: Request & { user?: any }): string {
    if (!req.user || !req.user._id) {
        throw new Error('Unauthorized: user not authenticated');
    }
    return req.user._id.toString();
}

// Get the cart for the logged-in user
export const getCartById = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = getUserId(req);
        const cart = await CartModel.findOne({ userId }).populate('items.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (err: any) {
        res.status(500).json({ message: 'Server error', error: err.message || err });
    }
};

// Add a product to the cart (or create cart if not exists)
export const addToCart = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = getUserId(req);
        const { productId, quantity = 1 } = req.body;
        if (!productId || typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).json({ success: false, message: 'productId and valid quantity are required' });
        }
        const product = await ProductModel.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        if (!product.inStock || (typeof product.quantity === 'number' && product.quantity < quantity)) {
            return res.status(400).json({ success: false, message: 'Not enough stock available' });
        }

        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            cart = new CartModel({ userId, items: [], total: 0 });
        }
        // Check if product already in cart
        const itemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId);
        if (itemIndex > -1) {
            const newQuantity = cart.items[itemIndex].quantity + quantity;
            if (typeof product.quantity === 'number' && product.quantity < newQuantity) {
                return res.status(400).json({ success: false, message: 'Not enough stock available' });
            }
            cart.items[itemIndex].quantity = newQuantity;
            cart.items[itemIndex].price = product.price * cart.items[itemIndex].quantity;
        } else {
            cart.items.push({
                product: product._id as Types.ObjectId,
                price: product.price * quantity,
                quantity
            });
        }
        // Update total
        cart.total = cart.items.reduce((sum: number, item: any) => sum + item.price, 0);
        await cart.save();
        res.status(200).json({
            success: true,
            message: "Item added to cart",
            data: cart,
        });
    } catch (err: any) {
        res.status(400).json({ success: false, message: 'Error adding to cart', error: err.message || err });
    }
};

// Update quantity of a product in the cart
export const updateCartItem = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = getUserId(req);
        const { productId, quantity = 1 } = req.body;
        if (!productId || typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).json({ success: false, message: 'productId and valid quantity are required' });
        }
        const cart = await CartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
        const itemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ success: false, message: 'Product not in cart' });
        const product = await ProductModel.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        if (!product.inStock || (typeof product.quantity === 'number' && product.quantity < quantity)) {
            return res.status(400).json({ success: false, message: 'Not enough stock available' });
        }
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].price = product.price * quantity;
        // Update total
        cart.total = cart.items.reduce((sum: number, item: any) => sum + item.price, 0);
        await cart.save();
        res.status(200).json({
            success: true,
            message: "Cart item updated",
            data: cart,
        });
    } catch (err: any) {
        res.status(400).json({ success: false, message: 'Error updating cart item', error: err.message || err });
    }
};

// Remove a product from the cart
export const removeFromCart = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = getUserId(req);
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: 'productId is required' });
        }
        const cart = await CartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
        cart.items = cart.items.filter((item: any) => item.product.toString() !== productId);
        // Update total
        cart.total = cart.items.reduce((sum: number, item: any) => sum + item.price, 0);
        await cart.save();
        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            data: cart,
        });
    } catch (err: any) {
        res.status(400).json({ success: false, message: 'Error removing from cart', error: err.message || err });
    }
};