import express from 'express';
import { getCartById, addToCart, updateCartItem, removeFromCart, getCarts } from '../controllers/cartController';

const router = express.Router();

router.get('/', getCarts);

// Get cart by MongoDB cart id (not userId)
router.get('/:id', getCartById);

// Add product to cart (or create cart if not exists)
router.post('/add', addToCart);

// Update quantity of a product in cart
router.patch('/update', updateCartItem);

// Remove product from cart
router.delete('/remove', removeFromCart);

export default router;