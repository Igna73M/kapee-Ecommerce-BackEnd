import express from 'express';
import { getCartById, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController';
import { requireSignin } from '../middlewares/authentication';

const router = express.Router();

// Get cart for logged-in user
router.get('/', requireSignin, getCartById);

// Add product to cart
router.post('/add', requireSignin, addToCart);

// Update quantity of a product in cart
router.patch('/update', requireSignin, updateCartItem);

// Remove product from cart
router.delete('/remove', requireSignin, removeFromCart);

export default router;