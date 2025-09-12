import { Request, Response } from 'express';
import OrderModel from '../models/order';
import { ProductModel } from '../models/product';

// Place a new order with stock check
export const placeOrder = async (req: Request, res: Response) => {
    try {
        const { userId, items } = req.body;
        if (!userId || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'userId and items are required' });
        }

        let total = 0;
        // Check stock for each item
        for (const item of items) {
            const product = await ProductModel.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }
            if (!product.inStock || (typeof product.quantity === 'number' && product.quantity < item.quantity)) {
                return res.status(400).json({ message: `Not enough stock for product: ${product.name}` });
            }
            total += product.price * item.quantity;
        }

        // Deduct stock and update inStock
        for (const item of items) {
            // Decrement quantity
            await ProductModel.findByIdAndUpdate(item.product, {
                $inc: { quantity: -item.quantity }
            });
            // Check new quantity and update inStock
            const updatedProduct = await ProductModel.findById(item.product);
            if (updatedProduct) {
                await ProductModel.findByIdAndUpdate(item.product, {
                    $set: { inStock: updatedProduct.quantity && updatedProduct.quantity > 0 }
                });
            }
        }

        const order = new OrderModel({
            userId,
            items,
            total,
            status: 'pending',
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: 'Error placing order', error: err });
    }
};

// Get all orders for a user
export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const orders = await OrderModel.find({ userId }).populate('items.product');
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching orders', error: err });
    }
};
