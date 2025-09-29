import { Request, Response } from 'express';
import OrderModel from '../models/order';
import { ProductModel } from '../models/product';
import { CartModel } from '../models/cart';

// Place a new order with stock check (from items or cartId)
export const placeOrder = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = req.user._id;
        let items = req.body.items;
        let total = 0;

        // Support creating order from cartId
        if (req.body.cartId) {
            const cart = await CartModel.findById(req.body.cartId);
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            if (cart.userId.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'Unauthorized: cart does not belong to user' });
            }

            // Filter out invalid items (products that do not exist)
            const validItems = [];
            const invalidProductIds: (string | number)[] = [];
            for (const item of cart.items) {
                const product = await ProductModel.findById(item.product);
                if (product) {
                    validItems.push({
                        product: item.product,
                        quantity: item.quantity,
                        price: item.price
                    });
                } else {
                    invalidProductIds.push(item.product.toString());
                }
            }

            // If there are invalid items, update the cart to remove them
            if (invalidProductIds.length > 0) {
                cart.items = cart.items.filter(item => !invalidProductIds.includes(item.product.toString()));
                await cart.save();
            }

            items = validItems;
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'No valid items to place order. Please update your cart.' });
        }

        // Check stock for each item and calculate total
        for (const item of items) {
            const product = await ProductModel.findById(item.product);
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
            await ProductModel.findByIdAndUpdate(item.product, {
                $inc: { quantity: -item.quantity }
            });
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
        const populatedOrder = await order.populate('items.product');
        res.status(201).json(populatedOrder);
    } catch (err) {
        res.status(400).json({ message: 'Error placing order', error: err });
    }
};

// Get all orders for the logged-in user
export const getMyOrders = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = req.user._id;
        const orders = await OrderModel.find({ userId }).populate('items.product');
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching orders', error: err });
    }
};

// (Optional) Get all orders for a user by userId (admin/legacy)
export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const orders = await OrderModel.find({ userId }).populate('items.product');
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching orders', error: err });
    }
};