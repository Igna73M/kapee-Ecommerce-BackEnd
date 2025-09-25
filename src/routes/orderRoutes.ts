import { Router } from 'express';
import { placeOrder, getUserOrders, getMyOrders } from '../controllers/orderController';
import { requireSignin } from '../middlewares/authentication';

const router = Router();

// Place a new order
router.post('/', requireSignin, placeOrder);

// Get all orders for the logged-in user
router.get('/me', requireSignin, getMyOrders);

// Get all orders for a user by userId (admin or legacy)
router.get('/user/:userId', requireSignin, getUserOrders);

export default router;