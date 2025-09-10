import { Request, Response } from 'express';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';

// Not used, but could be enabled for admin
export const getCarts = async (req: Request, res: Response) => {
    try {
        const carts = await CartModel.find();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getCartById = async (req: Request, res: Response) => {
    try {
        const cart = await CartModel.findById(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Add a product to the cart (or create cart if not exists)
export const addToCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'userId, productId, and quantity are required' });
        }
        const product = await ProductModel.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            cart = new CartModel({ userId, items: [] });
        }
        // Check if product already in cart
        const itemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId);
        if (itemIndex > -1) {
            // Update quantity and price
            cart.items[itemIndex].quantity += quantity;
            cart.items[itemIndex].price = product.price * cart.items[itemIndex].quantity;
        } else {
            cart.items.push({
                product: product._id as import('mongoose').Types.ObjectId,
                price: product.price * quantity,
                quantity
            });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ message: 'Error adding to cart', error: err });
    }
};

// Update quantity of a product in the cart
export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'userId, productId, and quantity are required' });
        }
        const cart = await CartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        const itemIndex = cart.items.findIndex((item: any) => item.productId === productId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Product not in cart' });
        const product = await ProductModel.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].price = product.price * quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ message: 'Error updating cart item', error: err });
    }
};

// Remove a product from the cart
export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ message: 'userId and productId are required' });
        }
        const cart = await CartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        cart.items = cart.items.filter((item: any) => item.productId !== productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ message: 'Error removing from cart', error: err });
    }
};
