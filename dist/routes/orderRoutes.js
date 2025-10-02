"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const authentication_1 = require("../middlewares/authentication");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and operations
 */
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 description: The ID of the cart to place order from
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *                 required:
 *                   - address
 *                   - city
 *                   - postalCode
 *                   - country
 *               paymentMethod:
 *                 type: string
 *                 description: Payment method (e.g., 'card', 'paypal')
 *             required:
 *               - cartId
 *               - shippingAddress
 *               - paymentMethod
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authentication_1.requireSignin, orderController_1.placeOrder);
/**
 * @swagger
 * /orders/me:
 *   get:
 *     summary: Get all orders for the logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authentication_1.requireSignin, orderController_1.getMyOrders);
/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: Get all orders for a user by userId (admin or legacy)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of orders for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/user/:userId', authentication_1.requireSignin, orderController_1.getUserOrders);
exports.default = router;
