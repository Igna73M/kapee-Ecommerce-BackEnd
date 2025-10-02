"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middlewares/authentication");
const wishlistController_1 = require("../controllers/wishlistController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management and operations
 */
/**
 * @swagger
 * /wishlist/me:
 *   get:
 *     summary: Get logged-in user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products in user's wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authentication_1.requireSignin, wishlistController_1.getMyWishlist);
/**
 * @swagger
 * /wishlist/add:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add
 *             required:
 *               - productId
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/add", authentication_1.requireSignin, wishlistController_1.addToWishlist);
/**
 * @swagger
 * /wishlist/remove/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in wishlist
 */
router.delete("/remove/:productId", authentication_1.requireSignin, wishlistController_1.removeFromWishlist);
exports.default = router;
