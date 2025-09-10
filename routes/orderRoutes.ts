import { Router } from 'express';
import { placeOrder, getUserOrders } from '../controllers/orderController';

const router = Router();

// Place a new order
router.post('/', placeOrder);

// Get all orders for a user
router.get('/user/:userId', getUserOrders);

export default router;
